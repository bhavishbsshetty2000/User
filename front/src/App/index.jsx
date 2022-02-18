import React, { useEffect } from "react";
import { useState } from "react";
import { addUser, getUser, removeUser } from "./module";

export const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "" });
  const [identity, setIdentity] = useState({ id: "" });
  const [isAddOpen, toggleAddOpen] = useState(false);
  const [isRemoveOpen, toggleRemoveOpen] = useState(false);

  const handleUsers = () => {
    getUser().then((data) => {
      setUsers(data);
    });
  };

  const handleAddClose = () => {
    setUser({ name: "" });
    toggleAddOpen(!isAddOpen);
  };

  const handleRemoveClose = () => {
    setIdentity({ id: "" });
    toggleRemoveOpen(!isRemoveOpen);
  };

  const handleCreate = () => {
    const { name } = user;
    addUser(name).then(() => {
      handleUsers();
      handleAddClose();
    });
  };

  const handleRemove = () => {
    const { id } = identity;

    removeUser(users[id - 1]._id).then(() => {
      handleUsers();
      handleRemoveClose();
    });
  };

  useEffect(() => {
    handleUsers();
  }, []);

  if (isAddOpen) {
    return (
      <div className="container">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Enter Name"
          value={user.name}
          onChange={(e) => {
            setUser((usr) => ({ ...usr, name: e.target.value }));
          }}
        />
        <button type="button" class="btn btn-primary" onClick={handleCreate}>
          Submit
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={handleAddClose}
        >
          Cancel
        </button>
      </div>
    );
  }

  if (isRemoveOpen) {
    return (
      <div className="container">
        <input
          type="text"
          name="id"
          className="form-control"
          placeholder="Enter Id"
          value={user.id}
          onChange={(e) => {
            setIdentity((i) => ({ ...i, id: e.target.value }));
          }}
        />

        <button type="button" class="btn btn-primary" onClick={handleRemove}>
          Submit
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={handleRemoveClose}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <h1>users list</h1>
      </div>
      <div className="row">
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            toggleAddOpen(!isAddOpen);
          }}
        >
          Add+
        </button>
      </div>
      <div className="row mt-2">
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            toggleRemoveOpen(!isRemoveOpen);
          }}
        >
          Remove-
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
