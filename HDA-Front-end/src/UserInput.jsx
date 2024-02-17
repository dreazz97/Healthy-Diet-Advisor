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
import { useState, useEffect } from 'react';
import './UserInputStyle.css'

const UserInput = () => {
    const [gender, setGender] = useState('female');
    const [height, setHeight] = useState('');
    const [activity, setActivity] = useState('');
    const [plan, setPlan] = useState('');

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleChangeHeight = (event) => {
        setHeight(event.target.value);
    };

    const handleChangePlan = (event) => {
        setPlan(event.target.value);
    };

    const handleChangeActivity = (event) => {
        setActivity(event.target.value);
    };

    useEffect(() => {
        console.log(gender);
        console.log(plan);
        console.log(activity);
        console.log(height);
    }, [gender, plan, height, activity]);

    return (
        <div id='UserInputDiv'>
            <Grid container justifyContent='center'>
                <Grid item xxl={12}>
                    <h2>User Input</h2>
                </Grid>
            </Grid>
            <Grid container justifyContent='center' alignItems='center' spacing={3}>
                <Grid item xxl={2}>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={gender}
                            onChange={handleChangeGender}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xxl={2}>
                    <TextField
                        // id="outlined-number"
                        label="Height"
                        placeholder="In cm"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={height}
                        onChange={handleChangeHeight}
                    />
                </Grid>
                <Grid item xxl={2}>
                    <TextField
                        label="Weight"
                        placeholder="In kg"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xxl={2}>
                    <TextField
                        label="Age"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xxl={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Activity</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={activity}
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
                <Grid item xxl={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Plan</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={plan}
                            onChange={handleChangePlan}
                            label="Age"
                        >
                            <MenuItem value="weightloss">Lose Weight</MenuItem>
                            <MenuItem value="weightgain">Gain Weight</MenuItem>
                            <MenuItem value="extraweightgain">Gain Extra Weight</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserInput