// Smooth scroll cho anchor
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Hiệu ứng xuất hiện khi cuộn
const revealEls = document.querySelectorAll('.about, .gallery, .details, .pricing, .reviews');
function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) {
      el.style.opacity = 1;
      el.style.transform = 'none';
      el.style.transition = 'all 1s cubic-bezier(.4,0,.2,1)';
    } else {
      el.style.opacity = 0;
      el.style.transform = 'translateY(60px)';
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Hiệu ứng hover gallery
const galleryImgs = document.querySelectorAll('.gallery-img');
galleryImgs.forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.transform = `scale(1.08) rotate(${(Math.random()-0.5)*4}deg)`;
    img.style.boxShadow = '0 16px 64px #f9b6d199, 0 2px 16px #e7c87355';
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = '';
    img.style.boxShadow = '';
  });
});

// Hiệu ứng nút bấm
const btns = document.querySelectorAll('.btn-primary');
btns.forEach(btn => {
  btn.addEventListener('mousedown', () => btn.style.transform = 'scale(0.96)');
  btn.addEventListener('mouseup', () => btn.style.transform = '');
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

// Nút MUA NGAY demo
const ctas = document.querySelectorAll('.hero-cta, .pricing-cta');
ctas.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    alert('Cảm ơn bạn đã quan tâm! Chức năng đặt hàng sẽ sớm được cập nhật.');
  });
});

// Sidebar toggle
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

// Close sidebar on link click (mobile)
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 1100) sidebar.classList.remove('open');
  });
});

// Smooth scroll for sidebar links
sidebarLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Active menu highlight on scroll
const sections = Array.from(document.querySelectorAll('section[id]'));
window.addEventListener('scroll', () => {
  let scrollY = window.scrollY;
  let found = false;
  for (let i = sections.length - 1; i >= 0; i--) {
    const sec = sections[i];
    if (scrollY + 120 >= sec.offsetTop) {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector('.sidebar-link[href="#' + sec.id + '"]');
      if (active) active.classList.add('active');
      found = true;
      break;
    }
  }
  if (!found) sidebarLinks.forEach(l => l.classList.remove('active'));
});

// Carousel logic (gallery & reviews)
function setupCarousel(carouselSelector) {
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const btnPrev = carousel.querySelector('.carousel-btn.prev');
  const btnNext = carousel.querySelector('.carousel-btn.next');
  if (!track || !btnPrev || !btnNext) return;

  let scrollAmount = 0;
  function getScrollStep() {
    // Show 1.2 cards on mobile, 2.5 on desktop
    return Math.min(track.offsetWidth * 0.8, 340);
  }

  btnPrev.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  });
  btnNext.addEventListener('click', () => {
    track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  });
}
setupCarousel('.gallery-carousel');
setupCarousel('.review-carousel');

// Gallery carousel auto slide
function setupAutoCarousel(carouselSelector, interval = 3000) {
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const btnPrev = carousel.querySelector('.carousel-btn.prev');
  const btnNext = carousel.querySelector('.carousel-btn.next');
  if (!track || !btnPrev || !btnNext) return;

  let autoSlide = null;
  function nextSlide() {
    track.scrollBy({ left: track.offsetWidth * 0.8, behavior: 'smooth' });
  }
  function startAuto() {
    if (autoSlide) clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, interval);
  }
  function stopAuto() {
    if (autoSlide) clearInterval(autoSlide);
  }
  // Dừng khi hover vào track hoặc nút
  [track, btnPrev, btnNext].forEach(el => {
    el.addEventListener('mouseenter', stopAuto);
    el.addEventListener('mouseleave', startAuto);
  });
  startAuto();
}
setupAutoCarousel('.gallery-carousel', 3000);

// Button ripple effect
function addRippleEffect(btnSelector) {
  document.querySelectorAll(btnSelector).forEach(btn => {
    btn.addEventListener('click', function(e) {
      const circle = document.createElement('span');
      circle.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      circle.style.left = (e.clientX - rect.left) + 'px';
      circle.style.top = (e.clientY - rect.top) + 'px';
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
}
addRippleEffect('.btn-glass');

// Animation on scroll (fadeInUp)
function animateOnScroll() {
  const animated = document.querySelectorAll('.glass-card, .hero-glass, .review-card');
  animated.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    } else {
      el.style.opacity = 0;
      el.style.transform = 'translateY(60px)';
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('resize', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);
