// ─────────────────────────────────────────────────────────────────────────────
// Harry Potter Quiz — Game Logic
// Uses Supabase for a shared leaderboard when js/config.js is present,
// and falls back to localStorage so the game works without any setup.
// ─────────────────────────────────────────────────────────────────────────────

const QuizApp = (() => {
  const QUIZ_LENGTH   = 10;
  const STORAGE_KEY   = 'hp_leaderboard';
  const TABLE_NAME    = 'scores';

  // Supabase client — created only when credentials are available
  let supabase = null;

  function initSupabase() {
    try {
      if (
        typeof SUPABASE_URL  === 'string' &&
        typeof SUPABASE_ANON === 'string' &&
        !SUPABASE_URL.includes('YOUR_PROJECT_ID') &&
        !SUPABASE_ANON.includes('YOUR_ANON_PUBLIC_KEY')
      ) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
        console.info('[HP Quiz] Supabase connected — using shared leaderboard.');
      } else {
        console.info('[HP Quiz] Supabase not configured — using localStorage leaderboard.');
      }
    } catch {
      console.warn('[HP Quiz] Supabase init failed — using localStorage fallback.');
    }
  }

  let state = {
    playerName: '',
    currentQuestions: [],
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    answered: false,
    startTime: null,
    totalTime: 0,
  };

  // ── Utilities ────────────────────────────────────────────────────────────

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ── Leaderboard: Supabase or localStorage ────────────────────────────────

  async function saveScore(name, score, totalTime) {
    const entry = {
      name,
      score,
      total_time: totalTime,
      played_at: new Date().toISOString(),
    };

    if (supabase) {
      const { error } = await supabase.from(TABLE_NAME).insert([entry]);
      if (error) {
        console.warn('[HP Quiz] Supabase insert failed, saving locally.', error.message);
        saveLocal(name, score, totalTime);
      }
    } else {
      saveLocal(name, score, totalTime);
    }
  }

  function saveLocal(name, score, totalTime) {
    const board = getLocalBoard();
    board.push({ name, score, total_time: totalTime, played_at: new Date().toISOString() });
    board.sort((a, b) => b.score - a.score || a.total_time - b.total_time);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board.slice(0, 20)));
  }

  function getLocalBoard() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  async function fetchLeaderboard() {
    if (supabase) {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('name, score, total_time, played_at')
        .order('score', { ascending: false })
        .order('total_time', { ascending: true })
        .limit(20);

      if (!error && data) return data;
      console.warn('[HP Quiz] Supabase fetch failed, showing local scores.', error?.message);
    }
    return getLocalBoard();
  }

  // ── Screen helpers ───────────────────────────────────────────────────────

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  }

  // ── Welcome Screen ───────────────────────────────────────────────────────

  function initWelcome() {
    const nameInput = document.getElementById('playerName');
    const startBtn  = document.getElementById('startBtn');
    const nameError = document.getElementById('nameError');

    nameInput.value = '';
    nameError.classList.add('hidden');

    startBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      if (!name) {
        nameError.classList.remove('hidden');
        nameInput.focus();
        return;
      }
      state.playerName = name;
      startQuiz();
    });

    nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') startBtn.click(); });
    document.getElementById('viewLeaderboardBtn').addEventListener('click', showLeaderboard);
  }

  // ── Quiz ─────────────────────────────────────────────────────────────────

  function startQuiz() {
    state.currentQuestions = shuffle(QUESTIONS).slice(0, QUIZ_LENGTH);
    state.currentIndex = 0;
    state.score = 0;
    state.startTime = Date.now();
    showScreen('quizScreen');
    renderQuestion();
  }

  function renderQuestion() {
    const q = state.currentQuestions[state.currentIndex];
    state.selectedAnswer = null;
    state.answered = false;

    const progress = (state.currentIndex / QUIZ_LENGTH) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('questionCounter').textContent =
      `Question ${state.currentIndex + 1} of ${QUIZ_LENGTH}`;
    document.getElementById('scoreDisplay').textContent = `Score: ${state.score}`;
    document.getElementById('playerDisplay').textContent = state.playerName;
    document.getElementById('categoryBadge').textContent = q.category;
    document.getElementById('questionText').textContent = q.question;

    const container = document.getElementById('answersContainer');
    container.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className =
        'answer-btn w-full text-left px-5 py-4 rounded-xl border-2 border-amber-400/30 ' +
        'bg-white/5 text-white hover:bg-amber-400/20 hover:border-amber-400 ' +
        'transition-all duration-200 font-medium';
      btn.innerHTML =
        `<span class="inline-block w-7 h-7 rounded-full bg-amber-500/30 text-amber-300 ` +
        `text-sm font-bold mr-3 text-center leading-7">${String.fromCharCode(65 + i)}</span>${escapeHtml(opt)}`;
      btn.addEventListener('click', () => selectAnswer(i));
      container.appendChild(btn);
    });

    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('feedbackBox').classList.add('hidden');
  }

  function selectAnswer(index) {
    if (state.answered) return;
    state.answered = true;
    state.selectedAnswer = index;

    const q = state.currentQuestions[state.currentIndex];
    const correct = q.answer;
    const buttons = document.querySelectorAll('.answer-btn');

    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === correct) {
        b.classList.remove('border-amber-400/30', 'bg-white/5', 'hover:bg-amber-400/20', 'hover:border-amber-400');
        b.classList.add('border-green-400', 'bg-green-500/30', 'ring-2', 'ring-green-400');
      } else if (i === index) {
        b.classList.remove('border-amber-400/30', 'bg-white/5', 'hover:bg-amber-400/20', 'hover:border-amber-400');
        b.classList.add('border-red-400', 'bg-red-500/30', 'ring-2', 'ring-red-400');
      }
    });

    const isCorrect = index === correct;
    if (isCorrect) state.score++;

    const feedbackBox = document.getElementById('feedbackBox');
    feedbackBox.classList.remove('hidden');
    if (isCorrect) {
      feedbackBox.className =
        'mt-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 text-sm font-medium';
      feedbackBox.innerHTML = '✨ Brilliant! That\'s correct!';
    } else {
      feedbackBox.className =
        'mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm font-medium';
      feedbackBox.innerHTML =
        `❌ Not quite! The correct answer is: <strong class="text-white">${escapeHtml(q.options[correct])}</strong>`;
    }

    document.getElementById('nextBtn').classList.remove('hidden');
  }

  function nextQuestion() {
    state.currentIndex++;
    if (state.currentIndex >= QUIZ_LENGTH) {
      endQuiz();
    } else {
      renderQuestion();
    }
  }

  function endQuiz() {
    state.totalTime = Math.round((Date.now() - state.startTime) / 1000);
    showResults();
  }

  // ── Results ──────────────────────────────────────────────────────────────

  function showResults() {
    showScreen('resultsScreen');
    const pct = Math.round((state.score / QUIZ_LENGTH) * 100);

    document.getElementById('resultName').textContent = state.playerName;
    document.getElementById('resultScore').textContent = `${state.score} / ${QUIZ_LENGTH}`;
    document.getElementById('resultPercent').textContent = `${pct}%`;
    document.getElementById('resultTime').textContent = formatTime(state.totalTime);

    let message, houseColor;
    if (pct === 100) {
      message = '🏆 Perfect score! You\'re a true wizard!';
      houseColor = 'text-amber-300';
    } else if (pct >= 80) {
      message = '⚡ Excellent! Worthy of Gryffindor!';
      houseColor = 'text-amber-400';
    } else if (pct >= 60) {
      message = '🦅 Good effort! A true Ravenclaw scholar!';
      houseColor = 'text-blue-300';
    } else if (pct >= 40) {
      message = '🦡 Not bad! Keep studying your spells!';
      houseColor = 'text-yellow-300';
    } else {
      message = '📚 Better hit the library! Even Neville didn\'t give up!';
      houseColor = 'text-gray-300';
    }

    const msgEl = document.getElementById('resultMessage');
    msgEl.textContent = message;
    msgEl.className = `text-lg font-medium ${houseColor} mt-2`;

    // Animate score ring
    const circle = document.getElementById('scoreCircle');
    if (circle) {
      const offset = 339.29 - (pct / 100) * 339.29;
      setTimeout(() => { circle.style.strokeDashoffset = offset; }, 150);
    }

    // Persist score (async — fire and forget)
    saveScore(state.playerName, state.score, state.totalTime);

    document.getElementById('playAgainBtn').addEventListener('click', startQuiz, { once: true });
    document.getElementById('viewLeaderboardFromResultBtn').addEventListener('click', showLeaderboard, { once: true });
    document.getElementById('homeFromResultBtn').addEventListener('click', () => showScreen('welcomeScreen'), { once: true });
  }

  // ── Leaderboard ──────────────────────────────────────────────────────────

  async function showLeaderboard() {
    showScreen('leaderboardScreen');
    const list = document.getElementById('leaderboardList');

    // Show loading state
    list.innerHTML = '<p class="text-center text-gray-400 py-8 animate-pulse">🔮 Summoning scores…</p>';

    const board = await fetchLeaderboard();

    list.innerHTML = '';

    if (!board || board.length === 0) {
      list.innerHTML = '<p class="text-center text-gray-400 py-8">No scores yet! Be the first to play! 🪄</p>';
      return;
    }

    board.forEach((entry, i) => {
      let medal  = `#${i + 1}`;
      let rowCls = 'bg-white/5';
      if (i === 0) { medal = '🥇'; rowCls = 'bg-amber-500/20 border border-amber-400/40'; }
      else if (i === 1) { medal = '🥈'; rowCls = 'bg-gray-400/20 border border-gray-400/40'; }
      else if (i === 2) { medal = '🥉'; rowCls = 'bg-orange-700/20 border border-orange-500/40'; }

      const isYou = entry.name === state.playerName;
      const dateStr = entry.played_at
        ? new Date(entry.played_at).toLocaleDateString()
        : '—';

      const row = document.createElement('div');
      row.className =
        `flex items-center justify-between p-4 rounded-xl ${rowCls} ` +
        `${isYou ? 'ring-2 ring-amber-400' : ''} mb-2`;
      row.innerHTML = `
        <div class="flex items-center gap-4">
          <span class="text-2xl w-8 text-center">${medal}</span>
          <div>
            <span class="font-bold text-white">${escapeHtml(entry.name)}</span>
            ${isYou ? '<span class="ml-2 text-xs text-amber-300 font-medium">(You)</span>' : ''}
            <div class="text-xs text-gray-400">${dateStr}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-amber-300 font-bold text-lg">${entry.score}/${QUIZ_LENGTH}</div>
          <div class="text-xs text-gray-400">${formatTime(entry.total_time)}</div>
        </div>
      `;
      list.appendChild(row);
    });
  }

  // ── Bootstrap ────────────────────────────────────────────────────────────

  function init() {
    initSupabase();
    showScreen('welcomeScreen');
    initWelcome();
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('backFromLeaderboard').addEventListener('click', () => showScreen('welcomeScreen'));
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', QuizApp.init);

