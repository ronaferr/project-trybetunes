import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      disabled: true,
      pesquisa: '',
    };
  }

  onChange({ target }) {
    this.setState({
      pesquisa: target.value,
    }, () => {
      const { pesquisa } = this.state;
      const MIN = 2;
      if (pesquisa.length >= MIN) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: true,
        });
      }
    });
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="pesquisa">
            <input
              type="text"
              id="pesquisa"
              onChange={ this.onChange }
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="button"
            disabled={ disabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>);
  }
}

export default Search;
