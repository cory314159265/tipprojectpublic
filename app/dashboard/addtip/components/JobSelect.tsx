

interface Job {
  job_type: string;
  job_hourly_pay: string;
  job_id: number;
}

interface JobSelectProps {
  register: any;
  jobsList: Job[];
  errors: any;
}

const JobSelect: React.FC<JobSelectProps> = ({ register, jobsList, errors }) => {
  return (
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
            {`${job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)} making $${job.job_hourly_pay} at ${job.job_id}`}
          </option>
        ))}
      </select>
      {errors.job && (
        <p className="text-red-500 text-xs italic">
          This field is required
        </p>
      )}
    </div>
  );
};

export default JobSelect;

