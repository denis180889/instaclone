import React from "react";
import SearchForm from "./searchForm";
import SearchCard from "./searchCard";

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
      <div className="container container-column ">
        <SearchForm handleSearch={this.handleSearch} />
        <SearchCard searchResults={this.state.searchResults} />
      </div>
    );
  }
}
