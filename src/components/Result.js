import { useUser } from "../context/UserContext";

const Result = () => {
  const { idealWeight } = useUser();

  return (
    <>
      {idealWeight && (
        <div className="mx-auto sm:w-1/2 sm:h-24 ">
          <div className="text-2xl text-teal-700 flex flex-col sm:flex-row items-center justify-center border-2 border-fuchsia-500 rounded-md mx-4 bg-indigo-200 bg-opacity-25 sm:h-full">
            <h2>
              YOUR IDEAL WEIGHT RANGE IS: {idealWeight[0]} - {idealWeight[3]}{" "}
              kg.
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Result;
