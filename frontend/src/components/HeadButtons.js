import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";
import DeleteModalButton from "./DeleteButtonModal";
import "./HeadButton.css";
import AddButton from "./AddButton";
import EditButton from "./EditButton";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    size: "large"
  },
  input: {
    display: "none"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  search: {
    position: "relative",
    display: "inline-block",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "250px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1)
      //width: 'auto',
    }
  },
  searchIcon: {
    padding: theme.spacing(0.75, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "inline",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
});

function HeadButtons(props) {
  const [showModal, setShowModal] = useState(false);

  const { classes } = props;
  let input;
  const ola = async input => {
    console.log(input);
  };
  return (
    <div className="headerWrapper">
      <div id="div1">
        <Button variant="contained" color="primary" className={classes.button}>
          Predict
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          disabled
        >
          View Correspondence
        </Button>
      </div>
      <div id="div2">
        <AddButton></AddButton>
        <EditButton></EditButton>
        <DeleteModalButton
          showModal={showModal}
          setShowModal={setShowModal}
          className="ModalButtons"
        ></DeleteModalButton>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon input={input} onChange={ola(input)} />
          </div>
          <InputBase
            placeholder="Search by Invoice Number"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </div>
    </div>
  );
}

HeadButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HeadButtons);
