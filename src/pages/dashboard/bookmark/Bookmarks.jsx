import { GoBookmarkFill } from "react-icons/go";
import ManageBookmarks from "./ManageBookmarks";
import axios from "axios";
import { useEffect, useState } from "react";

const Bookmarks = () => {
  const api = import.meta.env.VITE_API_URL;
  const account_id = import.meta.env.VITE_USER_KEY;

  const [BookmarkData, setBookmarkData] = useState([]);

  // function to get all the bookmark contents
  async function getAllBookmarks() {
    const headers = {
      "Content-Type": "application/json",
      "eContracts-ApiKey":
        "4oTDTxvMgJjbGtZJdFAnwBCroe8uoVGvk+0fR3bHzeqs9KDPOJAzuzvXh9TSuiUvl7r2dhNhaNOcv598qie65A==",
    };

    try {
      const response = await axios.get(
        `${api}/api/accounts/${account_id}/portal/bookmarks?userId=ThfohBn4`,
        { headers }
      );
      setBookmarkData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  useEffect(() => {
    getAllBookmarks();
  }, []);

  return (
    <>
      <div className="bookmark-component">
        <div className="main">
          <div className="requests bg-white mt-8 rounded-sm shadow-sm shadow-black/20 pb-2 h-[400px] overflow-auto">
            <div className="py-2 px-3 border-b border-slate-300">
              <h1 className="text-xl">My Bookmarks</h1>
              <p className="text-slate-500 text-[0.8rem]">
                Your bookmarked contracts
              </p>
            </div>

            <div className="bookmark-content">
              {BookmarkData.map((val) => (
                <div key={val.RowKey} className="flex justify-between items-center p-2">
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
                    <span className="text-sm">
                      {val.Title}
                    </span>
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

export default Bookmarks;
