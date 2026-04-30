// ── Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile menu
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── Toast
function showToast(msg, duration=4000) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ── Availability popup
function showAvailability() {
  showToast('📞 To check availability, call or WhatsApp us on 0706 554912', 5000);
}

// ── Form submit
function submitForm() {
  const name    = document.getElementById('fname').value.trim();
  const phone   = document.getElementById('fphone').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || (!phone && !email)) {
    showToast('⚠️ Please enter your name and contact info.');
    return;
  }

  // Build WhatsApp message
  const checkin  = document.getElementById('fcheckin').value;
  const checkout = document.getElementById('fcheckout').value;
  const text = encodeURIComponent(
    `Hello, I would like to make an inquiry.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}` +
    (checkin  ? `\nCheck-in: ${checkin}`  : '') +
    (checkout ? `\nCheck-out: ${checkout}` : '') +
    (message  ? `\n\nMessage: ${message}` : '')
  );

  window.open(`https://wa.me/256706554912?text=${text}`, '_blank');
  showToast('✅ Opening WhatsApp with your inquiry...');
}

// ── Hide float button when contact section visible
const contactSection = document.getElementById('contact');
const floatCall = document.getElementById('floatCall');
const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    floatCall.style.opacity = e.isIntersecting ? '0' : '1';
    floatCall.style.pointerEvents = e.isIntersecting ? 'none' : 'auto';
  });
}, { threshold: 0.3 });
contactObserver.observe(contactSection);
floatCall.style.transition = 'opacity 0.4s';