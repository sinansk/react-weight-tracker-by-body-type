import { useUser } from "../context/UserContext";

const ResultComponent = () => {
  const { idealWeight, userWeight } = useUser();

  return (
    <>
      {idealWeight && (
        <div className="mx-auto sm:w-1/2 sm:h-24">
          <div className="text-2xl text-teal-700 flex flex-col items-center justify-center border-2 border-fuchsia-500 rounded-md mx-4 bg-indigo-200 bg-opacity-25 sm:h-full">
            <>
              <h2>
                YOUR IDEAL WEIGHT RANGE IS: {idealWeight[0]} - {idealWeight[3]}{" "}
                KG.
              </h2>
              {userWeight < idealWeight[0] && (
                <h2>YOU NEED TO GAIN {idealWeight[0] - userWeight} KG.</h2>
              )}
              {userWeight > idealWeight[3] && (
                <h2>YOU NEED TO LOSS {userWeight - idealWeight[3]} KG.</h2>
              )}
              {idealWeight[0] <= userWeight && userWeight <= idealWeight[3] && (
                <h2>YOUR WEIGHT IS IDEAL.</h2>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultComponent;
