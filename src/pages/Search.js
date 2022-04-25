import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Search.css';
import Header from '../components/Header';
import Loading from '../components/Loading';
import CardAlbum from '../components/CardAlbum';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.getAlbuns = this.getAlbuns.bind(this);

    this.state = {
      disabled: true,
      pesquisa: '',
      loading: false,
      artista: '',
      mostrarResultado: false,
      albuns: [],
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

  getAlbuns = async () => {
    const { pesquisa } = this.state;
    this.setState({
      loading: true,
      artista: pesquisa,
    });
    const result = await searchAlbumsAPI(pesquisa);
    if (await result.length > 0) {
      this.setState({
        loading: false,
        pesquisa: '',
        mostrarResultado: true,
        albuns: result,
      });
    } else {
      this.setState({
        loading: false,
        pesquisa: '',
        mostrarResultado: false,
        albuns: [],
        artista: '',
      });
    }
  }

  render() {
    const { disabled, pesquisa, loading, mostrarResultado, artista, albuns } = this.state;
    const textoResultados = `Resultado de álbuns de: ${artista}`;
    return (
      <div data-testid="page-search">
        <Header />
        { loading
          ? <Loading />
          : (
            <form>
              <label htmlFor="pesquisa">
                <input
                  type="text"
                  id="pesquisa"
                  value={ pesquisa }
                  onChange={ this.onChange }
                  data-testid="search-artist-input"
                />
              </label>
              <button
                type="button"
                disabled={ disabled }
                onClick={ this.getAlbuns }
                className="buttonpesquisa"
                data-testid="search-artist-button"
              >
                Pesquisar
              </button>
            </form>
          )}
        { mostrarResultado
          ? (
            <div>
              <p className="resultados">
                { textoResultados }
              </p>
              <section className="albuns">
                { albuns.map((album) => (
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                    key={ album.collectionId }
                  >
                    <CardAlbum
                      key={ album.collectionId }
                      artworkUrl100={ album.artworkUrl100 }
                      artistName={ album.artistName }
                      collectionName={ album.collectionName }
                    />
                  </Link>

                ))}
              </section>
            </div>)
          : (<p className="nope">Nenhum álbum foi encontrado</p>)}
      </div>
    );
  }
}

export default Search;
