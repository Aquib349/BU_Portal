import PropTypes from "prop-types";
import FilterArrow from "../../../components/FilterArrow";

function AllProjects({
  ProjectName,
  AllChecked,
  toggleSelectAll,
  checkedItems,
  toggleCheckBox,
}) {
  return (
    <>
      <div className="all-projects font-semibold text-md grid gap-2 py-1 grid-cols-6 items-center px-4 border-b border-black">
        <input
          type="checkbox"
          name="select_project"
          className="w-3 h-3"
          checked={AllChecked}
          onChange={toggleSelectAll}
        />
        <span className="col-span-2">Project Name</span>
        <div className="col-span-2 flex items-center relative">
          <span className="absolute -left-10">
            <FilterArrow />
          </span>
          <span className="">Project Manager</span>
        </div>
        <span className="flex justify-end">
          <FilterArrow />
        </span>
      </div>

      {ProjectName?.map((val) => (
        <div
          key={val.RowKey}
          className="text-sm border-b grid grid-cols-6 items-center gapx-x-4 px-4 py-2 bg-slate-100 border-slate-100"
        >
          <input
            type="checkbox"
            name="select_project"
            className="w-3 h-3"
            checked={checkedItems[val.RowKey] || false}
            onChange={() => toggleCheckBox(val.RowKey, val.ProjectName)}
          />
          <span className="col-span-2">{val.ProjectName}</span>
          <span className="col-span-2 pl-1">{val.ProjectManager}</span>
          <span></span>
        </div>
      ))}
    </>
  );
}

AllProjects.propTypes = {
  ProjectName: PropTypes.array.isRequired,
  toggleSelectAll: PropTypes.func.isRequired,
  AllChecked: PropTypes.bool.isRequired,
  toggleCheckBox: PropTypes.func.isRequired,
  checkedItems: PropTypes.object.isRequired,
};

export default AllProjects;
