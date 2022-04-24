import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, value, checked, selectFavorite } = this.props;
    return (
      <div>
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
            onChange={ selectFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  checked: propTypes.bool.isRequired,
  selectFavorite: propTypes.func.isRequired,
  value: propTypes.objectOf(propTypes.string).isRequired,
};

export default MusicCard;
