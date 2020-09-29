import React from "react";
import SearchForm from "./searchForm";

export default class SearchMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchResults) {
    this.setState({
      searchResults: searchResults,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="container-row">
          <SearchForm handleSearch={this.handleSearch} />
        </div>
      </div>
    );
  }
}
