import React from "react";
import LoginMain from "./components/login/LoginMain";
import ProfileGreeting from "./components/profile/ProfileGreeting";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: {
        nick: localStorage.getItem("nick"),
        token: localStorage.getItem("token")
      }
    };
    this.handleAuth = this.handleAuth.bind(this)
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

  isAuthorized() {
    return Boolean(this.state.auth.token);
  }

  render() {
    return (
      <div>
        {this.isAuthorized() ? (
          <ProfileGreeting nick={this.state.auth.nick} />
        ) : (
            <LoginMain handleAuth={this.handleAuth} />
          )}
      </div>
    )

  }

}