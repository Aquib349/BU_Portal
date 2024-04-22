import { IoIosArrowDown } from "react-icons/io";
import PropTypes from 'prop-types'

function Accordion({ heading, content }) {
  return (
    <>
      <div className={`relative overflow-hidden`}>
        <input
          type="checkbox"
          className="absolute top-0 inset-x-0 w-full h-10 opacity-0 peer"
        />
        <div className="text-slate-600 text-[0.8rem]">
          <span className="flex items-center h-[40px]">{heading}</span>
        </div>
        <div className="absolute top-3 right-3 transition-transform duration-300 rotate-0 peer-checked:rotate-180">
          <IoIosArrowDown />
        </div>
        <div
          className={`rounded-b-md max-h-0 overflow-auto peer-checked:max-h-[200px] transition-all ease-in-out duration-500 no-scrollbar`}
        >
          {content.map((val) => {
            return<p key={val.id} className="text-[0.8rem] px-1 pb-2 leading-4">{val.detail}</p>;
          })}
        </div>
      </div>
    </>
  );
}

Accordion.propTypes = {
    heading : PropTypes.string.isRequired,
    content : PropTypes.array.isRequired
}

export default Accordion;