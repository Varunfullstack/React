import { useEffect, useState } from "react";
// custom hook to get the scroll positon.
// just a wrapper on browser API & to make sure that
// developer removes event listener
const useScroll = () => {
  const [scrollX, setScrollX] = useState();
  const [scrollY, setScrollY] = useState();

  const scrollListner = () => {
    setScrollX(window.pageXOffset);
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListner);

    return () => {
      window.removeEventListener("scroll", scrollListner);
    };
  }, []);

  return [scrollX, scrollY];
};

export default useScroll;
