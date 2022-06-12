const modals = () => {
  let btnPressed = false;

  function modalTrigger(triggerSelector, modalSelector, closeSelector, destroy = false) {
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]'),
          scroll = calcScroll();

    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
          item.remove();
        }

        windows.forEach(item => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn');
        });
  
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
      });
    });

    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });

      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        windows.forEach(item => {
          item.style.display = 'none';
        });

        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
      }
    });
  }

  function modalTriggerByTime(modalSelector, triggerTime) {
    setTimeout(() => {
      let display;

      document.querySelectorAll('[data-modal]').forEach(item => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'block';
        }
      });

      if (!display) {
        document.querySelector(modalSelector).style.display = 'block';
        document.body.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
      }
    }, triggerTime);
  }

  function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      if (!btnPressed && (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
        document.querySelector(selector).click();
      }
    });
  }

  modalTrigger('.button-design', '.popup-design', '.popup-design .popup-close');
  modalTrigger('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  modalTrigger('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift');
  modalTriggerByTime('.popup-consultation', 5000);

};

export default modals;