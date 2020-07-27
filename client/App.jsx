import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import UserList from './components/UserList.jsx';
import UserCreate from './components/UserCreate.jsx';
import GroceryList from './components/GroceryList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'UserList',
      users: [],
      current: {}
    };
    this.userClick = this.userClick.bind(this);
    this.newUser = this.newUser.bind(this);
    this.resetView = this.resetView.bind(this);
  }

  userClick(user) {
    this.setState({ current: user, view: 'GroceryList' });
  }

  newUser() {
    this.setState({ view: 'UserCreate'});
  }

  resetView(newState) {
    this.setState(newState);
    this.setState({ view: 'UserList' });
  }

  componentDidMount() {
    axios.get('http://localhost:3000/users')
      .then(({ data }) => {
        this.setState({ users: data });
      });
  }

  render() {
    var { view, users, current } = this.state;
    if (view === 'UserList') {
      return (<>
        <button onClick={this.newUser}>New here? Click me.</button>
        <UserList users={users} userClick={this.userClick} newUser={this.newUser} />
      </>);
    }
    if (view === 'GroceryList') {
      return (
        <GroceryList user={current} resetView={this.resetView}/>
      );
    }
    if (view === 'UserCreate') {
      return (
        <UserCreate resetView={this.resetView} users={users}/>
      );
    }
  }
};

ReactDOM.render(<App />, document.getElementById('App'));