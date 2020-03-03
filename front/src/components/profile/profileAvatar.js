import React from 'react';

export default class ProfileAvatar extends React.Component {

    render() {
        return (
            <div>
                <img src={`/get-avatar/${this.props.nick}`} alt=""></img>
            </div>
        )
    }
}