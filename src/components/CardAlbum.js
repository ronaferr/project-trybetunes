import React from 'react';
import propTypes from 'prop-types';
import '../css/CardAlbum.css';

class CardAlbum extends React.Component {
  render() {
    const { artworkUrl100, artistName, collectionName } = this.props;
    return (
      <div className="cardalbum">
        <img src={ artworkUrl100 } alt="capa album" />
        <div className="infoalbum">
          <p>{ artistName }</p>
          <p>{ collectionName }</p>
        </div>
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
