import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
const ImageGallery = ({ images, showmodal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            showmodal={showmodal}
          />
        );
      })}
    </ul>
  );
};
export default ImageGallery;
