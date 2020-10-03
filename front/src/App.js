import React from "react";
import LoginMain from "./components/login/loginMain";
import ProfileMain from "./components/profile/profileMain";
import RegistrationMain from "./components/registration/registrationMain";
import Page404 from "./components/page404";
import SearchMain from "./components/search/searchMain";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

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

  isAuthorized() {
    return Boolean(this.state.auth.token);
  }

  render() {
    return (
      <Router>
        <div className="container container-main">
          <Switch>
            <Route exact path="/registration">
              <RegistrationMain finishRegistration={this.finishRegistration} />
            </Route>
            {this.isAuthorized() && (
              <Redirect exact from="/" to={`/user/${this.state.auth.nick}`} />
            )}
            <Route path="/user/:nick">
              <ProfileMain
                token={this.state.auth.token}
                nick={this.state.auth.nick}
                handleLogout={this.handleLogout}
              />
            </Route>
            <Route exact path="/">
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
            <Route exact path="/search">
              <SearchMain />
            </Route>
            <Route>
              <Page404 />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
