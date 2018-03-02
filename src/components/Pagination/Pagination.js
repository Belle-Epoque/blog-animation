import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        start: 0,
        rows: 20
      }
    };

    // Tableau de référence des images.
    this.refImages = [];
  }

  previousPage = () => {
    if (this.state.currentPage !== 1)
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
  };

  nextPage = () => {
    if (this.state.currentPage + 1 < this.state.githubData.lenght)
      this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { githubData, currentPage } = this.state;
    return (
      <div className="container">
        <table key={name.id}>
          {githubData.slice(currentPage * 20, 20).map((name, index) => (
            <tr>
              <th>
                <img src={name.owner.avatar_url} />
              </th>
              <td>
                {name.owner.login}
                <div className="border-bottom" />
              </td>
              <td>
                {name.description}
                <div className="border-bottom" />
              </td>
              <td>
                <a href={name.homepage}>{name.homepage}</a>
              </td>
            </tr>
          ))}
        </table>
        <button onClick={this.previousPage}>Previous Page</button>
        <button onClick={this.nextPage}>Next Page</button>
      </div>
    );
  }
}

export default Pagination;
