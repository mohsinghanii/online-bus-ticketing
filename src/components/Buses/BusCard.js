import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import './index.css'


class BusCard extends React.Component {

  displayDate = (seconds) => {
     return new Date( new Date( new Date() - new Date(seconds)) )
  }


  render() {
    const { classes, bus, company } = this.props;
    return (
      <div>
        <Card className={classes.card} className="fade-in bus-card-container" >
          <CardHeader
            style={{ padding: '15px' }}
            title={company.companyName ? company.companyName : 'No Name of Bus'}
            subheader={ `Bus Name : ${bus.bus_name}` }
          />

          <div className="bus-card-content">
            <p> Bus Number {bus.bid}</p>
          </div>

           <div className="bus-card-content">
            <p> Date Created : {bus.date_created.seconds}</p>
          </div>

          <div className="bus-card-footer">
            <p>Number of Seats: <span>{bus.no_of_seats}</span></p>
          </div>
        </Card>
      </div>
    );
  }
}

BusCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles({})(BusCard);
