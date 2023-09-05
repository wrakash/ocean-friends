import React, { useMemo } from "react";
import useView from "./useView";
import { GoalCard, SimpleCard, SimpleDataGrid } from "../../../components";

export function View() {
  const { soap, loading }: { soap: any; loading: boolean } = useView();
  const columns = useMemo(
    () => [
      {
        Header: "Code",
        accessor: "code",
      },
      {
        Header: "Description",
        accessor: "desc",
      },

      {
        Header: "qty",
        accessor: "qty",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Type",
        accessor: "type",
      },
    ],
    []
  );
  return (
    <>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className="bg-gray-50 p-4 space-y-6 rounded">
          <SimpleCard
           header={
              <p
                className={`font-bold text-lg`}
              >{`Therapist: ${soap?.therapist}`}</p>
            }
            content={
              <div className="px-2">
                <p>Session Date: {soap?.sessionDate}</p>
                <p>Is Submitted: {soap?.isSubmitted?.toString()}</p>
                <p>Claim Status: {soap?.claimStatus}</p>
              </div>
            }
          />

          {soap?.billingCodes?.length && (
            <SimpleCard
              header={
                <p className={`font-bold text-lg`}>{`Billing Codes: `}</p>
              }
              content={
                <div className="py-4">
                  <SimpleDataGrid data={soap?.billingCodes} columns={columns} />
                </div>
              }
            />
          )}

          <SimpleCard
            title={`Soap: `}
            content={
              <div className="space-y-4 p-1">
                <div className="flex flex:col lg:flex-row justify-between space-x-4">
                  <SimpleCard
                    header={
                      <p className={`font-normal text-lg`}>
                        {"Objective Notes: "}
                      </p>
                    }
                    content={
                      <div className="rounded-lg p-4 shadow-lg bg-white">
                        <p>Saved: {soap?.soap?.objectiveNotes?.saved}</p>
                        <p>
                          Is Disabled:{" "}
                          {soap?.soap?.objectiveNotes?.isDisabled?.toString()}
                        </p>
                        <p>
                          Is Flow Forwarded:{" "}
                          {soap?.soap?.objectiveNotes?.isFlowForwarded?.toString()}
                        </p>
                      </div>
                    }
                  />

                  <SimpleCard
                    header={
                      <p className={`font-normal text-lg`}>{"Subjective: "}</p>
                    }
                    content={
                      <div className=" rounded-lg p-4 shadow-lg bg-white">
                        <p>
                          Ai Expanded:{" "}
                          {soap?.soap?.subjective?.aiExpanded.toString()}
                        </p>
                        <p>
                          Is Original:{" "}
                          {soap?.soap?.subjective?.isOriginal.toString()}
                        </p>
                        <p>
                          Is Disabled:{" "}
                          {soap?.soap?.subjective?.isDisabled.toString()}
                        </p>
                      </div>
                    }
                  />
                </div>
                <div>
                  {soap?.soap?.goals?.length > 0 && (
                    <SimpleCard
                      header={
                        <p className={`font-normal text-lg`}>{"Goals: "}</p>
                      }
                      content={
                        <div className="rounded-lg p-4 shadow-lg bg-white">
                          <div className="container mx-auto p-4">
                            <h1 className="text-2xl font-semibold mb-4">
                              Patient Goals
                            </h1>
                            {soap?.soap?.goals?.map(
                              (goal: any, index: number) => (
                                <GoalCard key={index} goal={goal} readMode={true}/>
                              )
                            )}
                          </div>
                        </div>
                      }
                    />
                  )}
                </div>
              </div>
            }
          />
        </div>
      )}
    </>
  );
}
