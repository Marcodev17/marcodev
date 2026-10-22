/* Configuração central dos canais da MarcoDev. WhatsApp em formato internacional, apenas números. */
const SITE_CONFIG = Object.freeze({
  whatsapp: '5575998623560',
  instagram: 'https://www.instagram.com/marcodev64?cplk=M3VlbzZjbW55MWQx',
  linkedin: 'https://www.linkedin.com/in/marco-santos-a5b053404/'
});

const whatsappLinks = document.querySelectorAll('[data-whatsapp]');
whatsappLinks.forEach((link) => {
  const service = link.dataset.service;
  const message = service
    ? `Olá, Marco! Encontrei seu portfólio e gostaria de conversar sobre ${service}.`
    : 'Olá, Marco! Encontrei seu portfólio e gostaria de conversar sobre um projeto.';
  link.href = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
});

const themeButton = document.querySelector('.theme-toggle');
const savedTheme = (() => {
  try { return localStorage.getItem('marcodev-theme'); } catch { return null; }
})();
const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.body.dataset.theme = initialTheme;
themeButton.setAttribute('aria-label', initialTheme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
themeButton.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = nextTheme;
  themeButton.setAttribute('aria-label', nextTheme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
  try { localStorage.setItem('marcodev-theme', nextTheme); } catch { /* A página segue funcionando sem armazenamento local. */ }
});

const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  mainNav.classList.toggle('is-open', open);
});
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  mainNav.classList.remove('is-open');
}));

const form = document.querySelector('#contact-form');
const errorMessage = document.querySelector('#form-error');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const business = form.elements.business.value.trim();
  const type = form.elements['project-type'].value;
  const details = form.elements.details.value.trim();
  if (!name || !type || !details) {
    errorMessage.textContent = 'Preencha seu nome, o tipo de projeto e conte um pouco sobre o que você precisa.';
    const missing = !name ? form.elements.name : !type ? form.elements['project-type'] : form.elements.details;
    missing.focus();
    return;
  }
  errorMessage.textContent = '';
  const message = [
    'Olá, Marco! Encontrei seu portfólio e gostaria de conversar sobre um projeto.',
    '', `Nome: ${name}`, `Empresa: ${business || 'Não informado'}`, `Tipo de projeto: ${type}`, '',
    'O que preciso:', details
  ].join('\n');
  window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

document.querySelector('#year').textContent = new Date().getFullYear();
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
