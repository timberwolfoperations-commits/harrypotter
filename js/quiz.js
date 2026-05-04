// Quiz Game State
const QuizApp = (() => {
  const QUIZ_LENGTH = 10;
  const STORAGE_KEY = 'hp_leaderboard';

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

  function getLeaderboard() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveScore(name, score, totalTime) {
    const board = getLeaderboard();
    board.push({ name, score, totalTime, date: new Date().toLocaleDateString() });
    board.sort((a, b) => b.score - a.score || a.totalTime - b.totalTime);
    const top = board.slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top));
    return top;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
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

    nameInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') startBtn.click();
    });

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

    // Progress
    const progress = ((state.currentIndex) / QUIZ_LENGTH) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('questionCounter').textContent =
      `Question ${state.currentIndex + 1} of ${QUIZ_LENGTH}`;
    document.getElementById('scoreDisplay').textContent = `Score: ${state.score}`;
    document.getElementById('playerDisplay').textContent = state.playerName;

    // Category badge
    document.getElementById('categoryBadge').textContent = q.category;

    // Question text
    document.getElementById('questionText').textContent = q.question;

    // Answer options
    const container = document.getElementById('answersContainer');
    container.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn w-full text-left px-5 py-4 rounded-xl border-2 border-amber-400/30 bg-white/5 text-white hover:bg-amber-400/20 hover:border-amber-400 transition-all duration-200 font-medium';
      btn.innerHTML = `<span class="inline-block w-7 h-7 rounded-full bg-amber-500/30 text-amber-300 text-sm font-bold mr-3 text-center leading-7">${String.fromCharCode(65 + i)}</span>${opt}`;
      btn.addEventListener('click', () => selectAnswer(i, btn));
      container.appendChild(btn);
    });

    // Hide next button
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('feedbackBox').classList.add('hidden');
  }

  function selectAnswer(index, btn) {
    if (state.answered) return;
    state.answered = true;
    state.selectedAnswer = index;

    const q = state.currentQuestions[state.currentIndex];
    const correct = q.answer;
    const buttons = document.querySelectorAll('.answer-btn');

    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === correct) {
        b.className = b.className
          .replace('border-amber-400/30', 'border-green-400')
          .replace('bg-white/5', 'bg-green-500/30')
          .replace('hover:bg-amber-400/20', '')
          .replace('hover:border-amber-400', '');
        b.classList.add('ring-2', 'ring-green-400');
      } else if (i === index && index !== correct) {
        b.className = b.className
          .replace('border-amber-400/30', 'border-red-400')
          .replace('bg-white/5', 'bg-red-500/30')
          .replace('hover:bg-amber-400/20', '')
          .replace('hover:border-amber-400', '');
        b.classList.add('ring-2', 'ring-red-400');
      }
    });

    const isCorrect = index === correct;
    if (isCorrect) state.score++;

    const feedbackBox = document.getElementById('feedbackBox');
    feedbackBox.classList.remove('hidden');
    if (isCorrect) {
      feedbackBox.className = 'mt-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 text-sm font-medium';
      feedbackBox.innerHTML = '✨ Brilliant! That\'s correct!';
    } else {
      feedbackBox.className = 'mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm font-medium';
      feedbackBox.innerHTML = `❌ Not quite! The correct answer is: <strong class="text-white">${q.options[correct]}</strong>`;
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

    // Save to leaderboard
    saveScore(state.playerName, state.score, state.totalTime);

    document.getElementById('playAgainBtn').addEventListener('click', () => {
      startQuiz();
    }, { once: true });

    document.getElementById('viewLeaderboardFromResultBtn').addEventListener('click', showLeaderboard, { once: true });

    document.getElementById('homeFromResultBtn').addEventListener('click', () => {
      showScreen('welcomeScreen');
    }, { once: true });
  }

  // ── Leaderboard ──────────────────────────────────────────────────────────

  function showLeaderboard() {
    showScreen('leaderboardScreen');
    const board = getLeaderboard();
    const list = document.getElementById('leaderboardList');
    list.innerHTML = '';

    if (board.length === 0) {
      list.innerHTML = '<p class="text-center text-gray-400 py-8">No scores yet! Be the first to play! 🪄</p>';
      return;
    }

    board.forEach((entry, i) => {
      const row = document.createElement('div');
      let medalClass = 'text-gray-400';
      let rowClass = 'bg-white/5';
      let medal = `#${i + 1}`;

      if (i === 0) { medal = '🥇'; rowClass = 'bg-amber-500/20 border border-amber-400/40'; }
      else if (i === 1) { medal = '🥈'; rowClass = 'bg-gray-400/20 border border-gray-400/40'; }
      else if (i === 2) { medal = '🥉'; rowClass = 'bg-orange-700/20 border border-orange-500/40'; }

      const isCurrentPlayer = entry.name === state.playerName;

      row.className = `flex items-center justify-between p-4 rounded-xl ${rowClass} ${isCurrentPlayer ? 'ring-2 ring-amber-400' : ''} mb-2`;
      row.innerHTML = `
        <div class="flex items-center gap-4">
          <span class="text-2xl w-8 text-center">${medal}</span>
          <div>
            <span class="font-bold text-white">${escapeHtml(entry.name)}</span>
            ${isCurrentPlayer ? '<span class="ml-2 text-xs text-amber-300 font-medium">(You)</span>' : ''}
            <div class="text-xs text-gray-400">${entry.date}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-amber-300 font-bold text-lg">${entry.score}/${QUIZ_LENGTH}</div>
          <div class="text-xs text-gray-400">${formatTime(entry.totalTime)}</div>
        </div>
      `;
      list.appendChild(row);
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ── Bootstrap ────────────────────────────────────────────────────────────

  function init() {
    showScreen('welcomeScreen');
    initWelcome();

    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('backFromLeaderboard').addEventListener('click', () => {
      showScreen('welcomeScreen');
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', QuizApp.init);
