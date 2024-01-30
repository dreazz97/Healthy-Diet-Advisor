package main

import (
	"math"
)

func calculateTDEE(gender string, weight int, height int, age int, activity string) (float64, error) {
	activityMap := map[string]float64{
		"sed": 1.2,
		"la":  1.375,
		"ma":  1.55,
		"va":  1.725,
		"sa":  1.9,
	}

	var tdee float64
	var roundedTdee float64

	if gender == "male" {
		tdee = (88.4 + 13.4*float64(weight) + 4.8*float64(height) - 5.68*float64(age)) * activityMap[activity]
		roundedTdee = math.Round(tdee*100) / 100
	} else {
		tdee = (447.6 + 9.25*float64(weight) + 3.10*float64(height) - 4.33*float64(age)) * activityMap[activity]
		roundedTdee = math.Round(tdee*100) / 100
	}

	return roundedTdee, nil
}

func distributeCaloriesPerMeal(plan string, tdee float64) (breakfastCalories float64, lunchCalories float64, dinnerCalories float64) {
	var tdeeAfterPlan float64

	switch plan {
	case "weightloss":
		tdeeAfterPlan = tdee - 450
	case "weightgain":
		tdeeAfterPlan = tdee + 450
	case "extraweightgain":
		tdeeAfterPlan = tdee + 950
	}

	Initialbreakfast := tdeeAfterPlan * 0.2
	Initiallunch := tdeeAfterPlan * 0.5
	Initaldinner := tdeeAfterPlan * 0.3

	breakfastCalories = math.Round(Initialbreakfast*100) / 100
	lunchCalories = math.Round(Initiallunch*100) / 100
	dinnerCalories = math.Round(Initaldinner*100) / 100

	return breakfastCalories, lunchCalories, dinnerCalories
}

// func getMealTypeRecipe(mealType string, mealCalories float64)
