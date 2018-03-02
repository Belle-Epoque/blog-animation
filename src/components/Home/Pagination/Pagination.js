import React from "react";
import PropTypes from "prop-types";
import RaisedButton from 'material-ui/RaisedButton';

const Pagination = ({ handleGoPreviousPage, handleGoNextPage, page }) => {
    return (
        <div className="Pagination">
            <RaisedButton onClick={handleGoPreviousPage} className={"Pagination__button " + (page < 2 ? "not-visible" : "")} label={"Aller à la page " + (page - 1)} />

          <p className="Pagination__current">{page}</p>

          {
              page < 100 &&
            <RaisedButton onClick={handleGoNextPage} className="Pagination__button" label={"Aller à la page " + (page + 1)} />
          }
        </div>
    );
}

Pagination.propTypes = {
    handleGoPreviousPage: PropTypes.func,
    handleGoNextPage: PropTypes.func,
    page: PropTypes.number
};

export default Pagination;