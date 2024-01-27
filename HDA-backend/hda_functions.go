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

func distributeCaloriesPerMeal()
