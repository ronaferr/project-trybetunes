import React from 'react';
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
            <span data-testid="header-user-name">{ info }</span>
          )}
      </header>
    );
  }
}

export default Header;
