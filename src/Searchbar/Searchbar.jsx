import React, { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };
  onInputChange = e => {
    this.setState({
      query: e.currentTarget.value,
    });
  };
  onSubmit = e => {
    e.preventDefault();
    console.log('Click');
    console.log('this.state.query', this.state.query);
    this.props.query(this.state.query);
  };
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}
