/* begin begin Back to Top button  */
(function () {
  // 'use strict';

  function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('back_to_top-show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('back_to_top-show');
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }

  var goTopBtn = document.querySelector('.back_to_top');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
})();
/* end begin Back to Top button  */

import { visible } from 'basiclightbox';
import { getImages } from '../services/apiService';
import imageTemplate from '../template/imageCard.hbs';
import { refs } from './refs';
import * as basicLightbox from 'basiclightbox';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';

refs.loadMore.style.visibility = 'hidden';

const state = { page: 1, value: '' };
const options = {
  root: null,
  rootMargin: '0px',
  thresholds: 0.5,
};

refs.searchForm.addEventListener('submit', searchImages);
refs.loadMore.addEventListener('click', onloadBtn);
refs.gallery.addEventListener('click', onModalOpen);

async function searchImages(e) {
  e.preventDefault();

  if (!e.currentTarget.elements.query.value.trim()) {
    return alert({
      text: 'Будь-ласка,введіть назву запиту',
      delay: 1000,
    });
  }
  try {
    state.value = e.currentTarget.elements.query.value;
    const images = await getImages(state.value, state.page);
    refs.gallery.innerHTML = imageTemplate(images);

    if (images.length > 11) {
      refs.loadMore.style.visibility = 'visible';
    }
    if (images.length === 0) {
      return alert({
        text: 'Нічого не знайдено!',
        delay: 1000,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function onloadBtn() {
  state.page += 1;
  disable();
  const images = await getImages(state.value, state.page);

  refs.gallery.insertAdjacentHTML('beforeend', imageTemplate(images));
  enable();

  if (state.page === 2) {
    const observer = new IntersectionObserver(onloadBtn, options);
    observer.observe(refs.loadMore);
  }

  //   refs.gallery.scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end',
  //   });
}

function onModalOpen(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  basicLightbox.create(`<img src="${e.target.dataset.source}" width="800" height="600">`).show();
}
function enable() {
  refs.loadMore.disabled = false;
  refs.moreLabel.textContent = 'Переглянути ще';
  refs.spinner.classList.add('is-hidden');
  refs.spinner.classList.remove('spinner-icon');
}

function disable() {
  refs.loadMore.disabled = true;
  refs.moreLabel.textContent = 'Загружається...';
  refs.spinner.classList.remove('is-hidden');
  refs.spinner.classList.add('spinner-icon');
}

//   show() {
//     this.refs.button.classList.remove('is-hidden');
//   }

//   hide() {
//     this.refs.button.classList.add('is-hidden');
//   }

//*стара версія...*//
// import PixabayApiService from './apiService';
// import { refs } from './refs';
// import imageTemplate from '../template/imageCard.hbs';
// import MoreBtn from './moreBtn';
// import * as basicLightbox from 'basiclightbox';

// import '@pnotify/core/dist/BrightTheme.css';
// import { error } from '@pnotify/core';

// const options = {
//   root: null,
//   rootMargin: '0px',
//   thresholds: 0.5,
// };
// const moreBtn = new MoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });
// console.log(moreBtn);
// const pixabayApiService = new PixabayApiService();

// refs.searchForm.addEventListener('submit', searchImages);
// moreBtn.refs.button.addEventListener('click', onloadBtn);

// function searchImages(e) {
//   e.preventDefault();
//   if (!e.currentTarget.elements.query.value.trim()) {
//     moreBtn.hide();
//     return error({
//       text: 'Будь-ласка,введіть назву запиту',
//       addClass: 'error-notification',
//     });
//   }

//   pixabayApiService.query = e.currentTarget.elements.query.value;

//   moreBtn.show();
//   clearGallery();
//   pixabayApiService.resetPage();
//   loadImages();
// }

// function loadImages() {
//   moreBtn.disable();
//   pixabayApiService.fetchImage().then(images => {
//     appendImageTemplate(images);
//     if (images.length < 12) {
//       console.log('немає співпадінь');
//       moreBtn.hide();
//       return error({
//         text: 'На жаль,нічого не знайдено',
//         addClass: 'error-notification',
//       });
//     }
//     moreBtn.enable();
//   });

//   if (pixabayApiService.page === 2) {
//     const observer = new IntersectionObserver(loadImages, options);
//     observer.observe(refs.loadMore);
//   }
// }
// function onloadBtn() {
//   scrollPage();
//   loadImages();
// }
// // function noMatchesError() {
// //   return error({
// //     text: 'На жаль,нічого не знайдено',
// //     addClass: 'error-notification',
// //   });

// // function disableMoreBtn() {
// //   refs.loadMore.disabled = true;
// //   refs.moreLabel.textContent = 'Загружаємо...';
// //   refs.spinner.classList.add('spinner');
// // }
// // function enableMoreBtn() {
// //   refs.loadMore.disabled = false;
// //   refs.moreLabel.textContent = 'Переглянути ще';
// //   refs.spinner.classList.remove('spinner');
// // }
// // function showMoreBtn() {
// //   refs.loadMore.classList.remove('is-hidden');
// // }

// function appendImageTemplate(hits) {
//   refs.gallery.insertAdjacentHTML('beforeend', imageTemplate(hits));
// }
// function clearGallery() {
//   refs.gallery.innerHTML = '';
// }
// refs.gallery.addEventListener('click', onModalOpen);
// function onModalOpen(e) {
//   if (e.target.nodeName !== 'IMG') {
//     return;
//   }

//   basicLightbox
//     .create(
//       `
//     <img src="${e.target.dataset.source}" width="800" height="600">
// `,
//     )
//     .show();
// }
// function scrollPage() {
//   try {
//     setTimeout(() => {
//       window.scrollTo({
//         top: document.body.scrollHeight,
//         left: 0,
//         behavior: 'smooth',
//       });
//     }, 500);
//   } catch (error) {
//     console.log(error);
//   }
// }
