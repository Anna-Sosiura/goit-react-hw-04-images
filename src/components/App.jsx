import { Component } from 'react';

import { getImages } from '../service/image-service';

import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    total: 0,
    error: null,
    loader: false,
    modalImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query, page } = this.state;
    if (prevQuery !== query || prevPage !== page) {
      this.getPhotos(query, page);
    }
  }
  getPhotos = async (query, page) => {
    this.setState({ loader: true });
    try {
      const { hits, total } = await getImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: total,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loader: false });
    }
  };
  handleSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
      total: 0,
      error: null,
      loading: false,
    });
  };
  onClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  showmodal = modalImage => {
    this.setState({ modalImage });
  };
  closemodal = () => {
    this.setState({ modalImage: '' });
  };

  render() {
    const { images, total, error, loader, query, modalImage } = this.state;

    console.log(images);
    return (
      <>
        <Searchbar className="Searchbar" onSubmit={this.handleSubmit} />
        {error && <h3>Sorry. There is an error {error} 😭</h3>}
        {query !== '' && total === 0 && (
          <h3>Sorry. There are not images in request {query}</h3>
        )}
        {loader ? (
          // <Loader>Loading...</Loader>
          <h3>Loading...</h3>
        ) : (
          <>
            <ImageGallery
              className="ImageGallery"
              images={images}
              showmodal={this.showmodal}
            />
            {modalImage && (
              <Modal largeImage={modalImage} closemodal={this.closemodal} />
            )}
            {total > images.length && <Button onClick={this.onClick}></Button>}
          </>
        )}
      </>
    );
  }
}
