import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export const Login_page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setUser(data);
      alert("Bienvenue !");
      setRedirect(true);
    } catch (error) {
      alert("veillez rééssayer!");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 rounded-md p-10">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="you@gmail.com"
            className="w-full mb-2 p-2 rounded-md border"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="w-full mb-2 p-2 rounded-md border"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary w-full py-2 rounded-md" type="submit">
            Login
          </button>
          <div className="mt-3 text-center text-gray-500">
            Don't have an account yet?{" "}
            <Link className="text-red-500" to={"/register"}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
