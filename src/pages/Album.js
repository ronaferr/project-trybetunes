import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infoAlbum: {},
      musics: [],
    };
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const desestruturacaoProp = match.params.id;
    const result = await getMusics(desestruturacaoProp);
    this.setState({ infoAlbum: result[0] });
    this.setState({ musics: result });
  }

  render() {
    const { infoAlbum, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.objectOf(propTypes.object).isRequired,
};

export default Album;
