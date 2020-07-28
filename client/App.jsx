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
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  // VIEW CHANGING

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

  // PRODUCT CHANGES

  addProduct(product) {
    var { current } = this.state;
    var temp = {
      name: product.description,
      price: product.items[0].price.regular,
      size: product.items[0].size.split(' ')[0],
      measurement: product.items[0].size.split(' ')[1],
      productId: product.productId
    };
    current.list.push(temp);
    this.setState({ current });
    axios.put(`http://localhost:3000/users/${current._id}`, { list: current.list })
      .then(({ data }) => {
        console.log('Updated user:', data);
      })
      .catch((err) => {
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
        <button onClick={this.newUser}>New here? Click me.</button>
        <UserList users={users} userClick={this.userClick} newUser={this.newUser} deleteUser={this.deleteUser} />
      </>);
    }
    if (view === 'GroceryList') {
      return (
        <GroceryList user={current} resetView={this.resetView} addProduct={this.addProduct} deleteProduct={this.deleteProduct} />
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