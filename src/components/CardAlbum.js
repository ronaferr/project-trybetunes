import React from 'react';
import propTypes from 'prop-types';

class CardAlbum extends React.Component {
  render() {
    const { artworkUrl100, artistName, collectionName } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt="capa album" />
        <p>{ artistName }</p>
        <p>{ collectionName }</p>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  artworkUrl100: propTypes.string.isRequired,
  artistName: propTypes.string.isRequired,
  collectionName: propTypes.string.isRequired,
};

export default CardAlbum;
