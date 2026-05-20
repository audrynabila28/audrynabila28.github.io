// ==========================================================================
// TYPEWRITER ANIMATION
// ==========================================================================
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init Typewriter on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  const txtElement = document.querySelector('.typewriter');
  if (txtElement) {
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    new TypeWriter(txtElement, words, 2500);
  }
});

// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change menu icon between bars and times (close)
    const icon = menuToggle.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '4.5rem';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(11, 13, 19, 0.95)';
      navLinks.style.backdropFilter = 'blur(10px)';
      navLinks.style.padding = '2rem';
      navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.06)';
      navLinks.style.gap = '1.5rem';
      navLinks.style.alignItems = 'center';
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
      navLinks.style.display = '';
    }
  });

  // Close menu when link is clicked
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        navLinks.style.display = '';
      }
    });
  });
}

// ==========================================================================
// WHATSAPP DIRECT REDIRECT
// ==========================================================================
const sendWaBtn = document.getElementById('sendWaBtn');
if (sendWaBtn) {
  sendWaBtn.addEventListener('click', () => {
    const phoneNumber = '6289695858900'; // Nomor WA Audry Nabila Anastasya
    const message = 'Halo Audry Nabila Anastasya, saya tertarik melihat portofolio Anda dan ingin berdiskusi mengenai proyek kolaborasi.';
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  });
}

// ==========================================================================
// SCROLL SPY ACTIVE NAVBAR STATE
// ==========================================================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Offset standard: 150px dari top
    if (pageYOffset >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});
