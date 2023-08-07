interface AmountInputProps {
  register: any;
  errors: any;
}

const AmountInput: React.FC<AmountInputProps> = ({ register, errors }) => {
  return (
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
              (
                (event.charCode >= 48 && event.charCode <= 57) || // Numbers 0-9
                event.charCode === 46
              ) // Decimal point
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
            let value = event.currentTarget.value;
            if (value !== "") {
              if (!value.includes(".")) {
                value = value + ".00";
              } else {
                const indexOfDecimal = value.indexOf(".");
                const digitsAfterDecimal = value.length - indexOfDecimal - 1;
                if (digitsAfterDecimal === 0) {
                  value = value + "00";
                } else if (digitsAfterDecimal === 1) {
                  value = value + "0";
                }
              }
              event.currentTarget.value = value;
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
  );
};

export default AmountInput;
