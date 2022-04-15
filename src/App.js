import './App.styled.jsx';
import { Container } from 'App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import React, { Component } from 'react';
import { getImage } from './api/service';

class App extends Component {
  state = {
    images: [],
  };

  fetchImage = async query => {
    const pictures = await getImage(query);
    console.log(pictures);
    this.setState(prev => ({
      images: [...prev.images, ...pictures],
    }));
  };

  render() {
    return (
      <Container>
        Слава Україні!!!;
        <Searchbar query={this.fetchImage} />
        <ImageGallery images={this.state.images} />
      </Container>
    );
  }
}

export default App;
