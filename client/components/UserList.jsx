import React from 'react';

var UserList = ({ users, userClick }) => {
  return (
    <div id="user-list">
      {users.map((user) => {
        return (
          <div class="user-item" onClick={() => userClick(user)}>{user.name}</div>
        )
      })}
    </div>
  )
};

export default UserList;