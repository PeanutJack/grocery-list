import React from 'react';

var UserList = ({ users, changeView, deleteUser }) => {
  return (
    <div id="user-list">
      {users.map((user) => {
        return (
          <div class="user-item" >
            <span onClick={() => changeView('GroceryList', { current: user })}>{user.name}</span>
            <button onClick={() => deleteUser(user)}>Delete user</button>
          </div>
        )
      })}
    </div>
  );
};

export default UserList;