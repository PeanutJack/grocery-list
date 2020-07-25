import React from 'react';

var UserList = (props) => {
  return (
    <div id="user-list">
      {props.users.map((user) => {
        return (
          <div class="user-item">{user.name}</div>
        )
      })}
    </div>
  )
};

export default UserList;