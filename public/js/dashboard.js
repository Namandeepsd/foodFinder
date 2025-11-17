document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.book-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const form = document.getElementById('book-form-' + id);
      if (!form) return;
      form.classList.toggle('hidden');
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
  document.querySelectorAll('.review-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const form = document.getElementById('review-form-' + id);
      if (!form) return;
      form.classList.toggle('hidden');
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // toggle Add Visit form
  const addVisitBtn = document.getElementById('add-visit-btn');
  const addVisitForm = document.getElementById('add-visit-form');
  if (addVisitBtn && addVisitForm) {
    addVisitBtn.addEventListener('click', (e) => {
      addVisitForm.classList.toggle('hidden');
      addVisitForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
