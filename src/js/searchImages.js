import PixabayApiService from './apiService';
import { refs } from './refs';
import imageTemplate from '../template/imageCard.hbs';
import MoreBtn from './moreBtn';
import * as basicLightbox from 'basiclightbox';

import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const options = {
  root: null,
  rootMargin: '0px',
  thresholds: 0.5,
};
const moreBtn = new MoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
console.log(moreBtn);
const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('submit', searchImages);
moreBtn.refs.button.addEventListener('click', onloadBtn);

function searchImages(e) {
  e.preventDefault();
  if (!e.currentTarget.elements.query.value.trim()) {
    moreBtn.hide();
    return error({
      text: 'Будь-ласка,введіть назву запиту',
      addClass: 'error-notification',
    });
  }

  pixabayApiService.query = e.currentTarget.elements.query.value;

  moreBtn.show();
  clearGallery();
  pixabayApiService.resetPage();
  loadImages();
}

function loadImages() {
  moreBtn.disable();
  pixabayApiService.fetchImage().then(images => {
    appendImageTemplate(images);
    if (images.length < 12) {
      console.log('немає співпадінь');
      moreBtn.hide();
      return error({
        text: 'На жаль,нічого не знайдено',
        addClass: 'error-notification',
      });
    }
    moreBtn.enable();
  });

  if (pixabayApiService.page === 2) {
    const observer = new IntersectionObserver(loadImages, options);
    observer.observe(refs.loadMore);
  }
}
function onloadBtn() {
  scrollPage();
  loadImages();
}
// function noMatchesError() {
//   return error({
//     text: 'На жаль,нічого не знайдено',
//     addClass: 'error-notification',
//   });

// function disableMoreBtn() {
//   refs.loadMore.disabled = true;
//   refs.moreLabel.textContent = 'Загружаємо...';
//   refs.spinner.classList.add('spinner');
// }
// function enableMoreBtn() {
//   refs.loadMore.disabled = false;
//   refs.moreLabel.textContent = 'Переглянути ще';
//   refs.spinner.classList.remove('spinner');
// }
// function showMoreBtn() {
//   refs.loadMore.classList.remove('is-hidden');
// }

function appendImageTemplate(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imageTemplate(hits));
}
function clearGallery() {
  refs.gallery.innerHTML = '';
}
refs.gallery.addEventListener('click', onModalOpen);
function onModalOpen(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  basicLightbox
    .create(
      `
    <img src="${e.target.dataset.source}" width="800" height="600">
`,
    )
    .show();
}
function scrollPage() {
  try {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
  } catch (error) {
    console.log(error);
  }
}
