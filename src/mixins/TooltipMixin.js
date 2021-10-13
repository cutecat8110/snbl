import Tooltip from 'bootstrap/js/dist/tooltip';

export default {
  updated() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]'),
    );
    this.tooltipList = tooltipTriggerList.map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl, {
        delay: { show: 500, hide: 100 },
      }),
    );
  },
};
