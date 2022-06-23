export const initialState = {
  gender: "",
  height: 0,
  frameSize: "",
  bodyType: "",
  weight: 0,
  idealWeight: 0,
  calorieNeed: 0,
  weightNeed: 0,
  kgPerCm: 0,
  initialWeight: 48.08,
};

const UserReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SELECT_GENDER":
      console.log("SELECT_GENDER", payload);

      return {
        ...state,
        gender: payload,
      };

    case "SELECT_HEIGHT":
      console.log("SELECT_HEIGHT", payload);

      return {
        ...state,
        height: payload,
      };
    case "SELECT_FRAME_SIZE":
      console.log("SELECT_FRAME_SIZE", payload);

      return {
        ...state,
        frameSize: payload,
      };

    case "CALC_BODY_TYPE":
      console.log("CALC_BODY_TYPE", payload);
      return {
        ...state,
        bodyType: payload,
      };

    case "SELECT_WEIGHT":
      console.log("SELECT_WEIGHT", payload);

      return {
        ...state,
        weight: payload,
      };

    case "CALC_IDEAL_WEIGHT":
      console.log("CALC_IDEAL_WEIGHT", payload);
      return {
        ...state,
        idealWeight: payload,
      };
    default:
      throw new Error(`No case for type ${type} found in UserReducer.`);
  }
};

export default UserReducer;
