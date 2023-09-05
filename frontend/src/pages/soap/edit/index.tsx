import React, { useMemo, useState } from "react";
import useEdit from "./useEdit";
import { GoalCard, SimpleCard, SimpleDataGrid } from "../../../components";
import CreateBillingModal from "./CreateBillingModal";
import UpdateBillingModal from "./UpdateBillingModal";

export function Edit() {
  const {
    soap,
    setSoap,
    loading,
    edit,
    onChangeHandler,
    create,
    addBillingCode,
    updateBillingCode,
    setUpdateBillingCodeData,
    updateBillingCodeData,
    deleteBillingCode,
    setGoals,
    onSubmit
  }: any = useEdit();

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
      {
        Header: "Action",
        accessor: (data: any) => {
          return (
            <div className="flex justify-between space-x-1">
              <button
                onClick={() => {
                  onChangeHandler(true, "isUpdatingBillingCode");
                  setUpdateBillingCodeData(data);
                }}
                className="bg-blue-500 text-white rounded-md p-2"
              >
                Update
              </button>
              <button
                onClick={() => deleteBillingCode(data.code)}
                className="bg-red-500 text-white rounded-md p-2"
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const handleCreateBillingCode = (formData: any) => {
    addBillingCode(formData);
  };

  const handleUpdateBillingCode = (formData: any) => {
    updateBillingCode(formData);
  };

  return (
    <>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <form onSubmit={onSubmit} className="bg-gray-50 p-4 space-y-6 rounded">
          <SimpleCard
            header={
              <p
                className={`font-bold text-lg`}
              >{`Therapist: ${soap?.therapist}`}</p>
            }
            content={
              <div className="px-2">
                <div className="flex items-center">
                  <p className="mr-2">Session Date:</p>
                  {edit?.isEditingSessionDate ? (
                    <>
                      <input
                        type="date"
                        value={edit.sessionDate}
                        onChange={(e) =>
                          onChangeHandler(e.target.value, "sessionDate")
                        }
                        className="border border-gray-400 px-2 rounded mr-2"
                      />
                    </>
                  ) : (
                    <>
                      <p>{soap?.sessionDate}</p>
                      <button
                        onClick={() =>
                          onChangeHandler(true, "isEditingSessionDate")
                        }
                        className="ml-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                <p>Is Submitted: {soap?.isSubmitted?.toString()}</p>
                <p>Claim Status: {soap?.claimStatus}</p>
              </div>
            }
          />

          {soap?.billingCodes?.length && (
            <SimpleCard
              header={
                <div className="flex justify-between items-center">
                  <p className={`font-bold text-lg`}>{`Billing Codes: `}</p>
                  <button
                    className="bg-green-500 px-3 py-1 rounded text-white"
                    onClick={() =>
                      onChangeHandler(true, "isCreatingBillingCode")
                    }
                  >
                    Create
                  </button>
                  {edit.isCreatingBillingCode && (
                    <div className="fixed inset-0 flex items-center justify-center z-10">
                      <div className="bg-gray-200 p-4 rounded-md">
                        <CreateBillingModal
                          onCreate={handleCreateBillingCode}
                          onChangeHandler={onChangeHandler}
                        />
                      </div>
                    </div>
                  )}
                </div>
              }
              content={
                <div className="py-4">
                  <SimpleDataGrid data={soap?.billingCodes} columns={columns} />
                  {edit.isUpdatingBillingCode && (
                    <UpdateBillingModal
                      billingCode={updateBillingCodeData} // Pass data to modal
                      onUpdate={handleUpdateBillingCode}
                      onChangeHandler={onChangeHandler}
                    />
                  )}
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
                        <div className="flex">
                          <p className="mr-2">Saved:</p>
                          {edit?.isEditingobjectiveNotes ? (
                            <>
                              <textarea
                                value={edit.objectiveNotes}
                                onChange={(e) =>
                                  onChangeHandler(
                                    e.target.value,
                                    "objectiveNotes"
                                  )
                                }
                                className="border border-gray-400 px-2 rounded"
                              />
                            </>
                          ) : (
                            <>
                              <p>{soap?.objectiveNotes?.saved}</p>
                              <button
                                onClick={() =>
                                  onChangeHandler(
                                    true,
                                    "isEditingobjectiveNotes"
                                  )
                                }
                                className="ml-2"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>

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
                        <div className="rounded-lg  shadow-lg bg-white">
                          <div className="container mx-auto p-4 space-y-4">
                            {soap?.soap?.goals?.map(
                              (goal: any, index: number) => (
                                <GoalCard
                                  readMode={false}
                                  key={index}
                                  goal={goal}
                                  setGoal={(updatedGoal: any) => {
                                    let goals = soap?.soap?.goals;
                                    const updatedGoals = [...goals];
                                    updatedGoals[index] = updatedGoal;
                                    setGoals(updatedGoals);
                                  }}
                                />
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

          <div className="w-full flex justify-end space-x-4">
           
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
}
