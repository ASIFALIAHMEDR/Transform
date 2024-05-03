import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth, db, logout } from "../Utils/Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="flex justify-center items-center h-lvh w-full bg-slate-50">
       <div className="flex justify-center items-center bg-white border-slate-300 border rounded-md flex flex-col w-[325px] min-h-[300px] p-5 shadow-md">
        Logged in as
         <div className="text-5xl font-bold">{name}</div>
         <div>{user?.email}</div>
         <button className="py-2 shadow px-5 bg-slate-900 text-white rounded-md m-5" onClick={logout}>
          Logout
         </button>
       </div>
     </div>
  );
}
export default Dashboard;