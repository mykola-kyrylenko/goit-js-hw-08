import gallery from "./gallery-items.js";

const refs = {
  galleryRef: document.querySelector(".js-gallery"),
  modalEsc: document.querySelector('button[data-action="close-lightbox"]'),
  modalRef: document.querySelector(".js-lightbox"),
  originalImg: document.querySelector(".lightbox__image"),
};
refs.galleryRef.addEventListener("click", onGalleryClick);
refs.modalEsc.addEventListener("click", closeModal);
refs.modalRef.addEventListener("click", onOverlayClick);

function galleryUlTags(image, index) {
  const li = createElement("li");
  li.classList.add("gallery__item");
  const a = createElement("a", {
    href: image.original,
  });
  a.classList.add("gallery__link");
  const img = createElement("img", {
    src: image.preview,
    "data-source": image.original,
    alt: image.description,
  });
  img.classList.add("gallery__image");
  
  a.appendChild(img);
  li.appendChild(a);
  
  return li;
}

function createElement(name, attrs = {}) {
  const element = document.createElement(name);
  for (let key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
  return element;
}

function createGallery() {
  const layout = gallery.map(galleryUlTags);
  refs.galleryRef.append(...layout);
}

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  refs.modalRef.classList.add("is-open");
  changeModalSrc(event.target.dataset.source);
  window.addEventListener("keydown", onPressKey);
}

function changeModalSrc(src) {
  refs.originalImg.setAttribute("src", src);
}

function getModalSrc() {
  return refs.originalImg.getAttribute("src");
}

function closeModal() {
  refs.modalRef.classList.remove("is-open");
  changeModalSrc("");
}

function onPressKey(event) {
  if (event.code === "Escape") closeModal();
  if (event.code === "ArrowLeft") prev();
  if (event.code === "ArrowRight") next();
}

function prev() {
  const curSrc = getModalSrc();
  let current = gallery.findIndex((el) => el.original === curSrc);
  if (current === 0) {
    current = gallery.length;
  }
  const newIndex = gallery.find((el, i) => i === current - 1);
  changeModalSrc(newIndex.original);
}

function next() {
  const curSrc = getModalSrc();
  let current = gallery.findIndex((el) => el.original === curSrc);
  if (current === gallery.length - 1) {
    current = -1;
  }
  const newIndex = gallery.find((el, i) => i === current + 1);
  changeModalSrc(newIndex.original);
}

function onOverlayClick(event) {
  if (event.target !== refs.originalImg) {
    closeModal();
  }
}

createGallery();

