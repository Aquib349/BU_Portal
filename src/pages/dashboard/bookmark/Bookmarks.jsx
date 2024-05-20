import { GoBookmarkFill } from "react-icons/go";
import ManageBookmarks from "./ManageBookmarks";
import PropTypes from "prop-types";

const Bookmarks = ({ BookmarkData }) => {
  return (
    <>
      <div className="bookmark-component">
        <div className="main">
          <div className="requests">
            <div className="py-2 px-3 border-b border-slate-300">
              <h1 className="text-xl">My Bookmarks</h1>
              <p className="text-slate-500 text-[0.8rem]">
                Your bookmarked contracts
              </p>
            </div>

            <div className="bookmark-content">
              {BookmarkData.map((val) => (
                <div
                  key={val.RowKey}
                  className="flex justify-between items-center p-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-orange-600 cursor-pointer">
                      <GoBookmarkFill />
                    </span>
                    <div>
                      <img
                        src="/assets/contract-icon.png"
                        alt="agreement"
                        className="w-3"
                      />
                    </div>
                    <span className="text-sm">{val.Title}</span>
                  </div>
                  <ManageBookmarks />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Bookmarks.propTypes = {
  BookmarkData: PropTypes.array.isRequired,
};

export default Bookmarks;
