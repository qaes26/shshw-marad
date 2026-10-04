/**
 * تطبيق "سلامة قلبكِ يا شادية" - التجربة التفاعلية والآلة الكاتبة السحرية
 * Designed for Mobile Experience & Heartfelt Romance
 */

// ==========================================
// 1. النصوص الشعرية والرسالة الأسطورية لشادية
// ==========================================
const typewriterStanzas = [
  "إلى شادية.. إلى الوردة التي علّمت الياسمين كيف يبتسم، وإلى النور الذي إن تعب، أظلمت في عينيّ كل دروب الحياة..",
  "سلامة قلبكِ الطاهر يا نبض روحي.. لو كان الوجع يا حبيبتي يُفدى ويُشترى، لاشتريتُ كل تعبكِ بروحي وعمري دون تردد.. ولو كانت العافية تُسكب من جسدٍ لجسد، لسكبتُ كل قطرة صحة وعافية في صدري لتجري في وريدكِ حتى تبتسمي.",
  "لا تحزني يا أميرتي الغالية من هذا الضعف العابر.. فالمرض ما هو إلا غمامة صيفٍ خفيفة لا بدّ راحلة، وغدًا بإذن الله تشرق شمس عافيتكِ وتعود ضحكتكِ التي تُعيد لقلبي نبضه وتملأ الدنيا بهجةً وحياة.",
  "أنتِ لستِ وحدكِ في هذا الفراش.. روحي تسهر بجانبكِ، تمسح على جبينكِ المتعب مع كل شهيق، وتهمس لكِ في هدوء الليل: «أنتِ أقوى من هذا الوجع، وأنتِ أثمن ما أملك في هذا الكون»..",
  "طهورٌ ونورٌ وشفاءٌ عاجل يا روح قلبي.. أنا معكِ، وسأظل سندكِ وحبيبكِ وعينيكِ حتى يعود بريقكِ أجمل مما كان.. أحبكِ بعدد كل نبضة دعت لكِ بالشفاء.. ❤️"
];

// صيدلية الروح والشفاء - كبسولات تفاعلية
const soulCapsules = {
  peace: {
    icon: "🕊️",
    title: "كبسولة السكينة والأمان",
    text: "غمضي عينيكِ الآن يا شادية.. تخيلي يدي تُمسك بيدكِ برفق، وصوتي يهمس لكِ: لن أترككِ تتألمين وحدكِ أبدًا. كل وجع يمر بكِ يمر بقلبي أولاً. استريحي ودعي قلبي يحرس نومكِ الليلة."
  },
  smile: {
    icon: "🌸",
    title: "فيتامين الضحكة والعافية",
    text: "اشتقتُ لرنين ضحكتكِ التي تُسعد كوني كله.. تذكري دائمًا أنكِ جميلة في كل حالاتكِ، وأن هذا التعب سينتهي قريبًا جدًا لنحتفل بعودتكِ أقوى وأبهى."
  },
  duaa: {
    icon: "✨",
    title: "إكسير الدعاء والشفاء",
    text: "سألتُ الله الذي أوجدكِ في قلبي أن ينزع كل تعبٍ من جسدكِ، وأن يبدله بنشاطٍ وصحة وراحة بال لا تفارقكِ أبدًا. لا حول للوجع أمام عظمة الشافي.. ثقي بذلك يا حبيبتي."
  },
  hug: {
    icon: "🫂",
    title: "ترياق الدفء والحنان",
    text: "لو كنتُ بقربكِ الآن، لغطيتكِ بأهداب عينيّ ولصنعتُ لكِ كوبًا دافئًا يمسح على صدركِ.. اعتبري هذه الكلمات حضنًا دافئًا يلفّ روحكِ ويطرد عنها كل برد وتعب."
  },
  promise: {
    icon: "💍",
    title: "ميثاق الأبد ووعد اللقاء",
    text: "أعدكِ يا شادية.. بمجرد أن تتعافي تمامًا، سنخرج معًا ونستنشق الهواء النقي، ونشرب قهوتنا المفضلة، وسأعوضكِ عن كل دقيقة ألم عشتِها بابتسامات وفرح لا ينتهي!"
  }
};

// ردود نبضات القلب التفاعلية
const heartbeatQuotes = [
  "وصلتني نبضتكِ.. قلبي يحتضنكِ الآن 🌸",
  "سلامتكِ يا روح شادية.. الوجع سيزول حتماً 💕",
  "أنتِ أغلى ما في هذا الكون، كوني بخير لأجلي 💖",
  "دعواتي لكِ تصعد إلى السماء في هذه اللحظة ✨",
  "كل نبضة من قلبي تدعو لكِ بالشفاء والعافية 🌹",
  "أحبكِ فوق كل وجع وكل مسافة ❤️",
  "ابتسمي يا نبضي.. ابتسامتكِ هي دواء روحي 🌷"
];

// ==========================================
// 2. محاكي صوت الآلة الكاتبة بـ Web Audio API
// ==========================================
class TypewriterSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playKeyClick() {
    if (!this.enabled) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      
      // صوت التكتكة الميكانيكية للآلة الكاتبة (Vintage click)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400 + Math.random() * 400, now);
      filter.Q.setValueAtTime(3, now);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(320 + Math.random() * 60, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.036);
    } catch (e) {
      // الصمت عند عدم دعم المتصفح
    }
  }

  playBell() {
    if (!this.enabled) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.61);
    } catch (e) {}
  }
}

const soundEngine = new TypewriterSoundEngine();

// ==========================================
// 3. حالة التطبيق والمتحكمات
// ==========================================
let audioPlayer = null;
let isAudioPlaying = false;
let isTypewriterRunning = false;
let isTypewriterPaused = false;
let currentStanzaIndex = 0;
let currentCharIndex = 0;
let typeSpeed = 42; // سرعة الكتابة بالملي ثانية
let typeTimer = null;
let heartbeatCounter = 0;

// عناصر الواجهة
const envelopeScreen = document.getElementById('envelope-screen');
const envelopeWrapper = document.getElementById('envelope-wrapper');
const waxSeal = document.getElementById('wax-seal');
const typewriterContainer = document.getElementById('typewriter-container');
const cursorCaret = document.getElementById('cursor-caret');
const signature = document.getElementById('letter-signature');
const soundToggleBtn = document.getElementById('sound-toggle-btn');
const fastTypeBtn = document.getElementById('fast-type-btn');
const replayTypeBtn = document.getElementById('replay-type-btn');
const mainAudio = document.getElementById('main-song');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = document.getElementById('play-pause-icon');
const vinylDisk = document.getElementById('vinyl-disk');
const audioPlayerCard = document.getElementById('audio-player-card');
const modalOverlay = document.getElementById('modal-overlay');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close-btn');
const beatBtn = document.getElementById('beating-heart-btn');
const beatCountDisplay = document.getElementById('heartbeat-count');
const beatFeedback = document.getElementById('heartbeat-feedback');

// ==========================================
// 4. فتح المظروف وتشغيل الموسيقى والآلة
// ==========================================
function openEnvelope() {
  if (envelopeScreen.classList.contains('opened')) return;

  // اهتزاز خفيف للموبايل
  if (navigator.vibrate) {
    navigator.vibrate([60, 40, 100]);
  }

  // تفعيل صوت الآلة
  soundEngine.init();

  // تأثير فتح المظروف
  envelopeWrapper.classList.add('peeking');
  
  // إطلاق جزيئات قلوب متطايرة
  const rect = waxSeal.getBoundingClientRect();
  createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);

  // تشغيل الأغنية المرفقة
  playAudio();

  setTimeout(() => {
    envelopeScreen.classList.add('opened');
    startTypewriter();
  }, 700);
}

waxSeal.addEventListener('click', openEnvelope);
envelopeWrapper.addEventListener('click', openEnvelope);

// ==========================================
// 5. محرك الآلة الكاتبة الحية
// ==========================================
function startTypewriter() {
  if (isTypewriterRunning) return;
  isTypewriterRunning = true;
  isTypewriterPaused = false;
  currentStanzaIndex = 0;
  currentCharIndex = 0;
  typewriterContainer.innerHTML = '';
  signature.classList.remove('visible');
  
  renderNextChar();
}

function renderNextChar() {
  if (!isTypewriterRunning || isTypewriterPaused) return;

  if (currentStanzaIndex >= typewriterStanzas.length) {
    // اكتمال الرسالة
    isTypewriterRunning = false;
    soundEngine.playBell();
    signature.classList.add('visible');
    return;
  }

  const currentStanza = typewriterStanzas[currentStanzaIndex];

  // التأكد من وجود الفقرة الحالية
  let p = typewriterContainer.querySelector(`p[data-index="${currentStanzaIndex}"]`);
  if (!p) {
    p = document.createElement('p');
    p.setAttribute('data-index', currentStanzaIndex);
    typewriterContainer.appendChild(p);
  }

  if (currentCharIndex < currentStanza.length) {
    const char = currentStanza[currentCharIndex];
    p.textContent += char;
    currentCharIndex++;

    // صوت النقر الميكانيكي لكل حرف
    if (char !== ' ') {
      soundEngine.playKeyClick();
    }

    // وقفات طبيعية عند علامات الترقيم
    let delay = typeSpeed;
    if (char === '،' || char === ',') {
      delay = typeSpeed + 160;
    } else if (char === '.' || char === '!') {
      delay = typeSpeed + 260;
    }

    typeTimer = setTimeout(renderNextChar, delay);
  } else {
    // نهاية المقطع والانتقال للفقرة التالية مع رنة جرس خفيفة
    soundEngine.playBell();
    currentStanzaIndex++;
    currentCharIndex = 0;
    typeTimer = setTimeout(renderNextChar, 500);
  }
}

// أزرار التحكم بالآلة
soundToggleBtn.addEventListener('click', () => {
  soundEngine.enabled = !soundEngine.enabled;
  soundToggleBtn.classList.toggle('active', soundEngine.enabled);
  soundToggleBtn.title = soundEngine.enabled ? "صوت الآلة مفعّل" : "صوت الآلة مكتوم";
});

fastTypeBtn.addEventListener('click', () => {
  if (!isTypewriterRunning) {
    startTypewriter();
  }
  // تسريع الكتابة فورياً
  typeSpeed = typeSpeed === 42 ? 6 : 42;
  fastTypeBtn.classList.toggle('active', typeSpeed === 6);
});

replayTypeBtn.addEventListener('click', () => {
  clearTimeout(typeTimer);
  isTypewriterRunning = false;
  startTypewriter();
});

// ==========================================
// 6. المشغل الموسيقي لأغنية شادية
// ==========================================
function playAudio() {
  if (!mainAudio) return;
  mainAudio.play().then(() => {
    isAudioPlaying = true;
    updateAudioUI(true);
  }).catch(() => {
    // في حال منعت سياسة المتصفح التشغيل التلقائي حتى يضغط المستخدم
    isAudioPlaying = false;
    updateAudioUI(false);
  });
}

function pauseAudio() {
  if (!mainAudio) return;
  mainAudio.pause();
  isAudioPlaying = false;
  updateAudioUI(false);
}

function toggleAudio() {
  if (isAudioPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function updateAudioUI(playing) {
  if (playing) {
    playPauseIcon.textContent = '⏸️';
    vinylDisk.classList.add('spinning');
    audioPlayerCard.classList.add('playing');
  } else {
    playPauseIcon.textContent = '▶️';
    vinylDisk.classList.remove('spinning');
    audioPlayerCard.classList.remove('playing');
  }
}

playPauseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleAudio();
});

// ==========================================
// 7. صيدلية الروح والشفاء (Soul Capsules)
// ==========================================
function setupPills() {
  const pillCards = document.querySelectorAll('.pill-card');
  pillCards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-pill');
      const data = soulCapsules[type];
      if (data) {
        modalIcon.textContent = data.icon;
        modalTitle.textContent = data.title;
        modalBody.textContent = data.text;
        modalOverlay.classList.add('active');

        if (navigator.vibrate) {
          navigator.vibrate(40);
        }

        const rect = card.getBoundingClientRect();
        createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 6);
      }
    });
  });
}

modalCloseBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
  }
});

// ==========================================
// 8. عداد نبضات الحُب التفاعلي (Beating Heart)
// ==========================================
beatBtn.addEventListener('click', (e) => {
  heartbeatCounter++;
  beatCountDisplay.textContent = heartbeatCounter;

  // اهتزاز واقعي يشبه نبضة القلب
  if (navigator.vibrate) {
    navigator.vibrate([40, 50, 40]);
  }

  // رسالة حب مريحة متغيرة
  const randomQuote = heartbeatQuotes[Math.floor(Math.random() * heartbeatQuotes.length)];
  beatFeedback.style.opacity = '0';
  setTimeout(() => {
    beatFeedback.textContent = randomQuote;
    beatFeedback.style.opacity = '1';
  }, 120);

  // إطلاق قلوب متطايرة من مكان الزر
  const rect = beatBtn.getBoundingClientRect();
  createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
});

// ==========================================
// 9. تأثير الجزيئات والقلوب المتطايرة
// ==========================================
function createHeartBurst(x, y, count = 6) {
  const emojis = ['💖', '🌸', '✨', '💕', '🌷', '❤️'];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart-particle';
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    const tx = (Math.random() - 0.5) * 160;
    heart.style.setProperty('--tx', `${tx}px`);

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1600);
  }
}

// مسار غبار النجوم عند لمس الشاشة على الجوال
window.addEventListener('touchmove', (e) => {
  if (Math.random() > 0.65) {
    const touch = e.touches[0];
    createStarDust(touch.clientX, touch.clientY);
  }
}, { passive: true });

function createStarDust(x, y) {
  const star = document.createElement('div');
  star.className = 'floating-heart-particle';
  star.textContent = '✨';
  star.style.fontSize = '0.9rem';
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
  star.style.setProperty('--tx', `${(Math.random() - 0.5) * 40}px`);
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1000);
}

// ==========================================
// 10. خلفية الكانفاس الحية (بتلات ونجوم دافئة)
// ==========================================
function initCanvasParticles() {
  const canvas = document.getElementById('canvas-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 28; // خفيف وسلس للجوال

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.6 + 0.25,
      speedX: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.4 ? 'rgba(255, 64, 113, ' : 'rgba(245, 196, 105, ',
      opacity: Math.random() * 0.6 + 0.2,
      oscillation: Math.random() * Math.PI * 2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.oscillation += 0.02;
      p.x += Math.sin(p.oscillation) * 0.5 + p.speedX;

      if (p.y > height + 10) {
        p.y = -10;
        p.x = Math.random() * width;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color + '0.8)';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// بدء الإعدادات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  initCanvasParticles();
  setupPills();
});
