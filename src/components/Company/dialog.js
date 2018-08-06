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
import { BusAction } from '../../store/actions/index';
import { connect } from 'react-redux';


class BusFormDialog extends React.Component {

    constructor() {
        super()
        this.state = {
            open: false,
            bus_name:'',
            bus_number:'',
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

        if(nextProps.isLoading !== prevState.isLoading){
            return ({isLoading: nextProps.isLoading})
        }

        else{
            return null
        }
    }

    componentDidUpdate(prevProps, prevState){
       if(prevProps.createdBus !== this.props.createdBus){
           this.props.handleClose()
       }
    }
   
    handleChange(event){
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit(){
        const { bus_number, bus_name } = this.state;
        const { selectedComapany } = this.props;
        this.props.addBusInCompanyAction({
            bid: bus_number,
            cid: selectedComapany.company_id,
            bus_name,
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
                            autoFocus
                            margin="dense"
                            id="bus_number"
                            label="Bus Number"
                            value={this.state.bus_number}
                            type="text"
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    {
                        (this.props.isLoading) ?
                            <CircularProgress  thickness={7} />
                         :
                         ""
                    }
                    {
                        (this.props.isError)?
                           <p style={{textAlign: 'center', color:"red"}}>{this.props.error}</p>
                           :
                           ''
                    }
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
    isError: PropTypes.bool.isRequired,
    createdBus: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
  };

const mapStateToProps = (state) => {
    const {
        CompanyReducer,
        BusReducer
    } = state
    return {
        isLoading: BusReducer.isLoading,
        isError: BusReducer.isError,
        createdBus: BusReducer.createdBus, // will not need in future
        error: BusReducer.error,
        selectedComapany: CompanyReducer.selectedCompany
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addBusInCompanyAction : (obj) => dispatch(BusAction.createBus(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusFormDialog)