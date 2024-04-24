import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

const Datepicker = ({ date, setDate, title }) => {
  return (
    <>
      <div className="flex flex-col">
        <label className="text-sm">{title}</label>
        <DatePicker
          className="p-2 text-sm text-white bg-transparent outline-blue-500 border border-slate-400 rounded-md w-full"
          placeholderText="Required by"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>
    </>
  );
};

Datepicker.propTypes = {
  date: PropTypes.object.isRequired,
  setDate: PropTypes.func.isRequired,
  title : PropTypes.string.isRequired
};

export default Datepicker;
