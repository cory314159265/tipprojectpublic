"use client"
// Login.tsx

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { useRouter } from "next/navigation";
import SignupSuccessPage from "./components/SignUpSuccess";

const Login: React.FC = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null); // State to hold the error message
  const [showSignupForm, setShowSignupForm] = useState<boolean>(false);
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle login error and display the error message
        setLoginError("Incorrect email or password.");
        console.error("Login failed:", error.message);
      } else if (user) {
        // Login successful, redirect to the dashboard or home page
        console.log("Logged in as:", user.email);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignup = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        // Handle signup error and display the error message
        setLoginError("Error occurred during signup.");
        console.error("Signup failed:", error.message);
      } else if (data) {
        // Signup successful
        console.log("Signup successful:", data);
        setSignupSuccess(true); // Set the signup success status to true
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleToggleSignupForm = () => {
    setLoginError(null); // Clear the login error when toggling the form
    setShowSignupForm((prevValue) => !prevValue);
  };

  return (
      <div className="container mx-auto mt-10">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            {showSignupForm ? "Sign Up" : "Login"}
          </h2>
          {showSignupForm ? (
            // Render the SignupForm or the SignupSuccessPage based on the signup success status
            signupSuccess ? (
              <SignupSuccessPage email={'fake'} />
            ) : (
              <SignupForm onSignup={handleSignup} errorMessage={loginError as string} />
            )
          ) : (
            <LoginForm onLogin={handleLogin} errorMessage={loginError as string} />
          )}
          <div className="flex justify-center mt-4">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={handleToggleSignupForm}
            >
              {showSignupForm
                ? "Already Signed Up? Login Now"
                : "Not Signed Up, Sign Up Now"}
            </button>
          </div>
        </div>
      </div>
    );
};

export default Login;
