let articles = [];
let isSpeaking = false;
let utterance = null;

document.addEventListener('DOMContentLoaded', () => {
  fetch('settings.json')
    .then(response => response.json())
    .then(data => {
      articles = data.articles;
      renderArticles();
    })
    .catch(error => console.error('Error loading settings.json:', error));
});

function renderArticles() {
  const grid = document.getElementById('artikel-grid');
  grid.innerHTML = '';
  articles.forEach((article, index) => {
    const card = document.createElement('div');
    card.classList.add('artikel-card');
    card.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <h3>${article.title}</h3>
      <p class="date">${article.date}</p>
      <p>${article.caption}</p>
    `;
    card.onclick = () => openPopup(index);
    grid.appendChild(card);
  });
}

function openPopup(index) {
  const article = articles[index];
  document.getElementById('popup-title').textContent = article.title;
  document.getElementById('popup-date').textContent = article.date;
  document.getElementById('popup-image').src = article.image;
  const contentElement = document.getElementById('popup-content');
  contentElement.innerHTML = ''; // Clear previous content
  article.fullContent.forEach(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    contentElement.appendChild(p);
  });
  document.getElementById('popup').style.display = 'flex';
  // Reset TTS
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    document.querySelector('.tts-btn').textContent = 'Putar Suara';
  }
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    document.querySelector('.tts-btn').textContent = 'Putar Suara';
  }
}

function toggleTTS() {
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    document.querySelector('.tts-btn').textContent = 'Putar Suara';
  } else {
    const text = Array.from(document.getElementById('popup-content').getElementsByTagName('p'))
      .map(p => p.textContent)
      .join(' ');
    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Bahasa Indonesia
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
    isSpeaking = true;
    document.querySelector('.tts-btn').textContent = 'Hentikan Suara';
    utterance.onend = () => {
      isSpeaking = false;
      document.querySelector('.tts-btn').textContent = 'Putar Suara';
    };
  }
}

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    if (window.innerWidth <= 768) {
      document.querySelector('.nav-links').classList.remove('active');
    }
  });
});

// Animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 1s ease';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.artikel-card').forEach(el => {
  observer.observe(el);
});
 
      // Inisialisasi peta
        var map = L.map('map').setView([-6.0465973, 106.6644815], 15); // Koordinat SMA HIRO Tanjung Pasir

        // Tambahkan tile layer dari OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Tambahkan marker
        L.marker([-6.0465973, 106.6644815]).addTo(map)
            .bindPopup('SMA HIRO Tanjung Pasir')
            .openPopup();
