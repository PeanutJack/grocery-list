import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import UserList from './components/UserList.jsx';
import GroceryList from './components/GroceryList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'users',
      users: [],
      current: {}
    };
    this.userClick = this.userClick.bind(this);
    this.resetView = this.resetView.bind(this);
  }

  userClick(user) {
    this.setState({ current: user, view: 'list' });
  }

  resetView() {
    this.setState({ view: 'users' });
  }

  componentDidMount() {
    axios.get('http://localhost:3000/users')
      .then(({ data }) => {
        this.setState({ users: data });
      });
  }

  render() {
    var { view, users, current } = this.state;
    if (view === 'users') {
      return (
        <UserList users={users} userClick={this.userClick}/>
      );
    }
    if (view === 'list') {
      return (
        <GroceryList user={current} resetView={this.resetView}/>
      )
    }
  }
};

ReactDOM.render(<App/>, document.getElementById('App'));