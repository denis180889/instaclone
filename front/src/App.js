import React from "react";
import LoginMain from "./components/login/loginMain";
import ProfileMain from "./components/profile/profileMain";
import RegistrationMain from "./components/registration/registrationMain";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registration: false,
      auth: {
        nick: localStorage.getItem("nick"),
        token: localStorage.getItem("token"),
      },
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.finishRegistration = this.finishRegistration.bind(this);
  }

  handleAuth(nick, token) {
    localStorage.setItem("nick", nick);
    localStorage.setItem("token", token);
    this.setState({
      auth: {
        nick,
        token,
      },
    });
  }

  handleLogout() {
    localStorage.removeItem("nick");
    localStorage.removeItem("token");
    this.setState({
      auth: {
        nick: "",
        token: "",
      },
    });
  }

  finishRegistration() {
    this.setState({
      registration: false,
    });
  }

  isAuthorized() {
    return Boolean(this.state.auth.token);
  }

  isRegistration() {
    return this.state.registration;
  }

  render() {
    let profile;
    if (this.isAuthorized()) {
      profile = (
        <ProfileMain
          token={this.state.auth.token}
          nick={this.state.auth.nick}
          handleLogout={this.handleLogout}
        />
      );
    }

    return (
      <Router>
        <div className="container container-main">
          <Switch>
            <Route path="/registration">
              <RegistrationMain finishRegistration={this.finishRegistration} />
            </Route>
            <Route path="/userNick">{profile}</Route>
            <Route path="/">
              <div>
                <LoginMain handleAuth={this.handleAuth} />
                <br></br>
                <span>
                  {" "}
                  or go to{" "}
                  <Link to="/registration">
                    <button>Registration</button>
                  </Link>
                </span>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
