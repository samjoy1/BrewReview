"use client";

import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../../firebaseconfig";
import { useState, useEffect } from "react";

function User({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getDoc(doc(FIRESTORE_DB, "users", userId))
      .then((docSnap) => {
        if (docSnap.exists()) {
          setUser({ id: docSnap.id, ...docSnap.data() });
        }
      })
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div>
      {user && (
        <>
          <p>ID: {user.id}</p>
          {/* <p>Name: {user.name}</p> */}
          {/* <p>Email: {user.email}</p> */}
        </>
      )}
    </div>
  );
}

export default User;
