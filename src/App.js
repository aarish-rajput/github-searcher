import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }



  searchUserHandler = async text => {

    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: res.data.items, loading: false })
  }

  clearUsers = () => {
    this.setState({ loading: false, users: [] })
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } })

    setTimeout(() => this.setState({ alert: null }), 3000)
  }

  getUser = async username => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ user: res.data, loading: false })
  }


  getUserRepos = async username => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ repos: res.data, loading: false })
  }

  render() {
    const { loading, user, repos, users } = this.state;
    return (
      <Router>

        <div className="App" >
          <Navbar title="Github Finder" /> <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUser={this.searchUserHandler}
                    clearUsers={this.clearUsers}
                    showClear={this.state.users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} user={user} loading={loading} getUserRepos={this.getUserRepos} repos={repos} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}



export default App;
