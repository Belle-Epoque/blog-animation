import React, { Component, Fragment } from "react";
import './Pagination.css';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            first: false
        }
    }
    handleClick(e) {
 
        this.setState ({
            page: this.state.page + 1, 
        });
        
     }
    
     handleClick2(d) {
 
        this.setState ({
            page: this.state.page - 1, 
        });
        
     }
     renderPage () {
        if (this.state.page < 0) {
            return 0
        }

        return this.state.page
    }

     render() {
        const page = this.page;
         return (
            <Fragment>
                <div className="Pagination">
                    <button className="buttonStyle" onClick={(e) => this.handleClick(e)}>+</button>
                    <p className="nbPage" >{this.renderPage()}</p>
                    <button className="buttonStyle" onClick={(d) => this.handleClick2(d)}>-</button>
                </div>
            </Fragment>
         )
     }
}
export default Pagination;