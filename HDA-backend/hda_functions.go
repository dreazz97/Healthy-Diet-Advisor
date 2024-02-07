package main

import (
	"encoding/json"
	"math"
	"net/http"
	"strconv"
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

func distributeCaloriesPerMeal(plan string, tdee float64) (breakfastCalories int, lunchCalories int, dinnerCalories int, tdeeAfterPlan float64) {

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
	Initialdinner := tdeeAfterPlan * 0.3

	breakfastCalories = int(math.Round(Initialbreakfast))
	lunchCalories = int(math.Round(Initiallunch))
	dinnerCalories = int(math.Round(Initialdinner))

	return breakfastCalories, lunchCalories, dinnerCalories, tdeeAfterPlan
}

type GetMealRecipeResponse struct {
	Hits []struct {
		Recipe struct {
			Label    string   `json:"label"`
			Image    string   `json:"image"`
			Url      string   `json:"url"`
			MealType []string `json:"mealType"`
		} `json:"recipe"`
	} `json:"hits"`
}

type Recipe struct {
	MealTitle  string `json:"meal_title"`
	Image      string `json:"image"`
	RecipeLink string `json:"recipe_link"`
	MealType   string `json:"mealType"`
}

func getMealTypeRecipe(mealType string, mealCalories int) (*Recipe, error) {
	str := mealCalories + 10
	mealCaloriesMax := strconv.Itoa(str)
	mealCaloriesMin := strconv.Itoa(mealCalories)
	getMealTypeRecipeUrl := "https://api.edamam.com/api/recipes/v2?type=public&app_id=" + api_id + "&app_key=" + api_key + "&diet=balanced&mealType=" + mealType + "&calories=" + mealCaloriesMin + "-" + mealCaloriesMax + "&time=60-90&random=true"

	resp, err := http.Get(getMealTypeRecipeUrl)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var mealRecipeResponse GetMealRecipeResponse
	if err := json.NewDecoder(resp.Body).Decode(&mealRecipeResponse); err != nil {
		return nil, err
	}

	recipe := &Recipe{
		MealTitle:  mealRecipeResponse.Hits[0].Recipe.Label,
		Image:      mealRecipeResponse.Hits[0].Recipe.Image,
		RecipeLink: mealRecipeResponse.Hits[0].Recipe.Url,
		MealType:   mealRecipeResponse.Hits[0].Recipe.MealType[0],
	}
	return recipe, nil
}
