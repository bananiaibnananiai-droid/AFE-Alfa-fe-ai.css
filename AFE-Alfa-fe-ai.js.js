/* ════════════════════════════════════════════
   AFE-AI — JavaScript
   Scroll-Reveal Animation via IntersectionObserver
   ════════════════════════════════════════════ */

/**
 * Scroll-Reveal
 * Alle Elemente mit der Klasse .reveal werden beim Einblenden
 * in den Viewport mit der Klasse .visible versehen,
 * was die CSS-Transition auslöst (opacity + translateY).
 */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/**
 * Smooth-Scroll Helfer (für nav-cta und Buttons)
 * Wird inline via onclick aufgerufen:
 *   onclick="scrollTo('cta')"
 * Alternativ kann diese Funktion für programmatische Nutzung
 * importiert werden.
 */
function scrollTo(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}
