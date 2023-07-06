import { bodyGoals } from "../data";

export const converBodyGoalStatus = (value) => {
    const index = bodyGoals.findIndex((item) => item.value === value);
    if (index !== -1) {
        return bodyGoals[index].status
    }
}