import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Datepicker = ({ title, baseline, required, fieldname, validate }) => {
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (validate) {
      validate(fieldname, date, required);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className={`text-red-500 font-bold`}>*</span>
          )}
        </label>
        <DatePicker
          className={`p-2 text-sm rounded-md border w-full border-slate-400 outline-blue-400`}
          selected={date}
          onChange={(date) => {
            setDate(date);
            validate(fieldname, date, required);
          }}
          placeholderText="pick date"
        />
        <small className="text-slate-500">{baseline}</small>
      </div>
    </>
  );
};

Datepicker.propTypes = {
  title: PropTypes.string,
  baseline: PropTypes.string,
  required: PropTypes.string,
  validate: PropTypes.func,
};

export default Datepicker;
