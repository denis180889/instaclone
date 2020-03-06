import React from "react";
import LoginMain from "./components/login/loginMain";
import ProfileMain from "./components/profile/profileMain";
import RegistrationMain from "./components/registration/registrationMain";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      registration: false,
      auth: {
        nick: localStorage.getItem("nick"),
        token: localStorage.getItem("token")
      }
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this)
    this.finishRegistration = this.finishRegistration.bind(this)
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

  handleRegistration() {
    this.setState({
      registration: true
    });
  }

  finishRegistration() {
    this.setState({
      registration: false
    });
  }

  isAuthorized() {
    return Boolean(this.state.auth.token);
  }

  isRegistration() {
    return this.state.registration;
  }

  render() {
    return (
      <div className="container container-main" >

        {
          this.isRegistration() ?
            (<RegistrationMain finishRegistration={this.finishRegistration} />) :
            (this.isAuthorized() ? (
              <ProfileMain
                token={this.state.auth.token}
                nick={this.state.auth.nick}
                handleLogout={this.handleLogout}
              />
            ) : (
                <div>
                  <LoginMain handleAuth={this.handleAuth} />
                  <br></br>
                  <span> or go to <button onClick={this.handleRegistration}>Registration</button></span>
                </div>
              )
            )
        }

      </div>
    )
  }
}