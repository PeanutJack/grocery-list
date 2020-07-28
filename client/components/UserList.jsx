import React from 'react';

var UserList = ({ users, userClick, deleteUser }) => {
  return (
    <div id="user-list">
      {users.map((user) => {
        return (
          <div class="user-item" >
            <span onClick={() => userClick(user)}>{user.name}</span>
            <button onClick={() => deleteUser(user)}>Delete user</button>
          </div>
        )
      })}
    </div>
  );
};

export default UserList;