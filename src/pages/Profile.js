import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      backup: {},
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: false });
    const backupPerfil = await getUser();
    this.setState({
      loading: false,
      backup: backupPerfil,
    });
    await console.log(backupPerfil);
  }

  render() {
    const { loading, backup } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading
          ? <Loading />
          : (
            <div>
              <img
                data-testid="profile-image"
                src={ backup.image }
                alt={ backup.name }
              />
              <Link to="/profile/edit">
                Editar perfil
              </Link>
              <h1>
                { backup.name }
              </h1>
              <p>
                { backup.email}
              </p>
              <p>
                { backup.description }
              </p>
            </div>)}
      </div>
    );
  }
}

export default Profile;
