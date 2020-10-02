import React from "react";
import ProfileGreeting from "./profileGreeting";
import ProfileAvatar from "./profileAvatar";
import ProfilePhotos from "./profilePhotos";
import ProfileAbout from "./profileAbout";
import ProfileView from "./profileView";
import { withRouter } from "react-router-dom";

class ProfileMain extends React.Component {
  render() {
    return (
      <div className="container-main">
        {this.props.nick !== this.props.match.params.nick ? (
          <ProfileView nick={this.props.match.params.nick} />
        ) : (
          <div>
            <ProfileGreeting
              nick={this.props.nick}
              handleLogout={this.props.handleLogout}
            />
            <div className="container container-row">
              <ProfileAvatar token={this.props.token} nick={this.props.nick} />
              <ProfileAbout token={this.props.token} nick={this.props.nick} />
            </div>
            <ProfilePhotos token={this.props.token} nick={this.props.nick} />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ProfileMain);
