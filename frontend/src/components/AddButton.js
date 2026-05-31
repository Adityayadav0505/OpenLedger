import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import {  useState } from "react";
import Grid from '@material-ui/core/Grid';
import DatePicker from  './datePicker';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { pxToRem } from '../utils/theme';
import Slide from '@material-ui/core/Slide';
import { Snackbar,IconButton } from '@material-ui/core';

const formLabelsTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: '#db3131',
        '&$error': {
          color: '#db3131'
        },
      }
    },
    MuiDialog: {
      paperWidthSm: {
        maxWidth: "1105px",
      },
      paperScrollPaper: {
        maxHeight: "509px",
      },
      paper: {
        overflowY: 'hidden',
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: pxToRem(10),
      },
      notchedOutline: {
        borderColor: '#356680',
      },
      root: {
        borderRadius: pxToRem(10),
      },
      multiline: {
        width: pxToRem(350),
        height: pxToRem(160),
        padding: pxToRem(0)+' '+pxToRem(20),
      }
    },
    MuiInputBase: {
      root: {
        '&:focus': {
          borderColor: '#356680'
        }
      },
      input: {
        width: pxToRem(325),
        color: '#ffffff',
        fontSize: pxToRem(20),
        fontFamily: 'Ubuntu',
      }
    },
    MuiFormControl: {
      marginNormal: {
        marginTop: pxToRem(10),
      }
    },
    MuiGrid: {
      container: {
          width: pxToRem(350),
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: pxToRem(2)+' solid #356680',
        }
      }
    },
    MuiIconButton: {
      root: {
        color: '#ffffff',
      }
    },
    MuiSvgIcon: {
      root: {
        height: pxToRem(25),
        width: pxToRem(23),
      }
    },
  },
});

const useStyle = makeStyles((theme) => ({
    add: {
        width: pxToRem(99),
        height: pxToRem(45),
        borderColor: '#14AFF1',
        borderWidth: pxToRem(1),
        borderRadius: pxToRem(10),
        color: '#FFFFFF',
        fontSize: pxToRem(20),
        fontFamily: 'Ubuntu',
        textTransform: 'capitalize',
    },
    button3:{
      color:"#14AFF1",
      fontSize: pxToRem(22),
      fontFamily: 'Ubuntu',
      textTransform: 'capitalize',
      marginLeft: pxToRem(35),
    },
    right: {
      width: pxToRem(250),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: pxToRem(20)
    },
    buttonHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    margin: {
      margin: theme.spacing(1),
      color: '#75828C',
      fontSize: pxToRem(22),
      fontFamily: 'Ubuntu',
      fontWeight: '500',
      letterSpacing: pxToRem(0.19),
    },
    r: {
      margin: theme.spacing(1),
      color: '#FFFFFF',
      height: pxToRem(45),
      width: pxToRem(100),
      backgroundColor:'#14AFF1',
      fontSize: pxToRem(20),
      fontFamily: 'Ubuntu',
      textTransform: 'capitalize',
      borderRadius: pxToRem(10),
      boxShadow: 'none',
    },
    l:{
      borderColor: '#14AFF1',
      height: pxToRem(45),
      width: pxToRem(100),
      fontSize: pxToRem(20),
      fontFamily: 'Ubuntu',
      textTransform: 'capitalize',
      margin: theme.spacing(1),
      borderRadius: pxToRem(10),
    },
    header: {
      backgroundColor: "#2A3E4C",
      color: '#ffffff',
      fontSize: pxToRem(28),
      fontFamily: 'Ubuntu',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: pxToRem(30),
    },
    body: {
      backgroundColor: "#2A3E4C",
      color: '#ffffff',
      fontFamily: 'Ubuntu',
      padding: pxToRem(30),
    }
  }
));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddButton() {  
    const [open, setOpen] = React.useState(false);
    const [snackBar,setsnackBar] = React.useState(false);

    const [invoiceInput,setinvoiceInput]=React.useState("");
    const [custNumInput,setcustNumInput]=React.useState("");
    const [amountInput,setamountInput]=React.useState("");
    const [nameInput,setnameInput]=React.useState("");
    const [DateInput, setDate] = React.useState(new Date());
    const [notesInput,setnotesInput]=React.useState("");


    const Send = () => {
      axios.get(`http://localhost:8080/1805362/addData.do?name_customer=${nameInput}&cust_number=${custNumInput}&total_open_amount=${amountInput}
      &invoice_id=${invoiceInput}&due_in_date=${DateInput}&notes=${notesInput}`)
      .then((response)=>{})
      .catch((error) => {
        console.log(error);
      });
    }

    const classes=useStyle();
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const DialogActions = withStyles(theme => ({
      root: {
        backgroundColor:"#2A3E4C",
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
      },
    }))(MuiDialogActions);

    const checkforSnack = () => {
      if ( invoiceInput === '' || custNumInput === '' || amountInput === '' || nameInput === '' || DateInput === '' )
        setsnackBar(true);
      else
      {
        Send();
        window.location.reload();
      }
    }

    const handleSnack = () => {
      setsnackBar(false);
    }

    return (
      <ThemeProvider theme={formLabelsTheme}>
        <div>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<AddIcon style={{width: pxToRem(20),height: pxToRem(20)}}/>} 
            className={classes.add} 
            onClick={handleClickOpen}>
              Add
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth
            TransitionComponent={Transition}>
            <DialogTitle id="form-dialog-title" style={{padding: '0rem'}}>
              <div  className={classes.header}>
                Add Invoice
                <Button aria-label="close" 
                  onClick={handleClose} 
                  endIcon={<CloseIcon style={{width: pxToRem(24.03),height: pxToRem(24.03), color: '#BEC5C9'}}/>} 
                  className={classes.button}>
                </Button>
              </div>
              <hr style={{marginBlockStart: '0rem',marginBlockEnd: '0rem',borderColor: '#283A46',backgroundColor: '#283A46'}}></hr>
              <div className={classes.body} style={{overflow: 'hidden'}}>
                <Grid container spacing={7} style={{backgroundColor: "#2A3E4C"}}>
                  <Grid item xs>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <InputLabel 
                          className={classes.margin} 
                          style={{marginTop: pxToRem(18)}}
                          required
                          key="cust_n">Customer Name</InputLabel>
                      </Grid>
                      <Grid item>
                        <TextField  
                          type="text" 
                          value={nameInput} 
                          onChange={(event) => setnameInput(event.target.value)}  
                          variant="outlined"
                          className={classes.margin}
                          fullWidth
                          key="cust_name"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel className={classes.margin} style={{marginTop: pxToRem(18)}} required >
                          Customer No.
                        </InputLabel>
                      </Grid>
                      <Grid item>
                        <TextField  
                        type="number" 
                        value={custNumInput} 
                        onChange={(event => setcustNumInput(event.target.value))}  
                        variant="outlined"
                        className={classes.margin}  
                        fullWidth
                        key="cust_no"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel className={classes.margin} style={{marginTop: pxToRem(18)}} required>
                          Invoice No.
                        </InputLabel> 
                      </Grid>
                      <Grid item>
                        <TextField 
                        type="number" 
                        value={invoiceInput}
                        onChange={(event) => setinvoiceInput(event.target.value)}  
                        variant="outlined"  
                        className={classes.margin}
                        fullWidth
                        key="inv_no"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel className={classes.margin} style={{marginTop: pxToRem(18)}} required>
                          Invoice Amount
                        </InputLabel>
                      </Grid>
                      <Grid item>
                        <TextField  
                          type="number" 
                          value={amountInput} 
                          onChange={(event) => setamountInput(event.target.value)}
                          variant="outlined"
                          className={classes.margin} 
                          fullWidth
                          key="inv_amt"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <InputLabel className={classes.margin} style={{marginTop: pxToRem(22)}} required>
                          Due Date
                        </InputLabel>
                      </Grid>
                      <Grid item>
                        <DatePicker
                          onChange={(event) => setDate(event.target.value)}
                          value={DateInput}
                          setdate={setDate}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel className={classes.margin} style={{marginTop: pxToRem(22)}}>
                          Notes
                        </InputLabel>
                      </Grid>
                      <Grid item>
                        <TextField 
                          type="text" 
                          value={notesInput} 
                          onChange={(event) => setnotesInput(event.target.value)}  
                          variant="outlined" 
                          id="outlined-multiline-static" 
                          multiline rows={5}
                          className={classes.margin}
                          style={{margin: pxToRem(14)+' 0rem'}}
                          fullWidth
                          key="note"/>
                      </Grid>
                    </Grid> 
                  </Grid>
                </Grid>
              </div>
              <hr style={{marginBlockStart: '0rem',marginBlockEnd: '0rem',borderColor: '#283A46',backgroundColor: '#283A46'}}></hr>
            </DialogTitle>
            <DialogActions className={classes.buttonHeader}>
              <Button onClick={handleClose} className={classes.button3}>
                Cancel
              </Button>
              <div className={classes.right}>
                <Button 
                  onClick={()=> {setnameInput(''); setinvoiceInput(''); setcustNumInput(''); setamountInput(''); setnotesInput(''); handleSnack();}}
                  variant="outlined" 
                  className={classes.l} 
                  style={{color:"#FFFFFF",borderBlockColor:"#14AFF1", borderColor:"#14AFF1"}} 
                  color="primary">
                    Clear
                </Button>             
              <Button variant="contained" className={classes.r} onClick={() => {
                checkforSnack();
              }}>
               Add
              </Button>
              <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal:'left',
                }}
                open={snackBar}
                autoHideDuration={1500}
                onClose={handleSnack}
                message="Mandatory Fields Can't Be Empty "
                action={
                  <React.Fragment>
                    <IconButton size='small' aria-label='close' color='inherit' onClick={handleSnack}>
                      <CloseIcon fontSize='small'/>
                    </IconButton>
                  </React.Fragment>
                }
                    />
              </div>
            </DialogActions>
          </Dialog>
        </div>
        </ThemeProvider>
    ); 
}