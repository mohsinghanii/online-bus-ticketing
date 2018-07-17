import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: 'd187fadde3ca9030cb16',
      clientSecret: '5fbd673336140525568704e7b21c8408d5fafce4',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span
              className="badge badge-info mr-1"
              role="img"
              aria-label="White Medium Star"
            >
              ⭐Stars: {repo.stargazers_count}
            </span>
            <span
              className="badge badge-secondary mr-1"
              role="img"
              aria-label="Face With Monocle"
            >
              🧐Watchers: {repo.watchers_count}
            </span>
            <span
              className="badge badge-success"
              role="img"
              aria-label="Fork and Knife"
            >
              🍴Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myRef">
        <hr />
        <h3
          className="text-info text-dark text-center"
          role="img"
          aria-label="Man Technologist"
        >
          <span role="img" aria-label="Man Technologist">
            👨‍💻
          </span>
          Latest Github Repos
        </h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
