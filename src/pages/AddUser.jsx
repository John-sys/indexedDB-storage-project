import { useState } from "react";
import { insertDataInIndexedDb } from "indexeddb-package";

const dbName = "MyUserDB";

const AddUser = () => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = { id: Date.now(), name };

    insertDataInIndexedDb(dbName, [newUser])
      .then(() => {
        setName("");
        alert("User added successfully");
      })
      .catch((error) => console.error(error));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
