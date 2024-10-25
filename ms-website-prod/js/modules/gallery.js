export const cloneGallery = () => {
  const galleryGrid = document.querySelector('.gallery .gallery__grid');

  if (!galleryGrid) return;

  let galleryClone = galleryGrid.cloneNode(true);

  galleryGrid.after(galleryClone);
  galleryClone = galleryGrid.cloneNode(true);
  galleryGrid.after(galleryClone);
  galleryClone = galleryGrid.cloneNode(true);
  galleryGrid.after(galleryClone);
};
