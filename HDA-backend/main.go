package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func main() {

	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/hda/userdietplan", userdietplan).Methods("GET")
	log.Fatal(http.ListenAndServe("localhost:3001", myRouter))

}

func userdietplan(w http.ResponseWriter, r *http.Request) {
	gender := r.URL.Query().Get("gender")
	weightStr := r.URL.Query().Get("weight")
	heightStr := r.URL.Query().Get("height")
	ageStr := r.URL.Query().Get("age")
	plan := r.URL.Query().Get("plan")
	activity := r.URL.Query().Get("activity")

	weight, err := strconv.Atoi(weightStr)
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

	breakfastCalories, lunchCalories, dinnerCalories := distributeCaloriesPerMeal(plan, tdee)

	// getMealTypeRecipe("breakfast", breakfastCalories)

	log.Println(breakfastCalories, lunchCalories, dinnerCalories)

	fmt.Fprintf(w, "TDEE: %v Kcal", tdee)
}
