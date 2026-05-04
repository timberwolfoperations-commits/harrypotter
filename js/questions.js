const QUESTIONS = [
  {
    id: 1,
    question: "What is Harry Potter's middle name?",
    options: ["John", "James", "Joseph", "Jeremy"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 2,
    question: "Which Hogwarts house is Harry Potter sorted into?",
    options: ["Ravenclaw", "Hufflepuff", "Slytherin", "Gryffindor"],
    answer: 3,
    category: "Hogwarts"
  },
  {
    id: 3,
    question: "What is the name of Harry Potter's owl?",
    options: ["Errol", "Pigwidgeon", "Hedwig", "Crookshanks"],
    answer: 2,
    category: "Characters"
  },
  {
    id: 4,
    question: "Who is the Half-Blood Prince?",
    options: ["Albus Dumbledore", "Lord Voldemort", "Severus Snape", "Sirius Black"],
    answer: 2,
    category: "Characters"
  },
  {
    id: 5,
    question: "What spell does Harry use most often in duels?",
    options: ["Avada Kedavra", "Expecto Patronum", "Expelliarmus", "Stupefy"],
    answer: 2,
    category: "Spells"
  },
  {
    id: 6,
    question: "What is the name of Hermione Granger's cat?",
    options: ["Scabbers", "Crookshanks", "Mrs. Norris", "Fluffy"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 7,
    question: "What position does Harry Potter play in Quidditch?",
    options: ["Keeper", "Chaser", "Beater", "Seeker"],
    answer: 3,
    category: "Quidditch"
  },
  {
    id: 8,
    question: "Who killed Sirius Black?",
    options: ["Bellatrix Lestrange", "Lucius Malfoy", "Voldemort", "Peter Pettigrew"],
    answer: 0,
    category: "Characters"
  },
  {
    id: 9,
    question: "What is the name of the Weasley family's home?",
    options: ["Grimmauld Place", "The Burrow", "Godric's Hollow", "Shell Cottage"],
    answer: 1,
    category: "Locations"
  },
  {
    id: 10,
    question: "What is the incantation for the Killing Curse?",
    options: ["Crucio", "Avada Kedavra", "Imperio", "Sectumsempra"],
    answer: 1,
    category: "Spells"
  },
  {
    id: 11,
    question: "What magical object is stored in Vault 713 at Gringotts?",
    options: ["The Elder Wand", "The Philosopher's Stone", "A Horcrux", "The Resurrection Stone"],
    answer: 1,
    category: "Objects"
  },
  {
    id: 12,
    question: "What is the name of Hagrid's three-headed dog?",
    options: ["Norbert", "Fang", "Fluffy", "Buckbeak"],
    answer: 2,
    category: "Creatures"
  },
  {
    id: 13,
    question: "Who is the in-universe author of 'Fantastic Beasts and Where to Find Them'?",
    options: ["Gilderoy Lockhart", "Newt Scamander", "Albus Dumbledore", "Nicolas Flamel"],
    answer: 1,
    category: "Books"
  },
  {
    id: 14,
    question: "What is Lord Voldemort's real name?",
    options: ["Tom Marvolo Riddle", "Salazar Slytherin", "Gellert Grindelwald", "Antonin Dolohov"],
    answer: 0,
    category: "Characters"
  },
  {
    id: 15,
    question: "Which potion grants the drinker luck?",
    options: ["Polyjuice Potion", "Veritaserum", "Felix Felicis", "Amortentia"],
    answer: 2,
    category: "Potions"
  },
  {
    id: 16,
    question: "What shape is Harry Potter's scar?",
    options: ["Star", "Lightning bolt", "Crescent moon", "Serpent"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 17,
    question: "What is the magical sport played on broomsticks?",
    options: ["Quodpot", "Quidditch", "Creaothceann", "Aingingein"],
    answer: 1,
    category: "Quidditch"
  },
  {
    id: 18,
    question: "Who is the Transfiguration teacher at Hogwarts?",
    options: ["Professor Flitwick", "Professor Sprout", "Professor McGonagall", "Professor Trelawney"],
    answer: 2,
    category: "Characters"
  },
  {
    id: 19,
    question: "What core is inside Harry Potter's wand?",
    options: ["Dragon heartstring", "Unicorn hair", "Phoenix feather", "Veela hair"],
    answer: 2,
    category: "Objects"
  },
  {
    id: 20,
    question: "Who is Ron Weasley's pet rat?",
    options: ["Trevor", "Scabbers", "Errol", "Pigwidgeon"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 21,
    question: "What spell produces a Patronus?",
    options: ["Lumos", "Expecto Patronum", "Riddikulus", "Protego"],
    answer: 1,
    category: "Spells"
  },
  {
    id: 22,
    question: "What form does Harry Potter's Patronus take?",
    options: ["Wolf", "Otter", "Stag", "Phoenix"],
    answer: 2,
    category: "Spells"
  },
  {
    id: 23,
    question: "What is the name of the wizarding bank in London?",
    options: ["Diagon Bank", "Flourish & Blotts", "Gringotts", "The Ministry Vault"],
    answer: 2,
    category: "Locations"
  },
  {
    id: 24,
    question: "Which Horcrux was destroyed first?",
    options: ["Tom Riddle's Diary", "Marvolo Gaunt's Ring", "Slytherin's Locket", "Hufflepuff's Cup"],
    answer: 0,
    category: "Objects"
  },
  {
    id: 25,
    question: "What is the name of the train that takes students to Hogwarts?",
    options: ["The Wizarding Express", "The Hogwarts Limited", "The Hogwarts Express", "The Sorcerer's Train"],
    answer: 2,
    category: "Locations"
  },
  {
    id: 26,
    question: "Who teaches Potions when Harry first arrives at Hogwarts?",
    options: ["Professor Slughorn", "Professor Snape", "Professor Quirrell", "Professor Dumbledore"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 27,
    question: "What is the name of Dumbledore's phoenix?",
    options: ["Fawkes", "Buckbeak", "Gawain", "Firenze"],
    answer: 0,
    category: "Creatures"
  },
  {
    id: 28,
    question: "Where do Harry and the Dursleys live?",
    options: ["12 Grimmauld Place", "4 Privet Drive", "9¾ Platform", "The Leaky Cauldron"],
    answer: 1,
    category: "Locations"
  },
  {
    id: 29,
    question: "What does the spell 'Lumos' do?",
    options: ["Opens locked doors", "Creates light at the wand tip", "Summons objects", "Levitates objects"],
    answer: 1,
    category: "Spells"
  },
  {
    id: 30,
    question: "What is Dobby?",
    options: ["A house-elf", "A goblin", "A brownie", "A pixie"],
    answer: 0,
    category: "Creatures"
  },
  {
    id: 31,
    question: "Which school did Viktor Krum attend?",
    options: ["Beauxbatons", "Durmstrang", "Ilvermorny", "Castelobruxo"],
    answer: 1,
    category: "Locations"
  },
  {
    id: 32,
    question: "What are the three Deathly Hallows?",
    options: [
      "Elder Wand, Resurrection Stone, Invisibility Cloak",
      "Elder Wand, Sorcerer's Stone, Invisibility Cloak",
      "Horcrux, Resurrection Stone, Invisibility Cloak",
      "Elder Wand, Philosopher's Stone, Time-Turner"
    ],
    answer: 0,
    category: "Objects"
  },
  {
    id: 33,
    question: "What is the name of Draco Malfoy's father?",
    options: ["Abraxas Malfoy", "Lucius Malfoy", "Corvus Malfoy", "Cassius Malfoy"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 34,
    question: "What is Dumbledore's full name?",
    options: [
      "Albus Wulfric Brian Dumbledore",
      "Albus Percival Wulfric Brian Dumbledore",
      "Albus Percival Brian Dumbledore",
      "Albus Percival Wulfric Dumbledore"
    ],
    answer: 1,
    category: "Characters"
  },
  {
    id: 35,
    question: "Which magical creature pulls the Hogwarts carriages, visible only to those who've witnessed death?",
    options: ["Hippogriffs", "Thestrals", "Centaurs", "Unicorns"],
    answer: 1,
    category: "Creatures"
  },
  {
    id: 36,
    question: "What is the name of the most popular pub in Hogsmeade?",
    options: ["The Leaky Cauldron", "The Hog's Head", "The Three Broomsticks", "The Cauldron Inn"],
    answer: 2,
    category: "Locations"
  },
  {
    id: 37,
    question: "Who is the ghost of Gryffindor Tower?",
    options: ["The Fat Friar", "Nearly Headless Nick", "The Bloody Baron", "Moaning Myrtle"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 38,
    question: "What potion makes you look like someone else?",
    options: ["Veritaserum", "Felix Felicis", "Polyjuice Potion", "Confusing Concoction"],
    answer: 2,
    category: "Potions"
  },
  {
    id: 39,
    question: "What is considered an extremely offensive term for a Muggle-born witch or wizard?",
    options: ["Squib", "Mudblood", "Half-blood", "No-Maj"],
    answer: 1,
    category: "Lore"
  },
  {
    id: 40,
    question: "What does 'Expelliarmus' do?",
    options: ["Kills the target", "Summons objects", "Disarms an opponent", "Creates an explosion"],
    answer: 2,
    category: "Spells"
  },
  {
    id: 41,
    question: "What is the name of Voldemort's snake companion?",
    options: ["Aragog", "Nagini", "Basilisk", "Norbert"],
    answer: 1,
    category: "Creatures"
  },
  {
    id: 42,
    question: "What is the name of the main wizarding newspaper?",
    options: ["The Quibbler", "The Wizarding Post", "The Daily Prophet", "Witch Weekly"],
    answer: 2,
    category: "Lore"
  },
  {
    id: 43,
    question: "Which Weasley twin dies in the Battle of Hogwarts?",
    options: ["George", "Fred", "Charlie", "Percy"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 44,
    question: "What subject does Professor Binns teach?",
    options: ["Astronomy", "History of Magic", "Divination", "Ancient Runes"],
    answer: 1,
    category: "Hogwarts"
  },
  {
    id: 45,
    question: "What is the name of Harry's godfather?",
    options: ["Remus Lupin", "Sirius Black", "James Potter", "Arthur Weasley"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 46,
    question: "Where is Platform 9¾ located?",
    options: ["Victoria Station", "Euston Station", "King's Cross Station", "Paddington Station"],
    answer: 2,
    category: "Locations"
  },
  {
    id: 47,
    question: "What creature guards the Chamber of Secrets?",
    options: ["Troll", "Manticore", "Basilisk", "Acromantula"],
    answer: 2,
    category: "Creatures"
  },
  {
    id: 48,
    question: "Who opened the Chamber of Secrets the first time?",
    options: ["Severus Snape", "Tom Riddle", "Salazar Slytherin", "Lucius Malfoy"],
    answer: 1,
    category: "Lore"
  },
  {
    id: 49,
    question: "What is one of the first spells taught at Hogwarts, used to levitate objects?",
    options: ["Wingardium Leviosa", "Lumos", "Alohomora", "Reparo"],
    answer: 0,
    category: "Spells"
  },
  {
    id: 50,
    question: "Which Hogwarts house is known for bravery and courage?",
    options: ["Hufflepuff", "Ravenclaw", "Slytherin", "Gryffindor"],
    answer: 3,
    category: "Hogwarts"
  },
  {
    id: 51,
    question: "What is the core of Hermione Granger's wand?",
    options: ["Phoenix feather", "Dragon heartstring", "Unicorn hair", "Veela hair"],
    answer: 1,
    category: "Objects"
  },
  {
    id: 52,
    question: "Who is the Hogwarts gamekeeper?",
    options: ["Filch", "Hagrid", "Kettleburn", "Longbottom"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 53,
    question: "What house does the Sorting Hat consider placing Harry in?",
    options: ["Hufflepuff", "Ravenclaw", "Slytherin", "Both Slytherin and Gryffindor"],
    answer: 2,
    category: "Hogwarts"
  },
  {
    id: 54,
    question: "What is Hermione Granger's Patronus?",
    options: ["Cat", "Hare", "Otter", "Swan"],
    answer: 2,
    category: "Spells"
  },
  {
    id: 55,
    question: "What is Ron Weasley's Patronus?",
    options: ["Terrier", "Jack Russell Terrier", "Fox", "Hound"],
    answer: 1,
    category: "Spells"
  },
  {
    id: 56,
    question: "Who was the first Defense Against the Dark Arts teacher Harry had?",
    options: ["Professor Lupin", "Professor Moody", "Professor Umbridge", "Professor Quirrell"],
    answer: 3,
    category: "Characters"
  },
  {
    id: 57,
    question: "What does 'Alohomora' do?",
    options: ["Locks a door", "Unlocks a door", "Seals a door permanently", "Creates a doorway"],
    answer: 1,
    category: "Spells"
  },
  {
    id: 58,
    question: "Who founded Hogwarts School of Witchcraft and Wizardry?",
    options: [
      "Godric Gryffindor alone",
      "Salazar Slytherin alone",
      "Four founders: Gryffindor, Slytherin, Ravenclaw, Hufflepuff",
      "Merlin and Morgana"
    ],
    answer: 2,
    category: "Hogwarts"
  },
  {
    id: 59,
    question: "What animal can Sirius Black transform into?",
    options: ["Wolf", "Bear", "Dog", "Cat"],
    answer: 2,
    category: "Characters"
  },
  {
    id: 60,
    question: "What is the name of the shop where Harry gets his wand?",
    options: ["Flourish and Blotts", "Ollivanders", "Borgin and Burkes", "Weasleys' Wizard Wheezes"],
    answer: 1,
    category: "Locations"
  },
  {
    id: 61,
    question: "What number does Harry Potter wear on his Quidditch robes?",
    options: ["5", "7", "9", "1"],
    answer: 1,
    category: "Quidditch"
  },
  {
    id: 62,
    question: "Who is the Slytherin house ghost?",
    options: ["The Fat Friar", "Nearly Headless Nick", "The Bloody Baron", "The Grey Lady"],
    answer: 2,
    category: "Hogwarts"
  },
  {
    id: 63,
    question: "What is the name of Luna Lovegood's father?",
    options: ["Xeno Lovegood", "Xenophilius Lovegood", "Xavier Lovegood", "Xander Lovegood"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 64,
    question: "What is Neville Longbottom's greatest fear?",
    options: ["Spiders", "Voldemort", "Professor Snape", "The dark"],
    answer: 2,
    category: "Characters"
  },
  {
    id: 65,
    question: "What creature does the Riddikulus charm affect?",
    options: ["Dementors", "Boggarts", "Inferi", "Grindylows"],
    answer: 1,
    category: "Creatures"
  },
  {
    id: 66,
    question: "What magical creature is Hagrid illegally raising in Goblet of Fire?",
    options: ["Acromantula", "Blast-Ended Skrewt", "Dragon", "Hippogriff"],
    answer: 1,
    category: "Creatures"
  },
  {
    id: 67,
    question: "Who put Harry's name in the Goblet of Fire?",
    options: ["Draco Malfoy", "Bartemius Crouch Jr.", "Severus Snape", "Peter Pettigrew"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 68,
    question: "What is the name of the house-elf that serves the Malfoy family?",
    options: ["Kreacher", "Winky", "Dobby", "Hokey"],
    answer: 2,
    category: "Creatures"
  },
  {
    id: 69,
    question: "What spell is used to repair broken objects?",
    options: ["Reparo", "Episkey", "Ferula", "Evanesco"],
    answer: 0,
    category: "Spells"
  },
  {
    id: 70,
    question: "What is the magical candy shop in Hogsmeade?",
    options: ["Zonko's Joke Shop", "Scrivenshaft's", "Honeydukes", "Dervish and Banges"],
    answer: 2,
    category: "Locations"
  },
  {
    id: 71,
    question: "Who is the editor of The Quibbler?",
    options: ["Rita Skeeter", "Luna Lovegood", "Xenophilius Lovegood", "Lavender Brown"],
    answer: 2,
    category: "Characters"
  },
  {
    id: 72,
    question: "What plant screams when uprooted and can be fatal with its cry?",
    options: ["Devil's Snare", "Mandrake", "Whomping Willow", "Venomous Tentacula"],
    answer: 1,
    category: "Creatures"
  },
  {
    id: 73,
    question: "How many Horcruxes did Voldemort intend to create?",
    options: ["5", "6", "7", "8"],
    answer: 1,
    category: "Lore"
  },
  {
    id: 74,
    question: "In what year does Harry Potter start at Hogwarts?",
    options: ["1989", "1990", "1991", "1992"],
    answer: 2,
    category: "Lore"
  },
  {
    id: 75,
    question: "What is the charm that makes objects fly?",
    options: ["Accio", "Wingardium Leviosa", "Levioso", "Mobiliarbus"],
    answer: 1,
    category: "Spells"
  },
  {
    id: 76,
    question: "Who teaches Herbology at Hogwarts?",
    options: ["Professor Sprout", "Professor Longbottom", "Professor Kettleburn", "Professor Grubbly-Plank"],
    answer: 0,
    category: "Characters"
  },
  {
    id: 77,
    question: "What does the Mirror of Erised show?",
    options: [
      "Your deepest fears",
      "Your future",
      "Your deepest desires",
      "Your past"
    ],
    answer: 2,
    category: "Objects"
  },
  {
    id: 78,
    question: "Which Quidditch team does Ron Weasley support?",
    options: ["Holyhead Harpies", "Chudley Cannons", "Puddlemere United", "Wimbourne Wasps"],
    answer: 1,
    category: "Quidditch"
  },
  {
    id: 79,
    question: "Who is the Ravenclaw house ghost?",
    options: ["The Fat Friar", "Nearly Headless Nick", "The Bloody Baron", "The Grey Lady"],
    answer: 3,
    category: "Hogwarts"
  },
  {
    id: 80,
    question: "What is the incantation for the Summoning Charm?",
    options: ["Accio", "Expecto", "Wingardium", "Mobilius"],
    answer: 0,
    category: "Spells"
  },
  {
    id: 81,
    question: "Who killed Albus Dumbledore?",
    options: ["Lord Voldemort", "Draco Malfoy", "Severus Snape", "Bellatrix Lestrange"],
    answer: 2,
    category: "Characters"
  },
  {
    id: 82,
    question: "What is the Hufflepuff house animal?",
    options: ["Lion", "Snake", "Eagle", "Badger"],
    answer: 3,
    category: "Hogwarts"
  },
  {
    id: 83,
    question: "What is another name for the Elder Wand?",
    options: ["The Wand of Destiny", "The Death Stick", "The Hallow Wand", "Deathly Wand"],
    answer: 1,
    category: "Objects"
  },
  {
    id: 84,
    question: "What is the torture curse that causes unbearable pain?",
    options: ["Avada Kedavra", "Crucio", "Imperio", "Sectumsempra"],
    answer: 1,
    category: "Spells"
  },
  {
    id: 85,
    question: "What is the Imperius Curse's effect?",
    options: [
      "Kills instantly",
      "Causes unbearable pain",
      "Places the victim under the caster's complete control",
      "Traps the victim in a bubble"
    ],
    answer: 2,
    category: "Spells"
  },
  {
    id: 86,
    question: "Who made Voldemort's wand?",
    options: ["Gregorovitch", "Ollivander", "Dumbledore", "Borgin"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 87,
    question: "In which book does Harry Potter first learn Voldemort's name?",
    options: [
      "Chamber of Secrets",
      "Prisoner of Azkaban",
      "Philosopher's Stone",
      "Goblet of Fire"
    ],
    answer: 2,
    category: "Books"
  },
  {
    id: 88,
    question: "Who is the real-world author of the Harry Potter series?",
    options: ["Suzanne Collins", "J.K. Rowling", "J.R.R. Tolkien", "C.S. Lewis"],
    answer: 1,
    category: "Books"
  },
  {
    id: 89,
    question: "What magical creature did Harry face in the first Triwizard task?",
    options: ["A sphinx", "A Hungarian Horntail dragon", "A mermaid", "A basilisk"],
    answer: 1,
    category: "Creatures"
  },
  {
    id: 90,
    question: "Which ingredient is NOT in Polyjuice Potion?",
    options: ["Lacewing flies", "Boomslang skin", "Gillyweed", "Fluxweed"],
    answer: 2,
    category: "Potions"
  },
  {
    id: 91,
    question: "What is the name of the magical map that shows everyone in Hogwarts?",
    options: ["The Hogwarts Map", "The Marauder's Map", "The Weasley Map", "The Tracker's Chart"],
    answer: 1,
    category: "Objects"
  },
  {
    id: 92,
    question: "Who gave Harry the Marauder's Map?",
    options: ["Dumbledore", "Sirius Black", "Fred and George Weasley", "Remus Lupin"],
    answer: 2,
    category: "Characters"
  },
  {
    id: 93,
    question: "What is the name of the village near Hogwarts?",
    options: ["Diagon Alley", "Godric's Hollow", "Hogsmeade", "Little Whinging"],
    answer: 2,
    category: "Locations"
  },
  {
    id: 94,
    question: "What does 'Nox' do?",
    options: ["Creates darkness", "Extinguishes the light from a wand", "Puts someone to sleep", "Creates a shield"],
    answer: 1,
    category: "Spells"
  },
  {
    id: 95,
    question: "What is Professor Lupin's first name?",
    options: ["Remus", "Romulus", "Regulus", "Rubeus"],
    answer: 0,
    category: "Characters"
  },
  {
    id: 96,
    question: "What animal can Professor McGonagall transform into?",
    options: ["Owl", "Tabby cat", "Persian cat", "Raven"],
    answer: 1,
    category: "Characters"
  },
  {
    id: 97,
    question: "What is the charm that makes something repel water?",
    options: ["Impervius", "Aquamenti", "Hydro", "Diffindo"],
    answer: 0,
    category: "Spells"
  },
  {
    id: 98,
    question: "What inscription appears on the Mirror of Erised?",
    options: [
      "Erised stra ehru oyt ube cafru oyt on wohsi",
      "I show not your face but your heart's desire",
      "Desire is reflected in the deepest mirror",
      "Only the pure of heart shall see their desire"
    ],
    answer: 0,
    category: "Objects"
  },
  {
    id: 99,
    question: "Who ultimately kills Nagini (the final Horcrux)?",
    options: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Neville Longbottom"],
    answer: 3,
    category: "Characters"
  },
  {
    id: 100,
    question: "What is the name of the street where the wizarding shops are hidden in London?",
    options: ["Knockturn Alley", "Diagon Alley", "Grimmauld Alley", "Pottage Alley"],
    answer: 1,
    category: "Locations"
  }
];
