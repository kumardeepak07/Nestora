import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";


export default function Home() {
  return (
    <>
      <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/bg-login.png')" }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-8 py-10 w-[360px] shadow-2xl text-center">
        <h1 className="text-4xl font-bold text-[#5c2e10]">Nestora</h1>
        <p className="text-gray-700 text-lg mt-1 mb-6">Welcome back!</p>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white font-semibold rounded-xl hover:bg-orange-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="font-semibold text-[#5c2e10] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
