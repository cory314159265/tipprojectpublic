import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import JobSelect from "./JobSelect";
import AmountInput from "./AmountInput";
import DateInput from "./DateInput";
import { get } from "http";

interface Job {
  job_type: string;
  job_hourly_pay: string;
  job_id: number;
}

const AddTipForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [jobsList, setJobsList] = useState<Job[]>([]);
  const supabase = createClientComponentClient();

  const onSubmit = async (data: any) => {
    try {
      reset();
      console.log("User-entered fields:", data);
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

  const watchedFields = watch();

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <JobSelect register={register} jobsList={jobsList} errors={errors} />
      <AmountInput register={register} errors={errors} />
      <DateInput register={register} errors={errors} />
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
  );
};

export default AddTipForm;
