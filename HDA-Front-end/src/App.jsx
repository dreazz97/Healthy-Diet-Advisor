import Grid from '@mui/material/Grid';
import DietCard from './DietCard';
import UserInput from './UserInput';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MeatballsImg from './assets/meatballs.jpeg'

function App() {
  return (
    <div className="App">
      <Grid container justifyContent='center'>
        <Grid item xxl={12}>
          <h1 id='title'>Healthy {<FavoriteIcon fontSize='large' style={{ color: 'red' }} />} Diet Advisor</h1>
        </Grid>
      </Grid>
      <UserInput />
      <Grid container justifyContent='center' spacing={{ lg: 12, md: 6, sm: 4, xs: 3 }}>
        <Grid item xxl={4}>
          <DietCard cardTitle='Meatballs' cardImageSrc={MeatballsImg} cardTotalCalories='1300' cardCaloriesPServing='200' cardMealType='Breakfast' cardLink='http://facebook.com' />
        </Grid>
        <Grid item xxl={4}>
          <DietCard cardTitle='Meatballs' cardImageSrc={MeatballsImg} cardTotalCalories='1300' cardCaloriesPServing='200' cardMealType='Breakfast' cardLink='http://facebook.com' />
        </Grid>
        <Grid item xxl={4}>
          <DietCard cardTitle='Meatballs' cardImageSrc={MeatballsImg} cardTotalCalories='1300' cardCaloriesPServing='200' cardMealType='Breakfast' cardLink='http://facebook.com' />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
