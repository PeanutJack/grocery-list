import React from 'react';
import axios from 'axios';
import GrocerySelect from './GrocerySelect.jsx';

class GroceryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.newItemSearch = this.newItemSearch.bind(this);
  }

  componentDidMount() {
    // TODO: Pull up to date information for all items upon loading
  }

  changeHandler(e) {
    var temp = {};
    temp[e.target.name] = e.target.value;
    this.setState(temp);
  }

  newItemSearch() {
    axios.get(`http://localhost:3000/kroger/product/${this.props.user.krogerLocation}/${this.state.newItem}`)
      .then(({ data }) => {
        console.log('Data retrieved: ', data);
      })
      .catch((err) => {
        console.log('Error finding data for item: ', this.state.newItem, err);
      })
  }

  render() {
    var { user, resetView } = this.props;
    return (<>
      <label for="newItem">Search for a new item to add: </label>
      <input type="text" name="newItem" onChange={this.changeHandler}></input>
      <button onClick={this.newItemSearch}>Submit</button>
      <GrocerySelect />
      <div id="grocery-list">
        Welcome {user.name}!
        <span onClick={resetView}> Not you?</span>
        {user.list.map((item) => {
          return (
            <div class="grocery-item">{item.name} {item.price} {item.size} {item.measurement}</div>
          );
        })}
      </div>
    </>);
  }
};

export default GroceryList;