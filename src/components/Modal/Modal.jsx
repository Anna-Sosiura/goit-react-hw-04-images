const Modal = ({ largeImage, closemodal }) => {
  return (
    <div className="Overlay" onClick={closemodal}>
      <div className="Modal">
        <img src={largeImage} alt="Img" className="ImageGalleryItem-image" />
      </div>
    </div>
  );
};

export default Modal;
