import React from 'react';

export default class ProfileGreeting extends React.Component {

    render() {
        return (
            <div>
                <h1>Hey {this.props.nick}, nice to see you</h1>
            </div >
        )
    }
}