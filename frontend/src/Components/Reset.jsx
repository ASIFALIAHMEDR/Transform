import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../Utils/Firebase";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="flex justify-center items-center h-lvh w-full bg-slate-50">
      <div className="bg-white border-slate-300 border rounded-md flex flex-col w-[325px] min-h-[150px] p-5 shadow-md">
        <input
          type="text"
          className="border border-slate-200 rounded-md py-2 px-5 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="py-2 shadow px-5 bg-slate-900 text-white rounded-md mb-2"
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register" className="text-blue-800">Register Now</Link>
        </div>
      </div>
    </div>
  );
}
export default Reset;