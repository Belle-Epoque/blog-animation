import React, { Component, Fragment } from "react";
import "./Filter.css";

class Filter extends Component {
    constructor(props) {
        super(props);
    }

    handleClick (value) {
        console.log("test value handleClick");
        console.log(value);
    }

    render() {
        return (
            <Fragment>
                <form method="post">
                    <p>
                        <label>Choisisez un filtre</label><br />
                        <select name="pays" id="pays">
                            <option onClick={() => this.handleclic("one piece")}>One piece</option>
                            <option onClick={() => this.handleclick("Matrix")}>Matrix</option>
                            <option onClick={() => this.handleclick("SpongeBob")}>Spongebob</option>
                        </select>
                    </p>
                </form>
            </Fragment>
        )
    }
}

export default Filter;