import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import './index.css'


class RideCard extends React.Component {

  render() {
    const { classes, ride } = this.props;
    return (
      <div>
        <Card className={classes.card} className="fade-in card-container" >
          <CardHeader
            style={{ padding: '15px' }}
            title={ride.title}
            subheader={ride.ride_id}
          />

          <div className="card-content">
            <p>{ride.arrDate}</p>
          </div>

          <div className="card-content">
            <p>{ride.depDate}</p>
          </div>

        </Card>
      </div>
    );
  }
}

RideCard.propTypes = {
  classes: PropTypes.object.isRequired,
  ride: PropTypes.object.isRequired,
};

export default withStyles({})(RideCard);
