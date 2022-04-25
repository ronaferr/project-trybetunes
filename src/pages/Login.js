import React from 'react';
import propTypes from 'prop-types';
import '../css/Login.css';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.OnInputChange = this.OnInputChange.bind(this);
    this.LoadingClick = this.LoadingClick.bind(this);

    this.state = {
      user: '',
      disabled: true,
      loading: false,
    };
  }

  LoadingClick = async () => {
    const { user } = this.state;
    this.setState({ loading: true });
    await createUser({ name: user });
    this.setState({ loading: false });
    const { history } = this.props;
    history.push('/search');
  }

  OnInputChange({ target }) {
    this.setState({
      user: target.value,
    }, () => {
      const { user } = this.state;
      const MINVALUE = 3;
      if (user.length >= MINVALUE) {
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

  render() {
    const { disabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        { loading === true
          ? <Loading />
          : (
            <form>
              <fieldset>
                <input
                  type="text"
                  onChange={ this.OnInputChange }
                  data-testid="login-name-input"
                  className="input"
                />
                <br />
                <button
                  type="button"
                  disabled={ disabled }
                  onClick={ this.LoadingClick }
                  data-testid="login-submit-button"
                  className="button"
                >
                  Entrar
                </button>
              </fieldset>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.func,
};

Login.defaultProps = {
  history: <p>Sem Valor</p>,
};

export default Login;
