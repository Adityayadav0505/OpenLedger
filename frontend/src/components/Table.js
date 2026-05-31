import React from "react";
import axios from "axios";
import {
  CircularProgress,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { pxToRem } from "../utils/theme";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Toolbar from "@material-ui/core/Toolbar";
import ButtonSearchHolder from "./ButtonSearchHolder";

const Mytheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: "0px",
        padding: "0rem 0.7111rem",
        height: pxToRem(58)
      },
      body: {
        color: "rgb(241 231 231 / 87%)",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "30px"
      },
      head: {
        color: "#97A1A9"
      },
      stickyHeader: {
        color: "#97A1A9",
        backgroundColor: "#2A3E4C"
      }
    },
    MuiTableHead: {
      root: {
        borderBottom: "3px solid #283A46"
      }
    },
    MuiTableRow: {
      root: {
        "&:nth-of-type(even)": {
          backgroundColor: "#283A46"
        }
      }
    },
    MuiCheckbox: {
      colorSecondary: {
        MuiChecked: {
          color: "#14AFF1"
        }
      }
    }
  }
});

const useStyles = makeStyles({
  container: {
    marginTop: pxToRem(19),
    height: pxToRem(639),
    width: "1850px",
    borderBottom: "0px",
    borderTop: "0px",
    marginLeft: '33px',
  },
  notDue: {
    color: "#FFFFFF"
  },
  Due: {
    color: "#FF5B5B"
  },
  load: {
    height: "80%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    marginTop: pxToRem(60),
    marginBottom: pxToRem(100)
  }
});

export default function MyTable(/*{setselect}*/) {
  const [Data, setData] = React.useState([]);
  const [isAvailable, Switch] = React.useState(true);
  const [pgCount, setCount] = React.useState(1);
  const [checkboxes, setcheckboxes] = React.useState([]);
  let [selected, setselected] = React.useState(new Set());
  const IncreaseCount = () => {
    setCount(pgCount + 1);
  };
  React.useEffect(() => {
    axios
      .get(
        `http://localhost:8080/1805362/fetchdata.do?limit=10&count=${pgCount}`
      )
      .then(response => {
        const isDataAvailable = response.data && response.data.length;
        isDataAvailable ? Switch(isAvailable) : Switch(!isAvailable);
        setData(prev => [
          ...prev,
          ...response.data.map(d => {
            return {
              select: false,
              doc_id: d.doc_id,
              name_customer: d.name_customer,
              cust_number: d.cust_number,
              due_in_date: d.due_in_date,
              notes: d.notes,
              total_open_amount: d.total_open_amount
            };
          })
        ]);
      })
      .catch(error => {
        console.log(error);
      });
  }, [pgCount]);

  const checkboxfunction = () => {
    console.log("hello");
  };

  const classes = useStyles();
  function comp(x) {
    var d1 = new Date("January 15, 2019 03:24:00");
    var d2 = new Date(x);
    return d1 < d2 ? true : false;
  }

  let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
      <Toolbar>
        <div style={{width: '100%'}}>
            <ButtonSearchHolder />
        </div>
      </Toolbar>
    );
  };

  const toolbarStyles = withStyles(theme => ({
    root: {
      paddingRight: theme.spacing.unit
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    spacer: {
      flex: "1 1 100%"
    },
    actions: {
      color: theme.palette.text.secondary
    },
    title: {
      width: "100%"
    }
  }))(EnhancedTableToolbar);
  return (
    <div>
      <ThemeProvider theme={Mytheme}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          rowCount={Data.length}
        />
        <TableContainer id="myTableData" className={classes.container}>
          <Table stickyHeader aria-labelledby="tableTitle">
            <TableHead>
              <TableRow hover role="checkbox" tabIndex={-1} key={Data.doc_id}>
                <TableCell>Customer Name</TableCell>
                <TableCell>Customer #</TableCell>
                <TableCell>Invoice #</TableCell>
                <TableCell>Invoice Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Delay</TableCell>
                <TableCell>Predicted Aging Bucket</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Data.map((data, myIndex) => (
                <TableRow key={data.doc_id}>
                  <TableCell>{data.name_customer}</TableCell>
                  <TableCell>{data.cust_number}</TableCell>
                  <TableCell>{data.doc_id}</TableCell>
                  <TableCell>{data.total_open_amount}</TableCell>
                  <TableCell>
                    <span
                      className={
                        comp(data.due_in_date) ? classes.notDue : classes.Due
                      }
                    >
                      {data.due_in_date}
                    </span>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>{data.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <InfiniteScroll
            scrollableTarget="myTableData"
            dataLength={Data.length}
            next={IncreaseCount}
            hasMore={isAvailable}
            loader={
              <center>
              <div className={classes.load}>
                <CircularProgress
                  style={{ alignSelf: "center", marginBottom: "0.5rem" }}
                />{" "}
                Loading ...
              </div>
              </center>
            }
          ></InfiniteScroll>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
}