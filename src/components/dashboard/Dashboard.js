import React, { Component } from 'react';
import CompanyCard from '../CompanyCard/index'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CreateCompany from './../CreateCompany/index'
import './index.css'
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: [0, 1, 2, 3, 4, 5, 6]
    }

    this.gotoCreateCompany = this.gotoCreateCompany.bind(this)
  }

  gotoCreateCompany() {
    this.props.history.push('/create-company')
  }

  render() {
    return (
      <div className="container" style={{ paddingBottom: '100px' }}>
        <div className="row">
          <div className="col-md-12">
            <div className="create-company-text">
              Create Company
            </div>
            <Card className="add-company-card">
              <div class='add-company-button-wrapper'>
                <button className="add-company-button" onClick={this.gotoCreateCompany}>
                  <img src={require('./../../assets/icons/round_add_circle_outline_black.png')} />
                </button>
              </div>
            </Card>
            <hr />
            <Grid container spacing={24}>
              {
                this.state.companies.map(() => {
                  return (
                    <Grid item sm={4}>
                      <CompanyCard />
                    </Grid>
                  )
                })
              }
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
