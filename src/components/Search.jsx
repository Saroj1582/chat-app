import { useState, useContext } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  async function handleSearch() {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleKeydown(e) {
    e.code === "Enter" && handleSearch();
  }

  async function handleClick() {
    //check weather group(chats in firebase) exists, if not create
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedID));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedID), { messages: [] });

        //create a new user chat
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedID + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedID + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    setUsername("");
    setUser(null);
  }

  return (
    <>
      <div>
        <div className="searchContainer">
          <input
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeydown}
            className="searchInput"
            type="text"
            value={username}
            placeholder="Find a user"
          />
        </div>
        {err && <span>User not found</span>}
        {user && (
          <div onClick={handleClick} className="userContainer">
            <img className="sidebarProfileImg" src={user.photoURL} alt="" />
            <div className="userDetail">
              <span className="userTitle">{user.displayName}</span>
              <span className="userMsg">Message from jane</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
