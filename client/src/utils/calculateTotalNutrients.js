import { removeUnit } from "./removeUnit";

export const calculateTotalNutrients = (foods) => {
    console.log(foods, "foods")
    // Initialize the total nutrient values to zero
    let totalFat = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalCalorie = 0;

    // Loop through each food item and accumulate the nutrient values
    foods.forEach((food) => {
        if (
            food &&
            food.fat &&
            food.carbs &&
            food.protein &&
            food.calories &&
            !isNaN(food.fat) &&
            !isNaN(food.carbs) &&
            !isNaN(food.protein) &&
            !isNaN(food.calories)
        ) {
            totalFat += parseFloat(removeUnit(food.fat));
            totalCarbs += parseFloat(removeUnit(food.carbs));
            totalProtein += parseFloat(removeUnit(food.protein));
            totalCalorie += parseFloat(removeUnit(food.calories));
        }
    });

    // Return the accumulated total nutrient values as an object
    return {
        totalFat: totalFat.toFixed(2),
        totalCarbs: totalCarbs.toFixed(2),
        totalProtein: totalProtein.toFixed(2),
        totalCalorie: totalCalorie.toFixed(2),
    };
};


const foods = [
    {
        food_name: 'White Bread',
        amount: '100g',
        carbs: '50.61g',
        protein: '7.64g',
        fat: '3.29g',
        calories: '266.00kcal',
        // other properties...
    },
    // more food items...
];

const totalNutrients = calculateTotalNutrients(foods);
console.log(totalNutrients);

