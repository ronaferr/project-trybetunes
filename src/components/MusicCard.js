import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.selectFavorite = this.selectFavorite.bind(this);

    this.state = {
      checked: false,
      loading: false,
    };
  }

  selectFavorite = async ({ target }) => {
    this.setState({
      loading: true,
    });
    await addSong(target.value);
    this.setState({
      checked: true,
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId, value } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        { loading
          ? <Loading />
          : (
            <>
              <p>
                { trackName }
              </p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>
                  audio
                </code>
                .
              </audio>
              <label
                htmlFor="favorita"
              >
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  id="favorita"
                  checked={ checked }
                  value={ value }
                  onChange={ this.selectFavorite }
                />
              </label>
            </>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  value: propTypes.objectOf(propTypes.object).isRequired,
};

export default MusicCard;
