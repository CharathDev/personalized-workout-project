"use client";
import generateWorkout from "@/api/workouts";
import { useState } from "react";

interface Exercise {
  exercise: string;
  sets: string;
  reps: string;
}

type WorkoutData = Exercise[][];

export default function Home() {
  const goals = ["Build Muscle", "Lose Fat"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const all_days = [3, 4, 5, 6];
  const times = [45, 60, 90, 120];
  const genders = ["Male", "Female"];
  const all_equipments = ["Dumbbells", "Bodyweight", "Kettle Bell", "Machines"];

  const [goal, setGoal] = useState(goals[0]);
  const [level, setLevel] = useState(levels[0]);
  const [days, setDays] = useState(all_days[0]);
  const [time, setTime] = useState(times[0]);
  const [equipments, setEquipments] = useState<string[]>([]);
  const [gender, setGender] = useState(genders[0]);

  const [generatedWorkout, setGeneratedWorkout] = useState<WorkoutData | null>(
    null
  );

  const inEquipment = (equipment_name: string): Boolean => {
    for (let equipment of equipments) {
      if (equipment == equipment_name) return true;
    }
    return false;
  };

  const changeEquipments = (equipment_name: string) => {
    let index = -1;
    for (let i = 0; i < equipments.length; i++) {
      if (equipments[i] == equipment_name) {
        index = i;
      }
    }

    let temp = [...equipments];
    if (index == -1) {
      temp.push(equipment_name);
    } else {
      temp.splice(index, 1);
    }
    setEquipments(temp);
  };

  const formatWorkoutData = (data: string) => {
    // Split the data into individual days
    const days = data.split("\n\n"); // Assumes a blank line separates days

    return days.map((day) => {
      const lines = day.split("\n"); // Split each day into individual lines
      return lines
        .filter((line, i) => {
          return !line.match(/^Day \d+:?$/) && i != lines.length - 1;
        })
        .map((line) => {
          // Extract the exercise name and details
          const [exercise, details] = line.split(" (Sets:");

          // Use match and handle null safely
          const matches = details ? details.match(/\d+/g) : null;

          if (matches && matches.length >= 2) {
            const [sets, reps] = matches; // Extract sets and reps
            return {
              exercise: exercise.trim(),
              sets,
              reps,
            };
          } else {
            return { exercise: exercise.trim(), sets: "0", reps: "0" }; // Default fallback
          }
        });
    });
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (equipments.length != 0) {
      let data = {
        input: `${goal}, ${level}, ${days}, ${time}, ${equipments.toString()}, ${gender}`,
        days: days,
      };
      let temp = await generateWorkout(data);
      setGeneratedWorkout(formatWorkoutData(temp));
    }
  };

  console.log(generatedWorkout);

  return (
    <div className="bg-neutral-950 flex justify-center items-center">
      <main className="container text-center">
        <h1 className="text-4xl font-bold">Generate Workout</h1>

        <div className="bg-neutral-900 rounded-lg md:p-5 p-2 my-6 flex flex-col justify-center items-center shadow-lg w-full">
          <div className="text-2xl mb-4">Workout Customization</div>

          <form className="w-1/2" onSubmit={onSubmitHandler}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-lg block mb-2 text-gray-300 text-start"
              >
                Goal
              </label>
              <div className={`grid grid-cols-${goals.length} gap-2`}>
                {goals.map((current_goal, i) => (
                  <div
                    className={`${
                      goal == current_goal ? "bg-rose-500" : "bg-neutral-800"
                    }  hover:ring-2 hover:ring-rose-500 text-grey-300 p-5 rounded-md tooltip h-full flex justify-center items-center hover:cursor-pointer`}
                    key={i}
                    onClick={() => setGoal(current_goal)}
                  >
                    {current_goal}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-lg block mb-2 text-gray-300 text-start"
              >
                Level
              </label>
              <div className={`grid grid-cols-${levels.length} gap-2`}>
                {levels.map((current_level, i) => (
                  <div
                    className={`${
                      level == current_level ? "bg-rose-500" : "bg-neutral-800"
                    }  hover:ring-2 hover:ring-rose-500 text-grey-300 p-5 rounded-md tooltip h-full flex justify-center items-center hover:cursor-pointer`}
                    key={i}
                    onClick={() => setLevel(current_level)}
                  >
                    {current_level}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-lg block mb-2 text-gray-300 text-start"
              >
                Days per Week
              </label>
              <div className={`grid grid-cols-${all_days.length} gap-2`}>
                {all_days.map((current_days, i) => (
                  <div
                    className={`${
                      days == current_days ? "bg-rose-500" : "bg-neutral-800"
                    }  hover:ring-2 hover:ring-rose-500 text-grey-300 p-5 rounded-md tooltip h-full flex justify-center items-center hover:cursor-pointer`}
                    key={i}
                    onClick={() => setDays(current_days)}
                  >
                    {current_days}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-lg block mb-2 text-gray-300 text-start"
              >
                Avg Time for Each Workout (Mins)
              </label>
              <div className={`grid grid-cols-${times.length} gap-2`}>
                {times.map((current_time, i) => (
                  <div
                    className={`${
                      time == current_time ? "bg-rose-500" : "bg-neutral-800"
                    }  hover:ring-2 hover:ring-rose-500 text-grey-300 p-5 rounded-md tooltip h-full flex justify-center items-center hover:cursor-pointer`}
                    key={i}
                    onClick={() => setTime(current_time)}
                  >
                    {current_time}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-lg block mb-2 text-gray-300 text-start"
              >
                Equipment Available
              </label>
              <div className={`grid grid-cols-2 gap-2`}>
                {all_equipments.map((current_equipment, i) => (
                  <div
                    className={`${
                      inEquipment(current_equipment)
                        ? "bg-rose-500"
                        : "bg-neutral-800"
                    }  hover:ring-2 hover:ring-rose-500 text-grey-300 p-5 rounded-md tooltip h-full flex justify-center items-center hover:cursor-pointer`}
                    key={i}
                    onClick={() => changeEquipments(current_equipment)}
                  >
                    {current_equipment}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="text-lg block mb-2 text-gray-300 text-start"
              >
                Gender
              </label>
              <div className={`grid grid-cols-${genders.length} gap-2`}>
                {genders.map((current_gender, i) => (
                  <div
                    className={`${
                      gender == current_gender
                        ? "bg-rose-500"
                        : "bg-neutral-800"
                    }  hover:ring-2 hover:ring-rose-500 text-grey-300 p-5 rounded-md tooltip h-full flex justify-center items-center hover:cursor-pointer`}
                    key={i}
                    onClick={() => setGender(current_gender)}
                  >
                    {current_gender}
                  </div>
                ))}
              </div>
            </div>

            <button
              className="bg-rose-500 hover:bg-rose-600 text-neutral-900 rounded-md font-bold p-3 mx-2"
              type="submit"
            >
              Generate Workout
            </button>
          </form>
        </div>

        {generatedWorkout != null ? (
          <div className="bg-neutral-900 rounded-lg md:p-5 p-2 my-6 flex flex-col justify-center items-center shadow-lg w-full">
            <h2 className="text-2xl mb-3">Generated Workout</h2>
            {generatedWorkout.map((day, i) => (
              <>
                <div className="w-full flex justify-start">
                  <h4 className="mx-5 text-lg">Day {i + 1}</h4>
                </div>
                <table className="table-fixed border border-collapse border-neutral-700 w-full rounded-xl bg-neutral-800 m-2">
                  <thead>
                    <tr>
                      <th className="border border-neutral-700 p-2"></th>
                      <th colSpan={2} className="border border-neutral-700 p-2">
                        Exercise
                      </th>
                      <th className="border border-neutral-700 p-2">Sets</th>
                      <th className="border border-neutral-700 p-2">Reps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.map((exercise, j) => (
                      <tr>
                        <td className="border border-neutral-700 p-2">
                          {j + 1}
                        </td>
                        <td
                          colSpan={2}
                          className="border border-neutral-700 p-2"
                        >
                          {exercise.exercise}
                        </td>
                        <td className="border border-neutral-700 p-2">
                          {exercise.sets}
                        </td>
                        <td className="border border-neutral-700 p-2">
                          {exercise.reps}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ))}
          </div>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}
