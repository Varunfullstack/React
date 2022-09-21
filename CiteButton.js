import {
  Button,
  IconButton,
  Typography,
  Paper,
  Divider,
  Select,
  Modal,
  makeStyles,
  MenuItem
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import copy from "copy-to-clipboard";

// Styles used for the component
const useStyles = makeStyles((theme) => ({
  format: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "30px",
  },
  body: {
    padding: "0px 30px",
  },
  paddingHorizontal0: {
    paddingLeft: "0px !important",
    paddingRight: "0px !important",
  },
  selectContainer: {
    margin: "20px 0",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    [theme.breakpoints.down("sm")]: {
      "& button": {
        width: "100% !important",
      },
    },
  },
  selectPaper: {
    height: "50px",

    background: "#FFFFFF",
    border: "1px solid #717173",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      width: "120px",
    },
  },
  select: {
    background: "#FFFFFF",
    width: "100% !important",
    fontWeight: '500 !important',
    fontSize: '16px !important',
    lineHeight: '26px !important',
    color: '#121212 !important',
    '& .MuiSelect-select': {
      fontWeight: '500 !important',
      fontSize: '16px !important',
      lineHeight: '26px !important',
      paddingLeft: '18px',
    },
    '& svg': {
      color: '#121212 !important',
      marginRight: '10px'
    }
  },
  menuItem: {
    fontWeight: '500 !important',
    fontSize: '16px !important',
    lineHeight: '26px !important',
  },
  selected: {
    backgroundColor: 'transparent !important'
  },
  copied: {
    background: "#E5EFF1 !important",
    color: "#005D78 !important",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "200px",
    },
  },
  clipboardArea: {
    padding: "10px",
    border: "0.5px solid #717173",
    overflowWrap: 'anywhere', 
    [theme.breakpoints.up("sm")]: {
      padding: "20px",
    },
    '& *': {
      display: 'inline !important',
    }
  },
  selectPaperContainer: {
    marginRight: "20px !important",
    [theme.breakpoints.down("xs")]: {
      marginRight: "0px !important",
      marginBottom: "20px !important",
    },
  },
  clipboardAreaText: {
    fontSize: "16px !important",
    lineHeight: "26px !important",
  },
}));

// On click of cite button a popup will open with a dropdown.
// On change of dropdown the respective text will be shown in a box.
// Cite Popup will have dropdown, Copy to clipboard button, Clipboard area, and 3 download button for 3 formats
const CiteButton = ({
  articleId,
  apaString,
  mlaString,
  harvardString,
  chicagoString,
  vancouverString,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  // To download the cite of given type
  const downloadCite = (type) => {
    window.open(
      `${process.env.REACT_APP_SERVER_HOST_NAME}/cite/downloadCitation?id=${articleId}&citationType=${type}`,
      "_self"
    );
  };

  const selectMap = {
    MLA: mlaString,
    APA: apaString,
    Harvard: harvardString,
    Chicago: chicagoString,
    Vancouver: vancouverString,
  };
  // Popup visibility state
  const [open, setOpen] = useState(false);

  // Dropdown selected value state
  const [selectedFormat, setSelectedFormat] = useState("MLA");

  // Is the current text copied to the clipboard
  const [copiedToClipboard, setCopiedToClipBoard] = useState(false);

  // To copy to clipboard
  const copyToClipboard = () => {
    const area = document.getElementById("clipboardArea");
    copy(area.innerText);
    setCopiedToClipBoard(true);
  };

  // Dropdown change handle method
  const onSelectChange = (e) => {
    setSelectedFormat(e.target.value);
    setCopiedToClipBoard(false);
  };

  // On Button click show popup
  const handleOpen = () => {
    setOpen(true);
  };

  // On popup close events
  const handleClose = () => {
    setOpen(false);
    setCopiedToClipBoard(false);
  };

  // This popup will be shown on click of the button
  const citModal = (
    <Modal
      open={open}
      className="cite-container"
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="cite-modal">
        <div className="modal-header">
          <Typography
            align="center"
            variant="h2"
            className="gm"
            color="inherit"
          >
            Cite
          </Typography>
        </div>
        <div className="modal-close-btn">
          <IconButton onClick={handleClose}>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L22.2132 22.2132" stroke="white" stroke-width="2" />
              <path
                d="M22 1L0.786795 22.2132"
                stroke="white"
                stroke-width="2"
              />
            </svg>
          </IconButton>
        </div>
        <div className={`modal-body ${classes.paddingHorizontal0}`}>
          <div className={classes.body}>
            <Typography
              variant="body1"
              className={`gm format ${classes.format}`}
            >
              Style
            </Typography>
            <div className={classes.selectContainer}>
              <div className={classes.selectPaperContainer}>
                <Paper
                  square
                  className={`modal-paper ${classes.selectPaper}`}
                  elevation={0}
                >
                  {/* On desktop it will shwo material dropdown and on mobile it will show Android/iOS native dropdown */}
                  <Select
                    native={!isDesktop}
                    name="cite"
                    id="cite"
                    onChange={onSelectChange}
                    className={classes.select + " gm"}
                    value={selectedFormat}
                    autoFocus={false}
                  >
                    {Object.keys(selectMap).map((key) =>
                      isDesktop ? (
                        <MenuItem
                          selected
                          classes={{ selected: classes.selected }}
                          value={key}
                          className={classes.menuItem + " gm"}
                        >
                          {key}
                        </MenuItem>
                      ) : (
                        <option value={key}>{key}</option>
                      )
                    )}
                  </Select>
                </Paper>
              </div>
              <div className="downloadbtn">
                {/* Copy to clipboard button */}
                <Button
                  variant={copiedToClipboard ? "outlined" : "contained"}
                  color="primary"
                  onClick={copyToClipboard}
                  className={copiedToClipboard ? classes.copied : ""}
                  disableElevation
                >
                  {copiedToClipboard ? "Copied" : "Copy To Clipboard"}
                </Button>
              </div>
            </div>
            <div className={classes.clipboardArea} id="clipboardArea">
              {/* Clipboard area. */}
              <Typography
                variant="body1"
                className={classes.clipboardAreaText}
                dangerouslySetInnerHTML={{ __html: selectMap[selectedFormat] }}
              ></Typography>
            </div>
          </div>
          <Divider className="modal-divider" />
          <div className={classes.body}>
            <Typography
              variant="body1"
              className={`gm format ${classes.format}`}
            >
              Format
            </Typography>
            {/* 3 format download buttons */}
            <div className="formatbtns">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  {/* RIS Format */}
                  <Button
                    onClick={() => downloadCite("RIS")}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disableElevation
                  >
                    .RIS
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  {/* BIB Format */}
                  <Button
                    onClick={() => downloadCite("BIB")}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disableElevation
                  >
                    .BIB
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  {/* ENW Format */}
                  <Button
                    onClick={() => downloadCite("ENW")}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disableElevation
                  >
                    .ENW
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );

  const citeIcon = (
    <svg
      width="13"
      height="11"
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.1712 11C4.46766 9.3626 6.09606 6.71756 6.09606 3.82061C6.09606 1.3855 4.55117 0 2.83926 0C1.29437 0 0 1.30153 0 2.89695C0 4.45038 1.0856 5.54199 2.50523 5.54199C2.75575 5.54199 3.08978 5.45801 3.21504 5.41603C2.92277 6.84351 1.54489 8.56489 0.208769 9.3626L2.1712 11Z"
        fill="#005D78"
      />
      <path
        d="M8.94024 11C11.2367 9.3626 12.8651 6.71756 12.8651 3.82061C12.8651 1.3855 11.3202 0 9.6083 0C8.06341 0 6.76904 1.30153 6.76904 2.89695C6.76904 4.45038 7.85464 5.54199 9.27427 5.54199C9.52479 5.54199 9.85882 5.45801 9.98409 5.41603C9.69181 6.84351 8.31393 8.56489 6.97781 9.3626L8.94024 11Z"
        fill="#005D78"
      />
    </svg>
  );
  // Main button that will be first shown
  return (
    <Fragment>
      {isDesktop ? (
        // For Desktop
        <Button
          onClick={handleOpen}
          square
          variant="outlined"
          className="newButton"
          startIcon={citeIcon}
        >
          Cite
        </Button>
      ) : (
        // For Mobile
        <Button
          className="iconButton"
          disableFocusRipple
          onClick={handleOpen}
          variant="outlined"
          color="primary"
        >
          {citeIcon}
        </Button>
      )}
      {citModal}
    </Fragment>
  );
};

export default CiteButton;
CiteButton.propTypes = {
  articleId: PropTypes.string,
  apaString: PropTypes.string.isRequired,
  mlaString: PropTypes.string.isRequired,
  harvardString: PropTypes.string.isRequired,
  chicagoString: PropTypes.string.isRequired,
  vancouverString: PropTypes.string.isRequired,
};
