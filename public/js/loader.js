// Show loader when navigating
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  
  // Hide loader when page loads
  if (loader) {
    loader.classList.add('hidden');
  }
  
  // Show loader on form submit
  document.addEventListener('submit', (e) => {
    if (loader && e.target.method.toLowerCase() === 'post') {
      loader.classList.remove('hidden');
    }
  });
  
  // Show loader on link click (for navigation)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && loader && !link.href.includes('#') && !link.target) {
      // Don't show loader for external links or same-page links
      if (link.href.includes(window.location.origin)) {
        loader.classList.remove('hidden');
      }
    }
  });
  
  // Hide loader when page fully loads
  window.addEventListener('load', () => {
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 300);
    }
  });
});
