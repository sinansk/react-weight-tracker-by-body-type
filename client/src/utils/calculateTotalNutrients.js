export const calculateTotalNutrients = ({ selectedDate, food, calorieDiary, operation }) => {
    console.log("food", food)
    const removeUnit = (value1, value2, operation) => {
        const unitRegex = /[^\d.-]+$/;
        const unit = value1.match(unitRegex)[0];

        // Remove the unit from value1 and value2, and parse them as numbers
        const number1 = parseFloat(value1.replace(unitRegex, ""));
        const number2 = parseFloat(value2.replace(/[^\d.-]/g, ""));

        // Perform the addition and concatenate the unit back to the result
        let result;
        if (operation === "add") {
            result = (number1 + number2).toFixed(2);
        } else if (operation === "delete") {
            result = (number1 - number2).toFixed(2);
        }

        // Concatenate the unit back to the result
        result += unit;
        return result;
    }
    const diaryEntry = calorieDiary.find((entry) => entry.date === selectedDate);

    if (!diaryEntry) {
        return {
            totalFat: "0g",
            totalCarbs: "0g",
            totalProtein: "0g",
            totalCalories: "0kcal",
        };
    }
    const { totalFat, totalCarbs, totalProtein, totalCalories } = diaryEntry.totalNutrient;
    const newTotalNutrient = {
        totalFat: removeUnit(totalFat, food.fat || "0g", operation),
        totalCarbs: removeUnit(totalCarbs, food.carbs || "0g", operation),
        totalProtein: removeUnit(totalProtein, food.protein || "0g", operation),
        totalCalories: removeUnit(totalCalories, food.calories || "0kcal", operation),
    };
    if (newTotalNutrient.totalFat === "0.00g" && newTotalNutrient.totalCarbs === "0.00g" && newTotalNutrient.totalProtein === "0.00g" && newTotalNutrient.totalCalories === "0.00kcal") {
        return null
    }
    return newTotalNutrient;
};
