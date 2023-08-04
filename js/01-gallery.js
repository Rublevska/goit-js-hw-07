import { galleryItems } from "./gallery-items.js";
// Change code below this line

const ulEl = document.querySelector(".gallery");

ulEl.insertAdjacentHTML("beforeend", generateGallery(galleryItems));
ulEl.addEventListener("click", onGalleryItemsClick);

function generateGallery(galleryItems) {
  return galleryItems
    .map(
      ({ description, original, preview }) =>
        `<li class="gallery__item">
        <a class="gallery__link" href=${original}>
            <img
            class="gallery__image"
            src=${preview}
            data-source=${original}
            alt=${description}
            />
        </a>
    </li>`
    )
    .join("");
}

function onGalleryItemsClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName != "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img width="1400" height="900" src="${evt.target.dataset.source}">"`
  );
  instance.onKeydownPress = onKeydownPress.bind(instance);
  window.addEventListener("keydown", instance.onKeydownPress);
  instance.show();
}

function onKeydownPress(evt) {
  if (evt.code === "Escape") {
    window.removeEventListener("keydown", this.onKeydownPress);
    this.close();
  }
}
