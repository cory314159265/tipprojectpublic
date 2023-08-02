"use client"

import { ParsedUrlQuery } from "querystring";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";


export default function JobDetails() {
  const supabase = createClientComponentClient();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");
  const [hourlyPay, setHourlyPay] = useState("");
  const [job, setJob] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const jobOptions = [
    "host",
    "server",
    "buser",
    "bartender",
    "barback",
    "server assistant",
  ];
  const router = useRouter();

  useEffect(() => {
    // When formSubmitted is true, handle the redirect after 1 second
    if (formSubmitted) {
      const timeoutId = setTimeout(() => {
        router.push("/dashboard?jobadded=true");
      }, 500);

      // Clear the timeout when the component is unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [formSubmitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { data, error } = await supabase.auth.getSession();
    console.log("user ", data);
    e.preventDefault();
    if (data.session) {
      const requestBody = {
        user_id: data.session.user.id,
        job_type: job,
        job_hourly_pay: hourlyPay,
        business_id: jobId,
      };
      console.log(requestBody);
      try {
        const response = await fetch("/api/addjob/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        const resfromjobinsert = await response.json();
        console.log("response", resfromjobinsert);
        if (resfromjobinsert) {
          setFormSubmitted(true);
          setSuccessMessage(`${job} paying ${hourlyPay} added successfully! Redirecting to dashboard...`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    // add job to jobs database, add job to users profile, add job to business
  };

  return (
    <div className="mt-10 flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="flex-1 flex flex-col w-full gap-2 text-foreground"
        onSubmit={handleSubmit}
      >
        <label className="text-md" htmlFor="job">
          Job
        </label>
        <select
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="job"
          onChange={(e) => setJob(e.target.value)}
          value={job}
        >
          <option value="">Select a job</option>
          {jobOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <label className="text-md" htmlFor="hourlyPay">
          Fixed Hourly Pay
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="hourlyPay"
          type="number"
          min="0"
          step="0.01"
          onChange={(e) => setHourlyPay(e.target.value)}
          value={hourlyPay}
          placeholder="Enter fixed hourly pay"
        />

        {/* Display the success message if formSubmitted is true */}
        {formSubmitted && (
          <div className="text-green-700 bg-green-100 rounded-md px-4 py-2 mb-6">
            {successMessage}
          </div>
        )}

        <button
          type="submit"
          className="bg-green-700 rounded px-4 py-2 text-white mb-6"
          name="Sign Up"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
