import React from 'react';
import ProfileGreeting from './profileGreeting';
import ProfileAvatar from './profileAvatar';
import ProfilePhotos from './profilePhotos';
import ProfileAbout from './profileAbout';

export default class ProfileMain extends React.Component {

    render() {
        return (
            <div >
                <ProfileAvatar
                    token={this.props.token}
                    nick={this.props.nick}
                />
                <ProfileGreeting
                    nick={this.props.nick}
                    handleLogout={this.props.handleLogout}
                />
                <ProfileAbout
                    token={this.props.token}
                    nick={this.props.nick}
                />
                <ProfilePhotos
                    token={this.props.token}
                    nick={this.props.nick}
                />
            </div>
        )
    }
}