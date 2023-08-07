
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


interface Job {
  job_type: string;
  job_hourly_pay: string;
  job_id: number;
}

const AddTip: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const supabase = createClientComponentClient();

  const onSubmit = async (data: any) => {
    try {
    
      reset();
    } catch (error) {
      console.error("Error adding tip:", error);
    }
  };

  useEffect(() => {
    const getJobs = async function () {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const user_id = user.id;
        const response = await fetch(`/api/getjobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user_id),
        });
        const data = await response.json();
        setJobsList(data);
      }
    };
    getJobs();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="job"
          >
            Select a Job:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="job"
            {...register("job", { required: true })}
          >
            <option value="">Select a job...</option>
            {jobsList.map((job, index) => (
              <option key={index} value={job.job_id}>
                {`${
                  job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)
                } making $${job.job_hourly_pay} at ${job.job_id}`}
              </option>
            ))}
          </select>
          {errors.job && (
            <p className="text-red-500 text-xs italic">
              This field is required
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Enter Amount (USD):
          </label>
          <input
            type="text"
            className={`shadow appearance-none border ${
              errors.amount ? "border-red-500" : "border-gray-300"
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="amount"
            {...register("amount", {
              required: true,
              pattern: {
                value: /^\d+(\.\d{0,2})?$/, // Allow up to 2 digits after the decimal
                message: "Please enter a valid amount (USD).",
              },
            })}
            onKeyPress={(event) => {
              if (
                !(
                  (event.charCode >= 48 && event.charCode <= 57) || // Numbers 0-9
                  event.charCode === 46 // Decimal point
                )
              ) {
                event.preventDefault();
              }
            }}
            onInput={(event) => {
              const value = event.currentTarget.value;
              const indexOfDecimal = value.indexOf(".");
              if (indexOfDecimal !== -1 && value.length - indexOfDecimal > 3) {
                event.currentTarget.value = value.slice(0, indexOfDecimal + 3);
              }
            }}
            onBlur={(event) => {
              const value = event.currentTarget.value;
              if (!value.includes(".")) {
                event.currentTarget.value = value + ".00";
                event.currentTarget.dispatchEvent(new Event("input", { bubbles: true }));
              }
            }}
          />
          {errors.amount && (
  <p className="text-red-500 text-xs italic">
    Tip amount is required and must be a valid amount (USD).
  </p>
)}
        </div>

        {/* ... (other form fields) */}

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Tip
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTip;
