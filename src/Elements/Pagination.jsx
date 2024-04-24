import { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import Requests from "../pages/dashboard/requests/Requests";
import { RequestContext } from "../context/RequestContext";

function Pagination({ itemsPerPage, FilteredData, toggleModal }) {
  const [itemOffset, setItemOffset] = useState(0);
  const { RequestData } = useContext(RequestContext);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = (
    FilteredData.length > 0 ? FilteredData : RequestData?.SubmittedRequests
  )?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(
    (FilteredData.length > 0 ? FilteredData : RequestData?.SubmittedRequests)
      ?.length / itemsPerPage
  );

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) %
      (FilteredData.length > 0 ? FilteredData : RequestData.SubmittedRequests)
        .length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <Requests
        FilteredData={FilteredData}
        toggleModal={toggleModal}
        currentItems={currentItems}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        pageClassName="pagination-item"
        activeClassName="active"
        previousClassName="pagination-previous-next"
        nextClassName="pagination-previous-next"
        disabledClassName="disabled"
      />
    </>
  );
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  toggleModal: PropTypes.func.isRequired,
  FilteredData: PropTypes.array.isRequired,
};

export default Pagination;
