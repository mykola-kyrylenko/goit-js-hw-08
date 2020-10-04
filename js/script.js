import gallery from "./gallery-items.js";

const refs = {
  galleryRef: document.querySelector(".js-gallery"),
  originalImg: document.querySelector(".lightbox__image"),
  modalRef: document.querySelector(".js-lightbox"),
  modalEsc: document.querySelector('[data-action="close-lightbox"]'),
  overlay: document.querySelector(".lightbox__content"),
};
let currentIndex = 0;
createGallery();
refs.galleryRef.addEventListener("click", onClickGalleryImg);

function createGallery() {
  let index = 0;
  const galleryUlTags = gallery.map((gallery) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    img.setAttribute("src", gallery.preview);
    img.setAttribute("alt", gallery.description);
    img.setAttribute("class", "gallery__image");
    img.setAttribute("data-source", gallery.original);
    img.setAttribute("data-index", index);

    a.setAttribute("class", "gallery__link");
    a.setAttribute("href", gallery.original);

    li.setAttribute("class", "gallery__item");

    a.appendChild(img);
    li.appendChild(a);
    index += 1;

    return li;
  });
  refs.galleryRef.append(...galleryUlTags);
}

function onClickGalleryImg(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  openModal();
  let originalImgURL = event.target.dataset.source;
  let originalImgALT = event.target.alt;
  currentIndex = +event.target.dataset.index;
  console.log(currentIndex, "bigPicture");
  setOriginalImgUrl(originalImgURL);
  setOriginalImgAlt(originalImgALT);
  setOriginalImgIndex(currentIndex);
  refs.modalEsc.addEventListener("click", closeModal);
  refs.overlay.addEventListener("click", closeOverlay);
  window.addEventListener("keydown", onKeyPress);
}

function openModal() {
  refs.modalRef.classList.toggle("is-open");
}

function closeModal() {
  refs.modalRef.classList.toggle("is-open");
  deleteOriginalImgUrl();
  refs.modalEsc.removeEventListener("click", closeModal);
  refs.overlay.removeEventListener("click", closeOverlay);
  window.removeEventListener("keydown", onKeyPress);
}

function closeOverlay(event) {
  if (event.target.className === "lightbox__content") {
    refs.modalRef.classList.toggle("is-open");
    deleteOriginalImgUrl();
  }
}

function onKeyPress(event) {
  if (event.code === "Escape") {
    closeModal();
  } else if (event.code === "ArrowLeft") {
    leftKeyPress();
  } else if (event.code === "ArrowRight") {
    rightKeyPress();
  }
}

function rightKeyPress() {
  if (currentIndex + 1 > gallery.length - 1) {
    currentIndex = 0;
    refs.originalImg.src = gallery[currentIndex].original;
  } else {
    currentIndex += 1;
    refs.originalImg.src = gallery[currentIndex].original;
  }
  console.log(currentIndex);
}

function leftKeyPress() {
  if (currentIndex === 0) {
    currentIndex = gallery.length - 1;
    refs.originalImg.src = gallery[currentIndex].original;
  } else {
    currentIndex -= 1;
    refs.originalImg.src = gallery[currentIndex].original;
  }
  console.log(currentIndex);
}

function setOriginalImgUrl(url) {
  refs.originalImg.setAttribute("src", url);
}

function deleteOriginalImgUrl() {
  refs.originalImg.src = "";
  refs.originalImg.alt = "";
}

function setOriginalImgAlt(alt) {
  refs.originalImg.setAttribute("alt", alt);
}

function setOriginalImgIndex(index) {
  refs.originalImg.setAttribute("data-index", index);
}
