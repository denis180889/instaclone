import React from "react";

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search = async (e) => {
    e.preventDefault();

    const searchPhrase = e.target.elements.searchPhrase.value;
    let response = await fetch(`/searchUsers?searchPhrase=${searchPhrase}`);

    if (response.ok) {
      const data = await response.json();
      this.props.handleSearch(data);
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    return (
      <div className="container-row">
        <form onSubmit={this.search}>
          <h1>Seach profiles:</h1>
          <input type="text" name="searchPhrase"></input>
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
