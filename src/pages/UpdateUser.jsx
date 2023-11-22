import { useState } from "react";
import { updateDataInIndexedDb } from "indexeddb-package";

const dbName = "MyUserDB";
const UpdateUser = (id) => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = { id, name };

    updateDataInIndexedDb(dbName, updatedUser)
      .then(() => {
        setName("");
        alert("User updated successfully");
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
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUser;
