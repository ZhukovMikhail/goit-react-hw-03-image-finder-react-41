import React, { Component } from 'react';
import { Container, StyledButton } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { getImage } from './api/service';
import { Modal } from './Modal/Modal.jsx';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    per_page: 10,
    isLoading: false,
    error: false,
    modalIsOpen: false,
    largeImg: '',
  };
  toggleModal = () => {
    this.setState(prev => ({
      modalIsOpen: !prev.modalIsOpen,
    }));
  };

  onImageClick = e => {
    if (e.target.nodeName === 'IMG') {
      this.setState({ largeImg: e.target.dataset.src });
      this.toggleModal();
    }
  };

  fetchImage = async query => {
    if (query === this.state.query) {
      return;
    } else {
      this.setState({ images: [] });
    }
    const page = this.state.page;
    const per_page = this.state.per_page;
    try {
      this.setState({ isLoading: true });
      const pictures = await getImage(query, page, per_page);
      this.setState(prev => ({
        query: query,
        images: [...prev.images, ...pictures],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      console.log('finally');
      this.setState({ isLoading: false });
    }
  };
  loadMore = () => {
    if (this.state.query === '') {
      return;
    }
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };
  async componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      try {
        this.setState({ isLoading: true });
        const pictures = await getImage(this.state.query, this.state.page, _);
        this.setState(prev => ({
          images: [...prev.images, ...pictures],
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        console.log('finally');
        this.setState({ isLoading: false });
      }
    }
  }
  render() {
    return (
      <>
        <SearchBar query={this.fetchImage} />
        <Container>
          <ImageGallery click={this.onImageClick} images={this.state.images} />
          {this.state.isLoading && (
            <>
              <Loader
                type="Bars"
                height="100"
                width="100"
                color="#3f51b5"
                ariaLabel="loading"
              />
              <h3>...loading</h3>
            </>
          )}
          {this.state.images.length !== 0 && (
            <StyledButton onClick={this.loadMore}>load More</StyledButton>
          )}
          {this.state.modalIsOpen && (
            <Modal
              toggleModal={this.toggleModal}
              modalImage={this.state.largeImg}
              alt={this.state.query}
            ></Modal>
          )}
        </Container>
      </>
    );
  }
}
