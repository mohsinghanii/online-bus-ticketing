import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="mb-3">
        <div className="row">
          <div className="col-2">
            <Link to={`/@${profile.handle}`}>
              <img
                src={profile.user.avatar}
                alt=""
                className="rounded-circle"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
