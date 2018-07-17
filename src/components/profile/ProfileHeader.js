import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import Linkify from 'react-linkify';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row text-center">
        <div className="col-md-12">
          <div className="card-body text-black mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle w-75"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-center">@{profile.handle}</h4>
              <p className="text-center">
                <Linkify>{profile.bio}</Linkify>
                {/*{profile.bio}{' '}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>

              {isEmpty(profile.location) ? null : <p>{profile.location}*/}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
