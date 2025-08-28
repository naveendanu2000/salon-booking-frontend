import { DatePicker } from "rsuite";

const DateTimePicker = ({ handleDate, handleTime }) => {
  return (
    <div className="inline-block px-15 justify-center items-center">
      <h1 className="text-3xl mb-10 text-center">Date and Time</h1>
      <div className="flex py-5 justify-center items-center">
        <DatePicker
          format="yyyy-MM-dd"
          size="lg"
          placeholder="Select Date"
          onChange={(date) => {
            if (date) handleDate(date.toISOString().split("T")[0]);
            else handleDate("");
          }}
          oneTap
        />
      </div>
      <div className="flex py-5 justify-center items-center">
        <DatePicker
          format="HH:mm:ss"
          size="lg"
          placeholder="Select Time"
          onChange={(date) => {
            if (date) handleTime(date.toTimeString().split(" ")[0]);
            else handleTime("");
          }}
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
