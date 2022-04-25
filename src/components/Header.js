import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.GetInfo = this.GetInfo.bind(this);
    this.state = {
      info: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.GetInfo();
  }

  GetInfo = async () => {
    this.setState({ loading: true });
    const get = await getUser();
    this.setState({
      info: get.name,
      loading: false,
    });
  }

  render() {
    const { info, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : (
            <section className="header">
              <p
                data-testid="header-user-name"
                className="profile"
              >
                { info }
              </p>
              <br />
              <div className="links">
                <Link
                  to="/search"
                  data-testid="link-to-search"
                  className="link"
                >
                  Search
                </Link>
                <Link
                  to="/favorites"
                  data-testid="link-to-favorites"
                  className="link"
                >
                  Favorites
                </Link>
                <Link
                  to="/profile"
                  data-testid="link-to-profile"
                  className="link"
                >
                  Profile
                </Link>
              </div>
            </section>
          )}
      </header>
    );
  }
}

export default Header;
