/* ============================================================
   AFE – AI For Enterprises | script.js
   Funktionen:
   - Scroll zum Kontaktformular beim Klick auf CTA-Buttons
   - Formularvalidierung (E-Mail & Telefonnummer)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. SCROLL ZUM KONTAKTFORMULAR
     Alle Buttons mit der Klasse .cta-scroll scrollen zum
     Abschnitt mit der ID #kontaktformular
  ---------------------------------------------------------- */

  /**
   * Scrollt sanft zum Kontaktformular und setzt optional den Fokus
   * auf das erste Eingabefeld.
   */
  function scrollZumKontaktformular() {
    const formular = document.getElementById('kontaktformular');
    if (formular) {
      formular.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Fokus auf erstes Eingabefeld nach dem Scrollen
      setTimeout(() => {
        const erstesInput = formular.querySelector('input, textarea');
        if (erstesInput) erstesInput.focus();
      }, 600);
    }
  }

  // Alle CTA-Buttons, die zum Formular scrollen sollen
  const ctaButtons = document.querySelectorAll(
    '.btn-erstgespraech, .btn-demo, .btn-kostenloses-gespraech, .cta-scroll'
  );

  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollZumKontaktformular();
    });
  });


  /* ----------------------------------------------------------
     2. FORMULARVALIDIERUNG
     Validiert E-Mail und Telefonnummer vor dem Absenden.
     Zeigt Fehlermeldungen direkt unter den jeweiligen Feldern.
  ---------------------------------------------------------- */

  const form = document.getElementById('kontaktformular-form');
  if (!form) return;

  const emailInput    = document.getElementById('email');
  const telefonInput  = document.getElementById('telefon');
  const nachrichtInput = document.getElementById('nachricht');
  const datenschutzCheckbox = document.getElementById('datenschutz');
  const successMsg    = document.getElementById('form-success');

  /**
   * Prüft, ob eine E-Mail-Adresse ein gültiges Format hat.
   * @param {string} email
   * @returns {boolean}
   */
  function istGueltigeEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  }

  /**
   * Prüft, ob eine Telefonnummer ein grobes gültiges Format hat.
   * Erlaubt: +, Leerzeichen, Bindestriche, Klammern, Ziffern
   * Mindestlänge: 6 Ziffern
   * @param {string} telefon
   * @returns {boolean}
   */
  function istGueltigeTelefon(telefon) {
    const bereinigt = telefon.replace(/[\s\-().+]/g, '');
    return /^\d{6,}$/.test(bereinigt);
  }

  /**
   * Zeigt oder versteckt die Fehlermeldung für ein Feld.
   * @param {HTMLElement} input - Das Eingabefeld
   * @param {string} errorId   - ID des Fehler-Elements
   * @param {boolean} hatFehler - true = Fehler anzeigen
   */
  function setzeFehler(input, errorId, hatFehler) {
    const fehlerEl = document.getElementById(errorId);
    if (hatFehler) {
      input.classList.add('error');
      if (fehlerEl) fehlerEl.classList.add('visible');
    } else {
      input.classList.remove('error');
      if (fehlerEl) fehlerEl.classList.remove('visible');
    }
  }

  // Live-Validierung: Fehler beim Verlassen des Feldes prüfen
  emailInput.addEventListener('blur', () => {
    const leer = emailInput.value.trim() === '';
    const ungueltig = !istGueltigeEmail(emailInput.value);
    if (leer) {
      setzeFehler(emailInput, 'email-error', true);
      document.getElementById('email-error').textContent = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
    } else if (ungueltig) {
      setzeFehler(emailInput, 'email-error', true);
      document.getElementById('email-error').textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    } else {
      setzeFehler(emailInput, 'email-error', false);
    }
  });

  telefonInput.addEventListener('blur', () => {
    const leer = telefonInput.value.trim() === '';
    const ungueltig = !istGueltigeTelefon(telefonInput.value);
    if (leer) {
      setzeFehler(telefonInput, 'telefon-error', true);
      document.getElementById('telefon-error').textContent = 'Bitte geben Sie Ihre Telefonnummer ein.';
    } else if (ungueltig) {
      setzeFehler(telefonInput, 'telefon-error', true);
      document.getElementById('telefon-error').textContent = 'Bitte geben Sie eine gültige Telefonnummer ein (min. 6 Ziffern).';
    } else {
      setzeFehler(telefonInput, 'telefon-error', false);
    }
  });

  // Formular-Submit: Vollständige Validierung vor dem Absenden
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formularGueltig = true;

    // E-Mail prüfen
    const emailLeer     = emailInput.value.trim() === '';
    const emailUngueltig = !istGueltigeEmail(emailInput.value);
    if (emailLeer) {
      setzeFehler(emailInput, 'email-error', true);
      document.getElementById('email-error').textContent = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
      formularGueltig = false;
    } else if (emailUngueltig) {
      setzeFehler(emailInput, 'email-error', true);
      document.getElementById('email-error').textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      formularGueltig = false;
    } else {
      setzeFehler(emailInput, 'email-error', false);
    }

    // Telefon prüfen
    const telefonLeer     = telefonInput.value.trim() === '';
    const telefonUngueltig = !istGueltigeTelefon(telefonInput.value);
    if (telefonLeer) {
      setzeFehler(telefonInput, 'telefon-error', true);
      document.getElementById('telefon-error').textContent = 'Bitte geben Sie Ihre Telefonnummer ein.';
      formularGueltig = false;
    } else if (telefonUngueltig) {
      setzeFehler(telefonInput, 'telefon-error', true);
      document.getElementById('telefon-error').textContent = 'Bitte geben Sie eine gültige Telefonnummer ein (min. 6 Ziffern).';
      formularGueltig = false;
    } else {
      setzeFehler(telefonInput, 'telefon-error', false);
    }

    // Datenschutz-Checkbox prüfen
    const datenschutzError = document.getElementById('datenschutz-error');
    if (!datenschutzCheckbox.checked) {
      datenschutzCheckbox.classList.add('error');
      if (datenschutzError) {
        datenschutzError.classList.add('visible');
        datenschutzError.textContent = 'Bitte bestätigen Sie die Datenschutzerklärung.';
      }
      formularGueltig = false;
    } else {
      datenschutzCheckbox.classList.remove('error');
      if (datenschutzError) {
        datenschutzError.classList.remove('visible');
      }
    }

    // Wenn alles gültig: Formular "absenden" (Erfolgsmeldung zeigen)
    if (formularGueltig) {
      form.style.display = 'none';
      if (successMsg) successMsg.classList.add('visible');

      // Formularfelder zurücksetzen (für spätere Verwendung)
      form.reset();
    } else {
      // Zum ersten fehlerhaften Feld scrollen
      const ersteFehler = form.querySelector('input.error, textarea.error');
      if (ersteFehler) ersteFehler.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });


  /* ----------------------------------------------------------
     3. INTERSECTION OBSERVER (aus der Original-Website)
     Startet CSS-Animationen, wenn Elemente ins Sichtfeld kommen
  ---------------------------------------------------------- */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.style.animationPlayState = 'running';
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.auto-tile, .worker-card').forEach(el => {
    observer.observe(el);
  });

});
