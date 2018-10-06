import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import './index.css'


class CompanyCard extends React.Component {
  constructor(props) {
    super(props)
    this.viewCompany = this.viewCompany.bind(this)
  }

  viewCompany(company) {
    const { history, selectedCompanyAction } = this.props
    history.push(`/company/${company.company_id}`)
    selectedCompanyAction(company)
  }


  render() {
    const { classes, company } = this.props;
    return (
      <div>
        <Card className={classes.card} className="fade-in card-container" onClick={()=>this.viewCompany(company)}>
          <CardHeader
            style={{ padding: '15px' }}
            title={company.companyName}
            subheader={company.city + ' - ' + company.contact}
          />

          <div className="card-content">
            <p>{company.companyDetail}</p>
          </div>

          <div className="card-footer">
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
