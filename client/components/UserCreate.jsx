import React from 'react';
import axios from 'axios';

class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      zip: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(e) {
    e.preventDefault();
    console.log('submitted', this.state.zip, this.state.name);
    axios.get(`http://localhost:3000/kroger/location/${this.state.zip}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log('Error getting locations: ', err);
      });
  }

  changeHandler(e) {
    var temp = {};
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  }

  render() {
    return (
      <div id='user-create'>
        <form>
          <label for='name'>Name:</label>
          <input onChange={this.changeHandler} type='text' name='name'></input>
          <label for='zip'>Zip-code:</label>
          <input onChange={this.changeHandler} type='text' name='zip'></input>
          <button onClick={this.formSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserCreate;