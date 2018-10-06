import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import './index.css'


class RouteCard extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { classes, route } = this.props;
    return (
      <div>
        <Card className={classes.card} className="fade-in card-container" >
          <CardHeader
            style={{ padding: '15px' }}
            title={route.title}
            subheader={route.route_id}
          />

          <div className="card-content">
            <p>{route.aboutRoute}</p>
          </div>

          <div className="card-footer">
            <p>Number of Stops: <span>{route.stops.length}</span></p>
          </div>
        </Card>
      </div>
    );
  }
}

RouteCard.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default withStyles({})(RouteCard);
