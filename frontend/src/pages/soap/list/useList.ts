import React, { useEffect, useState } from "react";

const useList = () => {
  const [soaps, setSoaps] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchSoap = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}`, {
          method: "GET",
          redirect: "follow",
          signal: signal,
        });
        const response = await res.json();
        setSoaps(response);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSoap();

    //clean up function
    return () => {
      abortController.abort();
    };
  }, []);

  return { soaps, loading };
};

export default useList;
