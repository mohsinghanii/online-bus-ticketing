import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    TextField,
    DialogTitle,
    CircularProgress
} from '../../material-ui/index';
import { Loading } from './../common/loadingComponent';
import { Alert } from './../common/Alert';
import { BusAction } from '../../store/actions/index';
import { connect } from 'react-redux';


class BusFormDialog extends React.Component {

    constructor() {
        super()
        this.state = {
            open: false,
            bus_name: '',
            bus_number: '',
            no_of_seats: '',
            isLoading: false,
            createdBus: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.open !== prevState.open) {
            return ({ open: nextProps.open }) // <- this is setState equivalent
        }

        if (nextProps.isLoading !== prevState.isLoading) {
            return ({ isLoading: nextProps.isLoading })
        }

        else {
            return null
        }
    }

    componentDidUpdate(prevProps, prevState){
       
        debugger
        if(this.props.isCreatedBus && !prevProps.isCreatedBus){ // if the bus is successfully created
             this.props.handleClose() // close the modal
        }

    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit() {
        const { bus_number, bus_name, no_of_seats } = this.state;
        const { selectedComapany } = this.props;
        this.props.addBusInCompanyAction({
            bid: bus_number,
            cid: selectedComapany.company_id,
            bus_name,
            no_of_seats,
            date_created: new Date()
        })
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <Alert isError={this.props.error.isError} errorMessage={this.props.error.message} type={"danger"} />
                    <DialogTitle id="form-dialog-title">Add Bus Name and Number</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please correctly add bus name and number
                    </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="bus_name"
                            label="Bus Name"
                            value={this.state.bus_name}
                            type="text"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="bus_number"
                            label="Bus Number"
                            value={this.state.bus_number}
                            type="text"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="no_of_seats"
                            label="Number of Seats"
                            value={this.state.no_of_seats}
                            type="text"
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    <Loading isLoading={this.props.isLoading} type={"spin"} color={"black"} />
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Add
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

BusFormDialog.propTypes = {
    selectedComapany: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    createdBus: PropTypes.string.isRequired,
    isCreatedBus: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    const {
        CompanyReducer,
        BusReducer
    } = state
    return {
        isLoading: BusReducer.isLoading,
        error: BusReducer.error,
        createdBus: BusReducer.createdBus, // will not need in future
        selectedComapany: CompanyReducer.selectedCompany,
        isCreatedBus: BusReducer.isCreatedBus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addBusInCompanyAction: (obj) => dispatch(BusAction.createBus(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusFormDialog)