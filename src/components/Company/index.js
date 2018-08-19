import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { CompanyAction } from '../../store/actions/index';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ReactLoading from "react-loading";
import BusFormDialog  from './dialog';
import './index.css'


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class Company extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }

    componentWillMount() {
        let company_id = this.props.match.params.cid
        this.props.getCompany({ company_id })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    

    render() {
        const { classes, company, getCompanyLoader, getCompanyError } = this.props;
        return (
            <Paper className={`fade-in company-container ${classes.root}`}>
              <BusFormDialog 
                open={this.state.open}
                handleClose={this.handleClose}
               />
                {
                    !getCompanyLoader && !getCompanyError && company ?
                        <div className="fade-in">
                            <div style={companyHeaderStyle}>
                                <h2 className="company-detail-heading">Detail about {company ? company.companyName : ''}</h2>
                                <Button onClick={this.handleClickOpen} variant="fab" mini color="secondary" aria-label="Add" className={classes.button}>
                                    <AddIcon />
                                </Button>
                            </div>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>COMPANY NAME</TableCell>
                                        <TableCell>{company ? company.companyName : ''}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>CITY</TableCell>
                                        <TableCell>{company ? company.city : ''}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>CONTACT</TableCell>
                                        <TableCell>{company ? company.contact : ''}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>ABOUT</TableCell>
                                        <TableCell>{company ? company.companyDetail : ''}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>No of Buses</TableCell>
                                        <TableCell>{company ? company.buses : ''}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>See All Buses</TableCell>
                                        <TableCell>
                                        {
                                                company.buses && company.buses > 0 ?
                                                <Link to={`/company/${this.props.match.params.cid}/buses`}> View All Buses </Link>:
                                                'please create a bus'
                                        }
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </div>
                        : ''
                }
                {
                    getCompanyLoader && !getCompanyError ?
                        <div style={{ width: '100px', margin: '0 auto', marginTop: '50px' }}>
                            <ReactLoading type={'spokes'} width={100} color="#999" />
                        </div>
                        : ''
                }
            </Paper>
        );
    }
}

Company.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const { CompanyReducer: { company, getCompanyLoader, getCompanyError } } = state

    return {
        company, getCompanyLoader, getCompanyError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompany: (company_id) => dispatch(CompanyAction.getCompany(company_id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withStyles(styles)(Company)));

const companyHeaderStyle={
    display:"flex",
    justifyContent:"space-between",
    alignItems:'center'
}