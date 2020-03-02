import React from 'react';
import ProfileGreeting from './profileGreeting';
import ProfileAvatar from './profileAvatar';
import ProfilePhotos from './profilePhotos';

export default class ProfileMain extends React.Component {

    render() {
        return (
            <div>
                <ProfileAvatar
                    nick={this.props.nick}
                />
                <ProfileGreeting
                    nick={this.props.nick}
                    handleLogout={this.props.handleLogout}
                />
                <ProfilePhotos
                    nick={this.props.nick}
                />
            </div>
        )
    }
}