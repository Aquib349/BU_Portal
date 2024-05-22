import { useState } from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

function Pagination({ itemsPerPage, data, toggleModal, renderComponent }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = data?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(data?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      {renderComponent({
        data: currentItems,
        toggleModal: toggleModal,
      })}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
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
  data: PropTypes.array.isRequired,
  renderComponent: PropTypes.func.isRequired,
};

export default Pagination;
