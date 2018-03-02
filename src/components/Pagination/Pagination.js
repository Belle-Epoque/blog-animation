import React, { Component, Fragment } from "react";
import "./Pagination.css";

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state= {
            page: 1
        }
    }

    render() {
        let {page} = this.props;

        console.log(this.props)
        return (
            <Fragment>
                <button onClick={() => this.props.pagePrecedente()}> précédent </button>
                {page}
                <button onClick={() => this.props.pageSuivante()}> suivant </button>
            </Fragment>
        )
    }
}

export default Pagination;