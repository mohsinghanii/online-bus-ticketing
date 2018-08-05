import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button, TextField, DialogTitle } from '../../material-ui/index'


export class BusFormDialog extends React.Component{

    constructor(){
        super()
        this.state= {
            open: false,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.open !== prevState.open) {
          return ({ open: nextProps.open }) // <- this is setState equivalent
        }
      }

    render(){
        return (
            <div>
                <Dialog
                open={this.state.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send
                    updates occasionally.
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={this.props.handleClose} color="primary">
                    Subscribe
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        )
    }
}