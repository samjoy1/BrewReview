import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getDocs(collection(FIRESTORE_DB, "users"))
      .then((snapshot) => {
        const usersArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersArray);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <p>ID:</p> {user.id}
        </li>
      ))}
    </ul>
  );
}

export default Users;
