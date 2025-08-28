const TimePicker = ({
  heading,
  hours,
  minutes,
  handleHours,
  handleMinutes,
  invalidHours,
  invalidMinutes,
}) => {
  return (
    <div className="m-4 w-80 outline-none border-0 ring-1 rounded-md pt-4 pb-6">
      <div className="mb-6 text-lg">{heading}</div>
      <div className="inline-block">
        <select
          value={hours}
          className="p-3 w-15 mx-4 text-white rounded-md ring-1"
          onChange={(e) => handleHours(e.target.value)}
          id="hours"
        >
          {Array.from({ length: 24 }, (_, i) => {
            return <option value={i + 1}>{i + 1}</option>;
          })}
        </select>
        <span> Hours </span>
      </div>
      <div className="inline-block">
        <select
          value={minutes}
          className="p-3 w-15 mx-4 text-white rounded-md ring-1"
          onChange={(e) => handleMinutes(e.target.value)}
          id="minutes"
        >
          {Array.from({ length: 61 }, (_, i) => {
            return <option value={i} disabled={i}>{i}</option>;
          })}
        </select>
        <span> Minutes </span>
      </div>
    </div>
  );
};

export default TimePicker;
