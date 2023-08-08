// SignupForm.tsx

import React from "react";
import { useForm } from "react-hook-form";

interface SignupFormProps {
  onSignup: (username: string, email: string, password: string) => void;
  errorMessage?: string; // Add a prop to receive the error message
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, errorMessage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/;

  const onSubmit = (data: any) => {
    const { username, email, password, verifyPassword } = data;

    if (password !== verifyPassword) {
      // Passwords do not match
      return;
    }

    // Call the signup function from the parent component
    onSignup(username, email, password);
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Enter your username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 4,
              message: "Username must be at least 4 characters long",
            },
          })}
        />
        {errors.username && (
          <p className="text-red-500 text-xs italic">
            {errors.username.message as string}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">
            {errors.email.message as string}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: passwordRegex,
              message:
                "Password must be at least 8 characters long, contain at least 1 number, 1 capital letter, and 1 symbol",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">
            {errors.password.message as string}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="verifyPassword"
        >
          Verify Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="verifyPassword"
          type="password"
          placeholder="Enter your password again"
          {...register("verifyPassword", {
            required: "Password verification is required",
          })}
        />
        {errors.verifyPassword && (
          <p className="text-red-500 text-xs italic">
            Passwords must match
          </p>
        )}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm italic pb-2">{errorMessage}</p>
      )}
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
