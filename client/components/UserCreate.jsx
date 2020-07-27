import React from 'react';
import axios from 'axios';
import LocationList from './LocationList.jsx';

class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      zip: '',
      range: '',
      locations: []
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
  }

  formSubmit(e) {
    e.preventDefault();
    axios.get(`http://localhost:3000/kroger/location/${this.state.zip}/${this.state.range}`)
      .then(({ data }) => {
        this.setState({ locations: data.data });
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

  selectLocation(locationId) {
    var newUser = {
      name: this.state.name,
      krogerLocation: locationId,
      list: []
    };
    var { users } = this.props;
    axios.post(`http://localhost:3000/users`, newUser)
      .then(() => {
        console.log('User added successfully');
        users.push(newUser);
        this.props.resetView({ users });
      })
      .catch((err) => {
        console.log('Error adding user: ', err);
      });
  }

  render() {
    return (<>
      <div id='user-create'>
        Type in your name, ZIP code, and search range, click submit, then select a store to complete registration.
        <form>
          <label for='name'>Name:</label>
          <input onChange={this.changeHandler} type='text' name='name'></input>
          <label for='zip'>Zip-code:</label>
          <input onChange={this.changeHandler} type='text' name='zip'></input>
          <label for='range'>Range (in miles):</label>
          <input onChange={this.changeHandler} type='text' name='range'></input>
          <button onClick={this.formSubmit}>Submit</button>
        </form>
      </div>
      <LocationList locations={this.state.locations} selectLocation={this.selectLocation}/>
    </>);
  }
}

export default UserCreate;