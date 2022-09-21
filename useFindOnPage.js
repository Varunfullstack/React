import Mark from "mark.js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// Mark.js library is used for find on page functionality
// this hook is wrapper on top of that to modify 
// the behaviour and share between multiple pages
const useFindOnPage = ( highlightClass, searchWithinClassName ) => {
  const currentClass = highlightClass ?? "current";

  const markInstance = new Mark(document.querySelector(searchWithinClassName ?? ".resultdata"));

  const [searchResults, setSearchResults] = useState([]);

  const [currActiveIndex, setCurrActiveIndex] = useState(0);

  useEffect(() => {
    jumpTo(0);
  }, [searchResults]);

  // this method handle the search and marking the search results
  // This method unmarks the old search results and mark the new one.
  const findString = (searchVal, isPermanent) => {
    isPermanent = isPermanent || false;
    markInstance.unmark({
      element: isPermanent ? 'permanentmark' : 'mark',
      done: function () {
        markInstance.mark(searchVal, {
          separateWordSearch: false,
          acrossElements: true,
          wildcards: "enabled",
          exclude: ['.searchIgnore', '.searchIgnore *', 'english-heading', 'german-heading'],
          className: isPermanent ? 'permanentHighlight' : '',
          element: isPermanent ? 'permanentmark' : 'mark',
          done: function () {
            setSearchResults(document.querySelectorAll("mark"));
          },
        });
      },
    });
  };

  // call this to jump to the specified search result
  const jumpTo = (newCurrentIndex) => {
    if (searchResults?.length) {
      var current = searchResults[newCurrentIndex];
      searchResults[currActiveIndex].classList.remove(currentClass);
      setCurrActiveIndex(newCurrentIndex);
      if (current) {
        current.classList.add(currentClass);
        current.scrollIntoView();
      }
    }
  };

  // Call this to jump to the next search result
  const goToNext = () => {
    if (searchResults?.length) {
      const totalSearches = searchResults.length;

      const nextIndex = (currActiveIndex + 1) % totalSearches;
      jumpTo(nextIndex);
    }
  };

  // Call this to jump to the previous search result
  const goToPrevious = () => {
    if (searchResults?.length) {
      const totalSearches = searchResults.length;

      const prevIndex = (currActiveIndex - 1 + totalSearches) % totalSearches;
      jumpTo(prevIndex);
    }
  };

  return [
    findString,
    goToNext,
    goToPrevious,
    currActiveIndex,
    searchResults.length,
  ];
};

export default useFindOnPage;

useFindOnPage.propTypes = {
  highlightClass: PropTypes.string,
  searchWithinClassName: PropTypes.string,
};
