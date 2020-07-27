import React from 'react';
import axios from 'axios';

class GroceryList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    var { user, resetView } = this.props;
    return (
      <div id="grocery-list">
        Welcome {user.name}!
        <span onClick={resetView}> Not you?</span>
        {user.list.map((item) => {
          return (
            <div class="grocery-item">{item.name} {item.price} {item.size} {item.measurement}</div>
          );
        })}
      </div>
    )
  }
};

export default GroceryList;