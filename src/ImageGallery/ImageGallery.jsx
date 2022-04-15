// import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <ul className="gallery">
      {images.map(image => (
        <li key={image.id}>
          <img src={image.webformatURL} alt={image.id} />
        </li>
      ))}
    </ul>
  );
};

/* <ImageGalleryItem /> */
