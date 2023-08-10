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
interface TipEntry {
  user_id: number;
  job_id: number;
  tip_amount: number;
  shift_date: Date;
  time_worked_minutes: number;
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
    reset();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const user_id = user.id;
      
      const userResponse = await fetch(`/api/addtipsapi/getuserid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user_id),
      });
      const user_idnum = await userResponse.json();
      const startShiftTime = new Date(`1970-01-01T${data.starttime}`);
      const endShiftTime = new Date(`1970-01-01T${data.endtime}`);
      if (endShiftTime < startShiftTime) {
        endShiftTime.setDate(endShiftTime.getDate() + 1);
      }
      const differenceInMinutes =
        (endShiftTime.getTime() - startShiftTime.getTime()) / 60000;
      const tip_date = new Date(data.date);
      const postData: TipEntry = {
        user_id: user_idnum[0].user_id,
        job_id: data.job,
        tip_amount: data.amount,
        shift_date: tip_date,
        time_worked_minutes: differenceInMinutes,
      };
      
      const response = await fetch(`/api/addtipsapi/addtip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
    }
  };

  useEffect(() => {
    const getJobs = async function () {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const user_id = user.id;
        const response = await fetch(`/api/addtipsapi/getjobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user_id),
        });
        const data = await response.json();

        const jobsArray = await Promise.all(
          data.map(async (job: Job) => {
            const response = await fetch(`/api/addtipsapi/getbusinessname`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(job.business_id),
            });
            const res = await response.json();
            return {
              job_idnum: job.job_id,
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
    <>
      {" "}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </>
  );
};

export default AddTipForm;
