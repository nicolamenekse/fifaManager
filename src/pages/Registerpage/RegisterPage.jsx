import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/authOperations";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const registerSubmit = () => {
    dispatch(register({ name, email,password }));
    setName("");
    setEmail("");
    setPassword("")
    console.log(name,email,password)
  };
  return (
    <div>
      <form onSubmit={registerSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register ! </button>
      </form>
    </div>
  );
}
