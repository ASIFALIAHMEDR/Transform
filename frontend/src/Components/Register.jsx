import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../Utils/Firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="flex justify-center items-center h-lvh w-full bg-slate-50">
      <div className="bg-white border-slate-300 border rounded-md flex flex-col w-[325px] min-h-[300px] p-5 shadow-md">
        <input
          type="text"
          className="border border-slate-200 rounded-md py-2 px-5 mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="border border-slate-200 rounded-md py-2 px-5 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="border border-slate-200 rounded-md py-2 px-5 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="py-2 shadow px-5 bg-slate-900 text-white rounded-md mb-2" onClick={register}>
          Register
        </button>
        <button
          className="py-2 shadow bg-blue-700 text-white rounded-md mb-8"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div className="text-slate-800">
          Already have an account? <Link to="/" className="text-blue-800">Login now</Link>
        </div>
      </div>
    </div>
  );
}
export default Register;