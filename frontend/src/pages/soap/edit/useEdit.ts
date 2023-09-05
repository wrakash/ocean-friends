import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const useEdit = () => {
  const { id } = useParams();
  const [soap, setSoap] = useState<any>();
  const [loading, setLoading] = useState(true);
  const naviate = useNavigate()
  const [edit, setEdit] = useState({
    isEditingSessionDate: false,
    sessionDate: new Date(),
    objectiveNotes: "",
    isEditingobjectiveNotes: false,
    isCreatingBillingCode: false,
    isUpdatingBillingCode: false,
  });

  const [updateBillingCodeData, setUpdateBillingCodeData] = useState(null);

  const [goals, setGoals] = useState(null);

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

  useEffect(() => {
    if (soap && soap.sessionDate) {
      setEdit({ ...edit, sessionDate: new Date(soap.sessionDate) });
      setGoals(soap.soap.goals)
    }
  }, [soap]);

  const onChangeHandler = (value: string | boolean, name: string) => {
    setEdit({ ...edit, [name]: value });
  };

  const addBillingCode = (billingCodeData: any) => {
    const newBillingCode = {
      id: soap.billingCodes.length + 1,
      ...billingCodeData,
    };

    const updatedBillingCodes = [...soap.billingCodes, newBillingCode];

    setSoap({ ...soap, billingCodes: updatedBillingCodes });

    setEdit({ ...edit, isCreatingBillingCode: false });
  };

  const updateBillingCode = (billingCode: any) => {
    const index = soap.billingCodes.findIndex(
      (bc: any) => bc.id === billingCode.id
    );

    if (index !== -1) {
      const updatedBillingCodes = [...soap.billingCodes];
      updatedBillingCodes[index] = billingCode;

      setSoap({ ...soap, billingCodes: updatedBillingCodes });
      setEdit({ ...edit, isUpdatingBillingCode: false });
    }
  };

  const deleteBillingCode = (code: string) => {
    const updatedBillingCodes = soap?.billingCodes?.filter(
      (billingCode: any) => billingCode.code !== code
    );

    setSoap({ ...soap, billingCodes: updatedBillingCodes });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      ...soap,
      soap: {
        ...soap.soap,
        goals: goals,
        objectiveNotes: {
          ...soap.soap.objectiveNotes,
          saved: edit.objectiveNotes,
        },
      },
      sessionDate: edit?.sessionDate,
    };

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/${id}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(payload),
          redirect: "follow",
        }
      );

      const response = await res.json();
    } catch (error) {
      console.error(error);
    }finally{
      naviate(-1)
    }
  };

  return {
    soap,
    loading,
    edit,
    onChangeHandler,
    setSoap,
    addBillingCode,
    updateBillingCode,
    setUpdateBillingCodeData,
    updateBillingCodeData,
    deleteBillingCode,
    goals,
    setGoals,
    onSubmit,
  };
};

export default useEdit;
