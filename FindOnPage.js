import { InputBase, Paper, ButtonGroup, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useFindOnPage from "../utils/hooks/useFindOnPage";
// Styles used for the component
const useStyles = makeStyles(() => ({
  findpaper: {
    width: "100%",
    padding: "2px 3px 2px 15px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    background: "#ffffff",
    justifyContent: "space-around",
    border: "0.5px solid #A4A4A4",
    "& .MuiInputBase-root": {
      flex: "1 !important",
    },
    "& button[hidden]": {
      display: 'none !important'
    },
    "& .MuiInputBase-input::placeholder": {
      fontSize: "16px !important"
    }
  },
  icons: {
    borderRadius: "0",
  },
  icon: {
    width: "39px",
    height: "39px",
    backgroundColor: "#005d781a !important",
    marginLeft: "3px!important",
  },
  stickyMobileFindOnPage: {
    height: "55px !important",
    position: "fixed",
    left: "0%",
    top: "73px",
    zIndex: "100",
    background: "#E5DC07",
    border: "0",
    "& button": {
      background: "transparent !important",
    },
    "& svg": {
      color: "#121212 !important",
    },
    "& .MuiButtonGroup-root": {
      border: '0 !important'
    }
  },
}));

const FindOnPage = ({
  highlightClass,
  searchWithinClassName,
  showStickyOnMobile = false,
}) => {
  const classes = useStyles();

  const { t } = useTranslation();
  // on mobile show sticky find on page on the top when input box has some value
  const [showStickyMobileFindOnPage, setShowStickyMobileFindOnPage] = useState(
    false
  );
  // Custom hook to handle the find on page logic
  const [
    findString,
    goToNext,
    gotToPrevious,
    currIndex,
    resultCount,
  ] = useFindOnPage(highlightClass, searchWithinClassName);
  // on press Enter go to next search result
  const onKeyPressSearch = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      goToNext();
    }
  };
  // on change of input search
  const handleFind = (e) => {
    findString(e.target.value);
    if (showStickyOnMobile) {
      setShowStickyMobileFindOnPage(e.target.value && e.target.value.length);
    }
  };

  return (
    <Paper
      square
      elevation={0}
      className={
        classes.findpaper +
        (showStickyMobileFindOnPage ? " " + classes.stickyMobileFindOnPage : "")
      }
    >
      <InputBase
        id="find"
        name="find"
        className={classes.input}
        onChange={handleFind}
        placeholder={t("Find on page")}
        inputProps={{ "aria-label": "search term" }}
        onKeyPress={onKeyPressSearch}
      />
      <span className="number">
        {resultCount === 0 ? 0 : currIndex + 1}/{resultCount}
      </span>

      <ButtonGroup className={classes.icons}>
        
        {/* Prev Button */}

        <IconButton
          className={classes.icon}
          onClick={(_) => {
            gotToPrevious();
          }}
        >
          <svg
            width="13"
            height="7"
            viewBox="0 0 13 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 6L6.5 1L11.5 6"
              stroke="#3C3C3C"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>

        {/* Next Button */}

        <IconButton
          className={classes.icon}
          onClick={(_) => {
            goToNext();
          }}
        >
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 1L6 6L1 0.999999"
              stroke="#3C3C3C"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>
        
        {/* Close button show only in mobile view when it is sticky. Used to close the sticky find on page*/}

        <IconButton
          hidden={!showStickyMobileFindOnPage}
          className={classes.icon}
          onClick={(_) => {
            setShowStickyMobileFindOnPage(false);
          }}
        >
          <svg
            width="22"
            height="25"
            viewBox="0 0 22 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.48047 6.82422L16.4409 18.4805"
              stroke="#121212"
              stroke-width="1.5"
            />
            <path
              d="M16.4404 6.82422L5.48002 18.4805"
              stroke="#121212"
              stroke-width="1.5"
            />
          </svg>
        </IconButton>
      </ButtonGroup>
    </Paper>
  );
};

export default FindOnPage;

FindOnPage.propTypes = {
  highlightClass: PropTypes.string,
  searchWithinClassName: PropTypes.string,
  showStickyOnMobile: PropTypes.bool,
};
