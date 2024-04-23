import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

const Datepicker = ({ date, setDate }) => {
  return (
    <>
      <div>
        <DatePicker
          className="p-2 text-sm text-white bg-transparent outline-none border border-slate-300 rounded-md"
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
};

export default Datepicker;
