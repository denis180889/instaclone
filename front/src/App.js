import React from "react";
import LoginMain from "./components/login/loginMain";
import ProfileMain from "./components/profile/profileMain";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: {
        nick: localStorage.getItem("nick"),
        token: localStorage.getItem("token")
      }
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleAuth(nick, token) {
    localStorage.setItem("nick", nick);
    localStorage.setItem("token", token);
    this.setState({
      auth: {
        nick,
        token
      }
    });
  }

  handleLogout() {
    localStorage.removeItem("nick");
    localStorage.removeItem("token");
    this.setState({
      auth: {
        nick: "",
        token: ""
      }
    });
  }

  isAuthorized() {
    return Boolean(this.state.auth.token);
  }

  render() {
    return (
      <div>
        {this.isAuthorized() ? (
          <ProfileMain
            token={this.state.auth.token}
            nick={this.state.auth.nick}
            handleLogout={this.handleLogout}
          />
        ) : (
            <LoginMain handleAuth={this.handleAuth} />
          )}
      </div>
    )
  }
}