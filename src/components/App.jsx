import { useEffect, useState } from 'react';

import { getImages } from '../service/image-service';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (query !== '') getPhotos(query, page);
  }, [query, page]);
  const getPhotos = async (query, page) => {
    setLoader(true);
    setError(null);
    try {
      const { hits, total } = await getImages(query, page);
      const images = hits.map(el => {
        const { id, webformatURL, largeImageURL } = el;
        const image = { id, webformatURL, largeImageURL };
        return image;
      });
      page > 1
        ? setImages(prevImages => [...prevImages, ...images])
        : setImages(images);
      setTotal(total);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };
  const handleSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
    setTotal(0);
  };
  const onClick = () => {
    setPage(page + 1);
  };
  const showmodal = modalImage => {
    setModalImage(modalImage);
  };
  const closemodal = () => {
    setModalImage('');
  };

  console.log(images);
  return (
    <>
      <Searchbar className="Searchbar" onSubmit={handleSubmit} />
      {error && <h3>Sorry. There is an error {error} 😭</h3>}
      {query !== '' && total === 0 && (
        <h3>Sorry. There are not images in request {query}</h3>
      )}
      {loader ? (
        <h3>Loading...</h3>
      ) : (
        <>
          (
          <ImageGallery
            className="ImageGallery"
            images={images}
            showmodal={showmodal}
          />
          )
          {modalImage && (
            <Modal largeImage={modalImage} closemodal={closemodal} />
          )}
          {total > images.length && <Button onClick={onClick}></Button>}
        </>
      )}
    </>
  );
};
