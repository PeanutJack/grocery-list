import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import UserList from './components/UserList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/users')
      .then(({ data }) => {
        this.setState({ users: data });
      });
  }

  render() {
    var { users } = this.state;
    return (
      <div>I'm a React App!
        <UserList users={users} />
      </div>
    );
  }
};

ReactDOM.render(<App/>, document.getElementById('App'));