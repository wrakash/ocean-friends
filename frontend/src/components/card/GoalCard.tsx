// GoalCard.jsx

import React from "react";

export const GoalCard = ({ goal, setGoal, ...rest }: any) => {
  const handleAssessmentChange = (index: any, newValue: any) => {
    const updatedGoalData = { ...goal };
    updatedGoalData.longTermGoals[index].assessment.ai = newValue;
    setGoal(updatedGoalData);
  };

  const handleHomeworkChange = (index: any, newValue: any) => {
    const updatedGoalData = { ...goal };
    updatedGoalData.longTermGoals[index].homework.ai = newValue;
    setGoal(updatedGoalData);
  };

  const handleObjectiveChange = (
    ltIndex: any,
    stIndex: any,
    objIndex: any,
    newValue: any
  ) => {
    const updatedGoalData = { ...goal };
    updatedGoalData.longTermGoals[ltIndex].shortTermGoals[stIndex].trackers[
      objIndex
    ].objectiveFF[0].accuracyP = newValue;
    setGoal(updatedGoalData);
  };

  return (
    <div className="bg-opacity-40 backdrop-blur-lg bg-white p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-xl font-semibold mb-2">{goal.longTermGoalType}</h2>
      <div className="border-t border-gray-400 pt-2">
        {goal.longTermGoals.map((longTermGoal: any, ltIndex: number) => (
          <div
            key={ltIndex}
            className="mb-4 bg-slate-50 border border-1 p-2 rounded-md space-y-4"
          >
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Assessment's ai</h3>
              <textarea
                disabled={rest?.readMode}
                className="w-full h-48 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={longTermGoal.assessment.ai}
                onChange={(e) =>
                  handleAssessmentChange(ltIndex, e.target.value)
                }
              />
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Homework's ai</h3>
              <textarea
               disabled={rest?.readMode}
                className="w-full h-48 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={longTermGoal.homework.ai}
                onChange={(e) => handleHomeworkChange(ltIndex, e.target.value)}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">Short Term Goals</h3>
            {longTermGoal.shortTermGoals.map(
              (shortTermGoal: any, stIndex: number) => (
                <div key={stIndex} className="mb-2 space-y-4">
                  <p className="mb-1">{shortTermGoal.shortTermGoal}</p>

                  <div>
                    <p className="underline">Tracker:</p>
                    <ul className="list-disc ml-4">
                      {shortTermGoal.trackers.map(
                        (tracker: any, objIndex: number) => (
                          <li key={objIndex}>
                            {tracker.objectiveFF.map((objective: any) => (
                              <div className="flex items-center space-x-2">
                                <p>accuracyP</p>
                                <input
                                 disabled={rest?.readMode}
                                  key={objective.timestamp}
                                  type="text"
                                  className="w-40 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                  value={objective.accuracyP}
                                  onChange={(e) =>
                                    handleObjectiveChange(
                                      ltIndex,
                                      stIndex,
                                      objIndex,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )
            )}

            <h3 className="text-lg font-medium mb-2">Plan</h3>
            <div>
              {longTermGoal.plan.ai
                .split("\n")
                .map((point: any, index: number) => (
                  <p key={index}>{point.trim()}</p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


