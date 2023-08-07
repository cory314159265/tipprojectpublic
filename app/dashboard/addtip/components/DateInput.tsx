import React from "react";

interface DateInputProps {
  register: any;
  errors: any;
}

const DateInput: React.FC<DateInputProps> = ({ register, errors }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="date"
      >
        Enter Date:
      </label>
      <input
        type="date"
        className={`shadow appearance-none border ${
          errors.date ? "border-red-500" : "border-gray-300"
        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        id="date"
        {...register("date", { required: true })}
      />
      {errors.date && (
        <p className="text-red-500 text-xs italic">Date is required.</p>
      )}
    </div>
  );
};

export default DateInput;
