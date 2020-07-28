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
    this.changeView = this.changeView.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  // VIEW CHANGING

  changeView(view, newState) {
    this.setState({ view });
    if (newState !== undefined) {
      this.setState(newState);
    }
  }

  // PRODUCT CHANGES

  addProduct(product) {
    var { current } = this.state;
    var temp = {
      name: product.description,
      price: product.items[0].price ? product.items[0].price.regular : null,
      size: product.items[0].size.split(' ')[0],
      measurement: product.items[0].size.split(' ').slice(1).join(' '),
      productId: product.productId
    };
    current.list.push(temp);
    axios.put(`http://localhost:3000/users/${current._id}`, { list: current.list })
      .then(({ data }) => {
        this.setState({ current });
        console.log('Updated user:', data);
      })
      .catch((err) => {
        current.pop();
        console.log('Error updating user: ', err);
      });
  }

  deleteProduct(product) {
    var { current } = this.state;
    current.list.splice(current.list.indexOf(product), 1);
    this.setState({ current });
    axios.put(`http://localhost:3000/users/${current._id}`, { list: current.list })
      .then(({ data }) => {
        console.log('Updated user:', data);
      })
      .catch((err) => {
        console.log('Error updating user: ', err);
      });
  }

  // USER CHANGES

  deleteUser(user) {
    var { users } = this.state;
    axios.delete(`http://localhost:3000/users/${user._id}`)
      .then(({ data }) => {
        users.splice(users.indexOf(user), 1);
        this.setState({ users });
        console.log('Deleted user: ', data);
      })
      .catch((err) => {
        console.log('Error deleting user: ', err);
      });
  }

  // REACT METHODS

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
        <button onClick={() => this.changeView('UserCreate')}>New here? Click me.</button>
        <UserList users={users} changeView={this.changeView} deleteUser={this.deleteUser} />
      </>);
    }
    if (view === 'GroceryList') {
      return (
        <GroceryList user={current} changeView={this.changeView} addProduct={this.addProduct} deleteProduct={this.deleteProduct} />
      );
    }
    if (view === 'UserCreate') {
      return (
        <UserCreate changeView={this.changeView} users={users}/>
      );
    }
  }
};

ReactDOM.render(<App />, document.getElementById('App'));