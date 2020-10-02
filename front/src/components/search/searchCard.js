import React from "react";
import { Link } from "react-router-dom";

export default class SearchCard extends React.Component {
  render() {
    return (
      <div className="container-column">
        {this.props.searchResults.map((searchCard) => (
          <Link
            to={{
              pathname: `/user/${searchCard.nick}`,
            }}
          >
            <div className="container container-row search-result">
              <div>
                <img
                  className="item-margin"
                  src={`/get-avatar/${searchCard.nick}`}
                  alt=""
                  width="100"
                  height="100"
                ></img>
              </div>
              <div>
                <ul>
                  <li className="container-row">
                    <label className="item-label">NAME:</label>
                    <span className="item-value">{searchCard.name}</span>
                  </li>
                  <li className="container-row">
                    <label className="item-label">AGE:</label>
                    <span className="item-value">{searchCard.age}</span>
                  </li>
                  <li className="container-row">
                    <label className="item-label">ABOUT:</label>
                    <span className="item-value">{searchCard.about}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}
