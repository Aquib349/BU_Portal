import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

const Datepicker = ({ date, setDate, title, baseline, required }) => {
  return (
    <>
      <div className="flex flex-col pb-3">
        <label className="text-sm">
          {title}
          <span
            className={`text-red-500 font-bold ${
              required ? "static" : "hidden"
            }`}
          >
            *
          </span>
        </label>
        <DatePicker
          className="p-2 text-sm text-white bg-transparent outline-blue-500
           border border-slate-400 rounded-md w-full"
          selected={date}
          onChange={(date) => setDate(date)}
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

Datepicker.propTypes = {
  date: PropTypes.object.isRequired,
  setDate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  baseline: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};

export default Datepicker;
