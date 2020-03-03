import React from 'react';

export default class ProfileGreeting extends React.Component {

    render() {
        return (
            <div className="container container-row container-baseline">
                <h1>Hey {this.props.nick}, nice to see you</h1>
                <button onClick={this.props.handleLogout}>Sign out</button>
            </div >
        )
    }
}