import { useEffect } from "react";

export const useFetch = (url, dispatch, action) => {
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch({ type: action, payload: data }));
  }, [url, dispatch, action]);
};

export const useFetchTimeout = (url, parameter, dispatch, action, timeout) => {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (parameter !== "") {
        fetch(url)
          .then((response) => response.json())
          .then((data) => dispatch({ type: action, payload: data }));
      } else {
        dispatch({ type: action, payload: [] });
      }
    }, timeout);

    return () => clearTimeout(timeOutId);
  }, [url, parameter, dispatch, action, timeout]);
};
