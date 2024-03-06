package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	// "github.com/joho/godotenv"
)

var (
	api_id  string
	api_key string
)

func main() {

	// err := godotenv.Load()
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	api_id = os.Getenv("APP_ID")
	api_key = os.Getenv("APP_KEY")
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "3001"
	}

	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/hda/userdietplan", userdietplan).Methods("GET")
	log.Fatal(http.ListenAndServe(":"+port, myRouter))

}

type RecipesResponse struct {
	Recipes           []Recipe `json:"recipes"`
	MaxCaloriesPerDay string   `json:"max_calories_per_day"`
}

func userdietplan(w http.ResponseWriter, r *http.Request) {
	gender := r.URL.Query().Get("gender")
	weightStr := r.URL.Query().Get("weight")
	heightStr := r.URL.Query().Get("height")
	ageStr := r.URL.Query().Get("age")
	plan := r.URL.Query().Get("plan")
	activity := r.URL.Query().Get("activity")
	breakfastPercStr := r.URL.Query().Get("breakfastperc")
	lunchPercStr := r.URL.Query().Get("lunchperc")
	dinnerPercStr := r.URL.Query().Get("dinnerperc")
	weight, err := strconv.Atoi(weightStr)
	if err != nil {
		log.Println(err)
		return
	}
	breakfastPerc, err := strconv.Atoi(breakfastPercStr)
	if err != nil {
		log.Println(err)
		return
	}
	lunchPerc, err := strconv.Atoi(lunchPercStr)
	if err != nil {
		log.Println(err)
		return
	}
	dinnerPerc, err := strconv.Atoi(dinnerPercStr)
	if err != nil {
		log.Println(err)
		return
	}

	var Recipes []Recipe

	if err != nil {
		// handle error
		log.Println("Error converting height to integer:", err)
		return
	}

	height, err := strconv.Atoi(heightStr)
	if err != nil {
		// handle error
		log.Println("Error converting height to integer:", err)
		return
	}

	age, err := strconv.Atoi(ageStr)
	if err != nil {
		// handle error
		log.Println("Error converting height to integer:", err)
		return
	}

	tdee, err1 := calculateTDEE(gender, weight, height, age, activity)
	if err1 != nil {
		log.Println("Error calculating the TDEE", err1)
		fmt.Fprintf(w, "Error calculating the TDEE: %v", err1)
		return
	}

	breakfastCalories, lunchCalories, dinnerCalories, tdeeAfterPlan := distributeCaloriesPerMeal(plan, tdee, breakfastPerc, lunchPerc, dinnerPerc)

	fmt.Println(breakfastCalories)
	fmt.Println(lunchCalories)
	fmt.Println(dinnerCalories)

	tdeeAfterPlanRound := int(math.Round(tdeeAfterPlan))

	breakfastRecipe, err := getMealTypeRecipe("breakfast", breakfastCalories)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	Recipes = append(Recipes, *breakfastRecipe)

	lunchRecipe, err := getMealTypeRecipe("lunch", lunchCalories)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	Recipes = append(Recipes, *lunchRecipe)

	dinnerRecipe, err := getMealTypeRecipe("dinner", dinnerCalories)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	Recipes = append(Recipes, *dinnerRecipe)

	tdeeAfterPlanFinal := strconv.Itoa(tdeeAfterPlanRound)

	response := RecipesResponse{
		Recipes:           Recipes,
		MaxCaloriesPerDay: tdeeAfterPlanFinal,
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(jsonResponse)
}
