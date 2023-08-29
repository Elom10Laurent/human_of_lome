import { useState } from "react";
import axios  from "axios";
import { Link } from "react-router-dom";

export const Register_page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function  registerUser(ev){
    ev.preventDefault();
    try{
      await axios.post('/register', {
        username,
        email,
        password,
      })
      alert('Enregistrement reussie !');
    }catch (error){
      alert('Enregistrement échouée. veillez rééssayer');
    } 
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 rounded-md p-10">
        <h1 className="text-4xl text-center mb-4">Resgister</h1>
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            className="w-full mb-2 p-2 rounded-md border"
            placeholder="Ama Kwatcha"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="email"
            className="w-full mb-2 p-2 rounded-md border"
            placeholder="you@gmail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            className="w-full mb-2 p-2 rounded-md border"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary w-full py-2 rounded-md" type="submit">
            Enter
          </button>
          <div className="mt-3 text-center text-gray-500">
            You have an account yet?{" "}
            <Link className=" text-red-500" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
