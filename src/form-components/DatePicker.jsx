import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const Datepicker = ({
  title,
  baseline,
  required,
  fieldname,
  validate,
  initialValue,
}) => {
  // Add initialValue prop
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (initialValue) {
      const newDate = initialValue.split(" ")[0];
      setDate(newDate);
    }
  }, [initialValue]);

  useEffect(() => {
    if (validate) {
      const formattedDate = date ? format(date, "MM/dd/yyyy") : null;
      validate(fieldname, formattedDate, required);
    }
  }, [date, validate, fieldname, required]);

  return (
    <>
      <div className="flex flex-col pb-3">
        <label className="text-sm">
          {title}
          {required === "true" && (
            <span className="font-bold text-red-500">*</span>
          )}
        </label>
        <DatePicker
          className="w-full rounded-md border border-slate-400 p-2 text-sm outline-blue-400"
          selected={date}
          dateFormat="MM/dd/yyyy"
          onChange={(date) => {
            setDate(date);
            const formattedDate = date ? format(date, "MM/dd/yyyy") : null;
            validate(fieldname, formattedDate, required);
          }}
          placeholderText="Pick date"
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
  fieldname: PropTypes.string,
  validate: PropTypes.func,
  initialValue: PropTypes.string,
};

export default Datepicker;
