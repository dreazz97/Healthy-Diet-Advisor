import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './UserInputStyle.css'

const UserInput = ({ getRecipes }) => {
    const [gender, setGender] = useState('female');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [activity, setActivity] = useState('');
    const [plan, setPlan] = useState('');

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleChangeHeight = (event) => {
        setHeight(event.target.value);
    };

    const handleChangeWeight = (event) => {
        setWeight(event.target.value);
    };

    const handleChangeAge = (event) => {
        setAge(event.target.value);
    };

    const handleChangePlan = (event) => {
        setPlan(event.target.value);
    };

    const handleChangeActivity = (event) => {
        setActivity(event.target.value);
    };


    // const getRecipes = () => {
    //     async function getRecipesAPI() {
    //         const recipesResponse = await fetch(`http://localhost:3001/hda/userdietplan?gender=${gender}&weight=${weight}&height=${height}&age=${age}&plan=${plan}&activity=${activity}`);
    //         const recipesData = await recipesResponse.json();
    //         console.log(recipesData.recipes[0].meal_title);
    //         console.log(recipesData.recipes[1].meal_title);
    //     }
    //     getRecipesAPI()
    // }

    const fetchRecipes = () => {
        getRecipes(gender, weight, height, age, plan, activity); // Call the function passed as a prop
      }

    return (
        <div id='UserInputDiv'>
            <Grid container justifyContent='center'>
                <Grid item xxl={12}>
                    <h2>User Input</h2>
                </Grid>
            </Grid>
            <Grid container textAlign='center' alignItems='center' spacing={{ lg: 3, md: 2, xs: 3 }}>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group" color="success">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={gender}
                            onChange={handleChangeGender}
                        >
                            <FormControlLabel value="female" control={<Radio color="success" />} label="Female" />
                            <FormControlLabel value="male" control={<Radio color="success" />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
                    <TextField
                        // id="outlined-number"
                        label="Height"
                        placeholder="In cm"
                        type="number"
                        color='success'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={height}
                        onChange={handleChangeHeight}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
                    <TextField
                        label="Weight"
                        placeholder="In kg"
                        type="number"
                        color='success'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={weight}
                        onChange={handleChangeWeight}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
                    <TextField
                        label="Age"
                        type="number"
                        color='success'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={age}
                        onChange={handleChangeAge}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label" color='success'>Activity</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={activity}
                            color='success'
                            onChange={handleChangeActivity}
                            label="Activity"
                        >
                            <MenuItem value="sed">Sedentary</MenuItem>
                            <MenuItem value="la">Light Active</MenuItem>
                            <MenuItem value="ma">Medium Active</MenuItem>
                            <MenuItem value="va">Very Active</MenuItem>
                            <MenuItem value="sa">Super Active</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label" color='success'>Plan</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={plan}
                            color='success'
                            onChange={handleChangePlan}
                            label="Age"
                        >
                            <MenuItem value="weightloss">Lose Weight</MenuItem>
                            <MenuItem value="weightgain">Gain Weight</MenuItem>
                            <MenuItem value="extraweightgain">Gain Extra Weight</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button color="success" variant="outlined" onClick={fetchRecipes}>Get Recipes</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserInput