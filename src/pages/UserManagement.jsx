import { useState, useEffect } from "react";
import UserInputComponent from "../components/UserInputComponent";
import idb from "idb";
class LocalStorageDB {
  constructor(dbName, storeName) {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  async getDb() {
    return await idb.openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore(this.storeName);
      },
    });
  }

  async setItem(key, val) {
    const db = await this.getDb();
    const tx = db.transaction(this.storeName, "readwrite");
    tx.store.put(val, key);
    await tx.done;
  }

  async getItem(key) {
    const db = await this.getDb();
    return db.get(this.storeName, key);
  }

  async removeItem(key) {
    const db = await this.getDb();
    const tx = db.transaction(this.storeName, "readwrite");
    tx.store.delete(key);
    await tx.done;
  }
}

const UserManagement = () => {
  const [userData, setUserData] = useState(null);
  const dbName = "userDB";
  const storeName = "userDataStore";
  const userKey = "john_doe";

  useEffect(() => {
    const dbInstance = new LocalStorageDB(dbName, storeName);
    dbInstance.getItem(userKey).then((data) => {
      setUserData(data);
    });
  }, []);

  const handleSaveUser = (user) => {
    const dbInstance = new LocalStorageDB(dbName, storeName);
    dbInstance.setItem(userKey, user);
    setUserData(user);
  };

  return (
    <div>
      <h2>User Management System</h2>
      {userData && (
        <div>
          <p>User: {userData.name}</p>
          <p>Role: {userData.role}</p>
        </div>
      )}
      <UserInputComponent onSave={handleSaveUser} />
    </div>
  );
};

export default UserManagement;
