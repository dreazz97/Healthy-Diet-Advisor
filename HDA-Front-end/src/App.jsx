import Grid from '@mui/material/Grid';
import DietCard from './DietCard';
import UserInput from './UserInput';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [visibleCards, setVisibleCards] = useState(false);
  const [errorEmptyFields, setErrorEmptyFields] = useState(false);
  const [errorSumCalories, setErrorSumCalories] = useState(false);

  const getRecipes = async (gender, weight, height, age, plan, activity, breakfastPercent, lunchPercent, dinnerPercent) => {
    if (gender === "" || weight === "" || height === "" || age === "" || plan === "" || activity === "" || breakfastPercent === "" || lunchPercent === "" || dinnerPercent === "") {
      setErrorEmptyFields(true);
      setTimeout(() => {
        setErrorEmptyFields(false);
      }, 2500);
      return
    }
    if (parseInt(breakfastPercent) + parseInt(lunchPercent) + parseInt(dinnerPercent) !== 100) {
      console.log(parseInt(breakfastPercent) + parseInt(lunchPercent) + parseInt(dinnerPercent));
      setErrorSumCalories(true);
      setTimeout(() => {
        setErrorSumCalories(false);
      }, 3500);
      return
    }
    const recipesResponse = await fetch(`http://localhost:3001/hda/userdietplan?gender=${gender}&weight=${weight}&height=${height}&age=${age}&plan=${plan}&activity=${activity}&breakfastperc=${breakfastPercent}&lunchperc=${lunchPercent}&dinnerperc=${dinnerPercent}`);
    const recipesData = await recipesResponse.json();
    setRecipes(recipesData);
    setVisibleCards(true);
  }

  return (
    <div className="App">
      <Grid container justifyContent='center'>
        <Grid item xxl={12}>
          <h1 id='title'>Healthy {<FavoriteIcon fontSize='large' style={{ color: 'red' }} />} Diet Advisor</h1>
        </Grid>
      </Grid>
      <UserInput getRecipes={getRecipes} />
      {errorEmptyFields &&
        <Grid container justifyContent='center'>
          <Grid item xxl={12}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">Please submit all required fields to get the recipes.</Alert>
            </Stack>
          </Grid>
        </Grid>
      }
      {errorSumCalories &&
        <Grid container justifyContent='center'>
          <Grid item xxl={12}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">The meal calory distribuition sum must be equal to 100, please distribute across the three meals.</Alert>
            </Stack>
          </Grid>
        </Grid>
      }
      {visibleCards &&
        <Grid container justifyContent='center' spacing={{ lg: 12, md: 6, sm: 4, xs: 3 }}>
          <Grid item xxl={4}>
            <DietCard cardTitle={recipes.recipes[0].meal_title} cardImageSrc={recipes.recipes[0].image} cardTotalCalories={recipes.recipes[0].total_calories} cardCaloriesPServing={recipes.recipes[0].calories_per_one_serving} cardMealType={recipes.recipes[0].mealType} cardLink={recipes.recipes[0].recipe_link} />
          </Grid>
          <Grid item xxl={4}>
            <DietCard cardTitle={recipes.recipes[1].meal_title} cardImageSrc={recipes.recipes[1].image} cardTotalCalories={recipes.recipes[1].total_calories} cardCaloriesPServing={recipes.recipes[1].calories_per_one_serving} cardMealType={recipes.recipes[1].mealType} cardLink={recipes.recipes[1].recipe_link} />
          </Grid>
          <Grid item xxl={4}>
            <DietCard cardTitle={recipes.recipes[2].meal_title} cardImageSrc={recipes.recipes[2].image} cardTotalCalories={recipes.recipes[2].total_calories} cardCaloriesPServing={recipes.recipes[2].calories_per_one_serving} cardMealType={recipes.recipes[2].mealType} cardLink={recipes.recipes[2].recipe_link} />
          </Grid>
        </Grid>
      }
      {visibleCards &&
        <Grid container textAlign='center'>
          <Grid item xs={12}>
            <h2 id='max-daily-calories'>Maximum Daily Calories: {recipes.max_calories_per_day} Kcal</h2>
          </Grid>
        </Grid>
      }
    </div>
  );
}

export default App;
