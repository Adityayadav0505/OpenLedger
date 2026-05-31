import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import RemoveIcon from "@material-ui/icons/Remove";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle style={{background: '#2A3F4D'}} disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

class DeleteButtonModal extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        <RemoveIcon />
          Delete
        </Button>
        <Dialog 
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open} 
        >
          <DialogTitle  id="customized-dialog-title" onClose={this.handleClose} >
            
          <font color='white'>Delete record(s)?</font>
          </DialogTitle>
          <DialogContent style={{background: '#2A3F4D'}}>
            <Typography gutterBottom>
             <font color='white'> You will lose your record(s) after this action. We can't recover them once you delete.</font>
            </Typography>
            <Typography gutterBottom>
            <font color='white'><p> Are you sure you want to<font color='red'> permanently delete</font> them? </p></font>
            </Typography>
          </DialogContent>
          <DialogActions style={{background: '#2A3F4D'}}>
          <Button onClick={this.handleClose} color="primary" variant="outlined">
          <font color='white'> Cancel </font>
            </Button>
            <Button onClick={this.handleClose} color="primary" variant="contained">
              Delete 
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteButtonModal;