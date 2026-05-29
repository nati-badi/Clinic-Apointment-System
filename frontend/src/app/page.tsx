"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "GET",
          headers: {
            "method": "GET",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("Verify token error:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-gray-600 mt-4">Verifying your session...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
        Welcome to <span className="text-primary">Clinic Mini</span>
      </h1>
      <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
        Fast, reliable healthcare scheduling at your fingertips. Choose your doctor, pick a time, and secure your visit in less than a minute.
      </p>

      <div className="flex gap-4">
        {isLoggedIn ? (<Link
          href="/appointments"
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition text-lg shadow-sm"
        >
          Make an Appointment
        </Link>) : (<Link
          href="/login"
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition text-lg shadow-sm"
        >
          Login
        </Link>)}
      </div>
    </div>
  );
}
