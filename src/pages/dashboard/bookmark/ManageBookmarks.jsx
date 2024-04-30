import { CiViewList } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineNoteAdd } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

function ManageBookmarks() {
  const [show, setShow] = useState(false);
  const dropdownBookmark = useRef(null);
  const list = [
    { id: 1, name: "View Summary", icon: <CiViewList /> },
    { id: 2, name: "Remove Bookmark", icon: <CiBookmark /> },
    { id: 3, name: "Follow / Get Alerts", icon: <IoEyeOutline /> },
    { id: 4, name: "Add a Note", icon: <MdOutlineNoteAdd /> },
  ];

  useEffect(() => {
    const closeDropdown = (event) => {
      if (
        dropdownBookmark.current &&
        !dropdownBookmark.current.contains(event.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownBookmark}>
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-[4px] bg-white px-3 py-[4px]
                       text-[0.8rem] font-medium hover:bg-gray-50"
            onClick={() => setShow(!show)}
          >
            <BsThreeDotsVertical />
          </button>
        </div>
        <div
          className={`absolute right-4 z-10 mt-2 w-60 origin-top-right rounded-md bg-slate-800 text-white
       ${show ? "static" : "hidden"}`}
        >
          <div className="py-1">
            {list.map((val) => (
              <div
                key={val.id}
                className="flex items-center gap-1 hover:bg-slate-600 px-4 cursor-pointer"
              >
                <span>{val.icon}</span>
                <span className="block p-2 text-sm">{val.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageBookmarks;