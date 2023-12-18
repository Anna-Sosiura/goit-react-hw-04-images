import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query.toLowerCase().trim());
    this.setState({ query: '' });
  };
  render() {
    const {
      state: { query },
      handleChange,
      handleSubmit,
    } = this;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={query}
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}
