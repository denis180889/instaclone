import React from "react";
import { Link } from "react-router-dom";

export default class ProfileGreeting extends React.Component {
  render() {
    return (
      <div className="container container-row container-baseline">
        <h1>Hey {this.props.nick}, nice to see you</h1>
        <Link to="/search">
          <button>Search</button>
        </Link>
        <Link to="/">
          <button onClick={this.props.handleLogout}>Sign out</button>
        </Link>
      </div>
    );
  }
}
