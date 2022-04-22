import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    /* this.selectFavorite = this.selectFavorite.bind(this); */

    this.state = {
      infoAlbum: {},
      musics: [],
      loading: false,
    };
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const desestruturacaoProp = match.params.id;
    const result = await getMusics(desestruturacaoProp);
    this.setState({ infoAlbum: result[0] });
    this.setState({ musics: result });
  }

  /* selectFavorite = async (value) => {
    console.log(value);
    this.setState({ loading: true });
    await addSong(value);
    this.setState({
      loading: false,
      checked: true,
    }); */

  render() {
    const { infoAlbum, musics, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading
          ? <Loading />
          : (
            <>
              <div>
                <h1 data-testid="album-name">
                  { `Collection Name ${infoAlbum.collectionName}` }
                </h1>
                <br />
                <p data-testid="artist-name">
                  { `Artist Name ${infoAlbum.artistName}` }
                </p>
              </div>
              <div>
                { musics.slice(1).map((musica) => (
                  <MusicCard
                    key={ musica.trackName }
                    trackName={ musica.trackName }
                    previewUrl={ musica.previewUrl }
                    trackId={ musica.trackId }
                    value={ musica }
                  />
                ))}
              </div>
            </>)}

      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.objectOf(propTypes.object).isRequired,
};

export default Album;
