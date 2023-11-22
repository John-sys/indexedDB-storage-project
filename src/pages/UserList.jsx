import { useEffect, useState } from "react";
import {
  retrieveDataFromIndexedDb,
  deleteDataFromIndexedDb,
} from "indexeddb-package";

const dbName = "MyUserDB";
const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveDataFromIndexedDb(dbName)
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    deleteDataFromIndexedDb(dbName, id)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
