"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

type View = "sign-in" | "sign-up" | "check-email";
//test
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [view, setView] = useState<View>("sign-in");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      alert("Passwords do not match");
      return;
    }
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setView("check-email");
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(data, error);
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="mt-10 flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      {view === "check-email" ? (
        <p className="text-center text-foreground">
          Check <span className="font-bold">{email}</span> to continue signing
          up
        </p>
      ) : (
        <form
          className="flex-1 flex flex-col w-full gap-2 text-foreground"
          onSubmit={view === "sign-in" ? handleSignIn : handleSignUp}
        >
          {view === "sign-up" ? (
            <>
              <label className="text-md" htmlFor="email">
                User Name
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="choose a user name"
              />{" "}
            </>
          ) : (
            <></>
          )}
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />
          {view === "sign-up" ? (
            <>
              <label className="text-md" htmlFor="email">
                Verify Password
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="password"
                onChange={(e) => setVerifyPassword(e.target.value)}
                value={verifyPassword}
                placeholder="Verify your password"
              />{" "}
            </>
          ) : (
            <></>
          )}
          {view === "sign-in" && (
            <>
              <button className="bg-green-700 rounded px-4 py-2 text-white mb-6" name="Sign In">
                Sign In
              </button>
              <p className="text-sm text-center">
                Don't have an account?
                <button
                  className="ml-1 underline"
                  onClick={() => setView("sign-up")}
                >
                  Sign Up Now
                </button>
              </p>
            </>
          )}
          {view === "sign-up" && (
            <>
              <button className="bg-green-700 rounded px-4 py-2 text-white mb-6" name="sign up">
                Sign Up
              </button>
              <p className="text-sm text-center">
                Already have an account?
                <button
                  name = "sign in now"
                  className="ml-1 underline"
                  onClick={() => setView("sign-in")}
                >
                  Sign In Now
                </button>
              </p>
            </>
          )}
          <Link
            href="/"
            className="mt-10 w-fit-content mx-auto justify-center py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
          >
            Back
          </Link>
        </form>
      )}
    </div>
  );
}
