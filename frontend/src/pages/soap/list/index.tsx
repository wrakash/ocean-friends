import React, { useMemo } from "react";
import useList from "./useList";
import { SimpleDataGrid, Header } from "../../../components";
import { Link } from "react-router-dom";

export function List() {
  const { soaps = [], loading } = useList();

  const columns = useMemo(
    () => [
      {
        Header: "Therapist",
        accessor: "therapist",
      },

      {
        Header: "sessionDate",
        accessor: "sessionDate",
      },

      {
        Header: "claimStatus",
        accessor: "claimStatus",
      },
      {
        Header: "isSubmitted",
        accessor: (data: any) => {
          return <p>{data.isSubmitted.toString()}</p>;
        },
      },

      {
        Header: "Action",
        accessor: ({ id }: { id: string }) => {
          return (
            <div className="flex justify-between space-x-1">
              <Link
                to={{
                  pathname: `/view/${id}`,
                }}
                className="bg-blue-500 text-white rounded-md p-2"
              >
                View
              </Link>
              <Link
                className="bg-red-500 text-white rounded-md p-2"
                to={{
                  pathname: `/edit/${id}`,
                }}
              >
                Edit
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  if (loading) {
    return <>Loading ...</>;
  }

  return (
   
      <SimpleDataGrid data={soaps} columns={columns} />
    
  );
}
