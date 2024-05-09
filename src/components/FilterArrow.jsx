// import PropTypes from "prop-types";
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";

function FilterArrow() {
  return (
    <>
      <div className="flex items-center text-lg font-bold space-x-0">
        <GoArrowUp />
        <GoArrowDown />
      </div>
    </>
  );
}

// FilterArrow.propTypes = {};

export default FilterArrow;
