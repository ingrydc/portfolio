(function() {

  // ── DARK MODE ──
  var root = document.documentElement;
  var btn  = document.getElementById('themeToggle');
  var icon = document.getElementById('themeIcon');

  function setTheme(dark) {
    if (dark) {
      root.classList.add('dark');
      icon.textContent = '☀️';
    } else {
      root.classList.remove('dark');
      icon.textContent = '🌙';
    }
  }

  var saved = '';
  try { saved = localStorage.getItem('theme') || ''; } catch(e) {}
  setTheme(saved === 'dark');

  btn.addEventListener('click', function() {
    var isDark = root.classList.contains('dark');
    setTheme(!isDark);
    try { localStorage.setItem('theme', !isDark ? 'dark' : 'light'); } catch(e) {}
  });

  // ── HAMBURGER ──
  var hbg = document.getElementById('hamburger');
  var mob = document.getElementById('mobileMenu');

  hbg.addEventListener('click', function() {
    hbg.classList.toggle('open');
    mob.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link').forEach(function(link) {
    link.addEventListener('click', function() {
      hbg.classList.remove('open');
      mob.classList.remove('open');
    });
  });

  // ── CURSOR ──
  var cur = document.getElementById('cursor');

  document.addEventListener('mousemove', function(e) {
    cur.style.left = (e.clientX - 5) + 'px';
    cur.style.top  = (e.clientY - 5) + 'px';
  });

  document.querySelectorAll('a, button').forEach(function(el) {
    el.addEventListener('mouseenter', function() { cur.style.transform = 'scale(3)'; });
    el.addEventListener('mouseleave', function() { cur.style.transform = 'scale(1)'; });
  });

  // ── SCROLL REVEAL ──
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var idx = Array.prototype.indexOf.call(el.parentElement.children, el);
      setTimeout(function() { el.classList.add('visible'); }, idx * 120);
      obs.unobserve(el);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.skill-card, .project-item').forEach(function(el) {
    obs.observe(el);
  });

})();
