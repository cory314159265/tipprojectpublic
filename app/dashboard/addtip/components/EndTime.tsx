interface TimeInputProps {
    register: any;
    errors: any;
  }
  
  const EndTime: React.FC<TimeInputProps> = ({ register, errors }) => {
    return (
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="time"
        >
          Enter Shift End Time:
        </label>
        <input
          type="time"
          className={`shadow appearance-none border ${
            errors.time ? "border-red-500" : "border-gray-300"
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          id="endtime"
          {...register("endtime", { required: true })}
        />
        {errors.time && (
          <p className="text-red-500 text-xs italic">Shift start time is required.</p>
        )}
      </div>
    );
  };
  
  export default EndTime;