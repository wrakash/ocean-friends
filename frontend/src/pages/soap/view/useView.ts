import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useView = () => {
  const { id } = useParams();
  const [soap, setSoap] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchSoap = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
          method: "GET",
          redirect: "follow",
          signal: signal,
        });
        const response = await res.json();
        setSoap(response);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSoap();

    //clean up function
    return () => {
      abortController.abort();
    };
  }, [id]);

  return { soap, loading };
};

export default useView;
