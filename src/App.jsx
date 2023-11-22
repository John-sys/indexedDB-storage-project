// App.jsx

import { useState, useEffect } from "react";
import {
  isIndexedDBSupported,
  insertDataInIndexedDb,
  retrieveDataFromIndexedDb,
  deleteDataFromIndexedDb,
  updateDataInIndexedDb,
} from "indexeddb-package";

const App = () => {
  const [isDBSupported, setIsDBSupported] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [age, setAge] = useState("");

  useEffect(() => {
    // Check if IndexedDB is supported
    isIndexedDBSupported("myDB").then((result) => {
      setIsDBSupported(result);
      if (result) {
        // Retrieve data from IndexedDB on component mount
        handleRetrieveData();
      }
    });
  }, []);

  const handleInsertData = () => {
    const data = {
      id: allUsers.length + 1,
      firstName,
      lastName,
      email,
      age,
    };
    insertDataInIndexedDb("myDB", [data])
      .then(() => {
        alert("User added!");
        resetForm();
        handleRetrieveData();
      })
      .catch((error) => console.error(error));
  };

  const handleRetrieveData = () => {
    retrieveDataFromIndexedDb("myDB")
      .then((data) => setAllUsers(data))
      .catch((error) => console.error(error));
  };

  const handleUpdateData = () => {
    const updatedData = {
      id: selectedUser.id,
      firstName,
      lastName,
      email,
      age,
    };
    updateDataInIndexedDb("myDB", updatedData)
      .then(() => {
        alert("User updated!");
        resetForm();
        setEditUser(false);
        handleRetrieveData();
        setSelectedUser({});
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteData = (user) => {
    deleteDataFromIndexedDb("myDB", user.id)
      .then(() => {
        alert("User deleted!");
        handleRetrieveData();
      })
      .catch((error) => console.error(error));
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge("");
    setAddUser(false);
    setEditUser(false);
  };

  return (
    <div className="container mx-auto p-4">
      {isDBSupported ? (
        <div>
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-center">
              IndexedDB React App
            </h1>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                resetForm();
                setAddUser(true);
              }}
            >
              Add User
            </button>
          </div>
          {addUser || editUser ? (
            <div className="my-4">
              <div className="mb-4">
                <label className="block font-bold text-[18px]">First Name:</label>
                <input
                  className="border border-gray-300 rounded px-2 py-2 w-full"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-4 ">
                <label className="block font-bold text-[18px]">Last Name:</label>
                <input
                  className="border border-gray-300 rounded px-2 py-2 w-full"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-[18px]">Email:</label>
                <input
                  className="border border-gray-300 rounded px-2 py-2 w-full"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold text-[18px]">Age:</label>
                <input
                  className="border border-gray-300 rounded px-2 py-2 w-full"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full space-y-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={addUser ? handleInsertData : handleUpdateData}
                >
                  {addUser ? "Add User" : "Update User"}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => resetForm()}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">User List</h2>
            <ul>
              {allUsers.map((user) => (
                <li key={user.id} className="mb-2">
                  {user.firstName} {user.lastName} ({user.age} years old) -{" "}
                  {user.email}{" "}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => {
                      setEditUser(true);
                      setSelectedUser(user);
                      setFirstName(user.firstName);
                      setLastName(user.lastName);
                      setEmail(user.email);
                      setAge(user.age);
                    }}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteData(user)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">
            IndexedDB is not supported in this browser.
          </h1>
        </div>
      )}
    </div>
  );
};

export default App;
