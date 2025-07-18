"use client";

import { addUsers } from "@/features/users/UserSlice";
import { useAppDispatch } from "@/redux/hook";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          email: email,
          password: password,
        }
      );

      const { access_token, user } = response.data;

      if (access_token && user) {
        const payload = {
          newUsers: user,
          accessToken: access_token,
        };
        dispatch(addUsers(payload));
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("userType", user.usertype);

        if (user.usertype === "admin") {
          router.push("/admin");
        } else if (user.usertype === "user") {
          router.push("/");
        } else {
          console.warn("Unknown user type:", user.usertype);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-center flex-col items-center gap-y-4">
        <h3 className="text-3xl font-bold font-serif">Hey,</h3>
        <h3 className="text-3xl font-bold font-serif ">Welcom Back</h3>
        <div className="text-3xl font-bold font-serif ">
          Login To Your Account
        </div>
        <div className="flex justify-center flex-col items-center w-full">
          <input
            id="email"
            type="email"
            onChange={handleEmailChange}
            className="p-2 border rounded-md shadow-md mb-3 w-full"
            placeholder="example@gmail.com"
          />
          <input
            id="password"
            type="password"
            onChange={handlePasswordChange}
            className="p-2 border rounded-md shadow-md w-full"
            placeholder="password"
          />

          <button
            onClick={handleLogin}
            className="mt-4 bg-blue-400 rounded-lg p-2 text-white w-full cursor-pointer"
          >
            Login
          </button>

          <a href="" className="text-sky-400 mt-3 mb-3 cursor-pointer">
            Forgot Password?
          </a>
        </div>
        <div className="text-xl font-bold font-serif">
          Don&apos;t Have Account?
        </div>
        <Link
          href="/register"
          className="text-sky-400 text-xl font-bold font-serif cursor-pointer mt-3"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
