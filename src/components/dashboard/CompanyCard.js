import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import './index.css'


class CompanyCard extends React.Component {
  constructor(props) {
    super(props)
    this.viewCompany = this.viewCompany.bind(this)
  }

  viewCompany(company_id) {
    this.props.history.push(`/company/${company_id}`)
  }


  render() {
    const { classes, company } = this.props;
    return (
      <div>
        <Card className={classes.card} className="fade-in company-card-container" onClick={()=>this.viewCompany(company.company_id)}>
          <CardHeader
            style={{ padding: '15px' }}
            title={company.companyName}
            subheader={company.city + ' - ' + company.contact}
          />

          <div className="company-card-content">
            <p>{company.companyDetail}</p>
          </div>

          <div className="company-card-footer">
            <p>Number of Busses: <span>{company.noOfBus}</span></p>
          </div>
        </Card>
      </div>
    );
  }
}

CompanyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles({})(CompanyCard);
