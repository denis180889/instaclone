import React from 'react';

export default class ProfileAvatar extends React.Component {

    render() {
        return (
            <div>
                <img src={`http://localhost:3000/get-avatar/${this.props.nick}`} alt=""></img>
            </div>
        )
    }
}