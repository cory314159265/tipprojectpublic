import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import JobSelect from "./JobSelect";
import AmountInput from "./AmountInput";
import DateInput from "./DateInput";
import StartTime from "./StartTime";
import EndTime from "./EndTime";

interface Job {
  job_type: string;
  job_hourly_pay: string;
  job_id: number;
  business_id: string;
  created_at: string;
  user_id: string;
}

const AddTipForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [jobsList, setJobsList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClientComponentClient();

  const onSubmit = async (data: any) => {
    try {
      reset();
      console.log("User-entered fields:", data);
      const startShiftTime = new Date(`1970-01-01T${data.starttime}`);
      const endShiftTime = new Date(`1970-01-01T${data.endtime}`);

      // Check if endShiftTime is earlier than startShiftTime (next day scenario)
      if (endShiftTime < startShiftTime) {
        endShiftTime.setDate(endShiftTime.getDate() + 1);
      }

      const differenceInMinutes =
        (endShiftTime.getTime() - startShiftTime.getTime()) / 60000;
      console.log("Difference in minutes:", differenceInMinutes);
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
        
        const jobsArray = await Promise.all(
          data.map(async (job: Job) => {
            const response = await fetch(`/api/getbusinessname`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(job.business_id),
            });
            const res = await response.json();
            return {
              job_type: job.job_type,
              job_hourly_pay: job.job_hourly_pay,
              job_id: res[0].name,
            };
          })
        );
  
        setJobsList(jobsArray);
        setIsLoading(false);
      }
    };
  
    getJobs();
  }, []);
  

  const watchedFields = watch();
  
  return (
    <> {isLoading ? <p>Loading...</p> : 
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <JobSelect register={register} jobsList={jobsList} errors={errors} /> 
      <AmountInput register={register} errors={errors} />
      <DateInput register={register} errors={errors} />
      <StartTime register={register} errors={errors} />
      <EndTime register={register} errors={errors} />
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
}</>
  );
};

export default AddTipForm;
