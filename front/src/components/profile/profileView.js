import React from "react";
import { withRouter } from "react-router-dom";

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: undefined,
      about: "",
      photoKeys: [],
    };
  }

  async componentDidMount() {
    const responseAbout = await fetch(`/get-user/${this.props.nick}`, {
      method: "GET",
    });
    const dataAbout = await responseAbout.json();
    this.setState({
      name: dataAbout.name,
      age: dataAbout.age,
      about: dataAbout.about,
    });

    const responsePhotos = await fetch(`/get-photos/${this.props.nick}`, {
      method: "GET",
    });
    const dataPhotos = await responsePhotos.json();
    this.setState({
      photoKeys: dataPhotos.photoKeys,
    });
  }

  render() {
    return (
      <div>
        <div className="container container-row">
          <div>
            <img
              src={`/get-avatar/${this.props.nick}`}
              alt=""
              width="250"
              height="255"
            ></img>
          </div>
          <div>
            <ul className="container container-column">
              <li className="container container-row">
                <label className="item-label">NAME:</label>
                <span className="item-value">{this.state.name}</span>
              </li>
              <li className="container container-row">
                <label className="item-label">AGE:</label>
                <span className="item-value">{this.state.age}</span>
              </li>
              <li className="container container-row">
                <label className="item-label">ABOUT:</label>
                <span className="item-value">{this.state.about}</span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <hr></hr>
          <div className="container container-wrap">
            {this.state.photoKeys.map((photoId, index) => (
              <img
                className="item-margin"
                src={`/get-photo/${this.props.nick}/${photoId}`}
                key={index}
                width="275"
                height="255"
                alt=""
              ></img>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileView);
