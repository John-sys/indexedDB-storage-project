import { useState } from "react";

function UserInputComponent(onSave) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSave = () => {
    const user = { name, role };
    onSave(user);
    setName("");
    setRole("");
  };

  return (
    <div>
      <h3>Add User</h3>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Role:
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSave}>Save User</button>
    </div>
  );
}

export default UserInputComponent;
