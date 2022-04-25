import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './css/App.css';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <section>
        <h1 className="titulo">TrybeTunes</h1>
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/search" component={ Search } />
          <Route path="/" exact component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </section>
    );
  }
}

export default App;
