import React from 'react';

var GroceryList = ({ user, resetView }) => {
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
};

export default GroceryList;