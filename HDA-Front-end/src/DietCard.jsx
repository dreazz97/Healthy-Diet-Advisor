import React from 'react'
import './DietCardStyle.css';

const DietCard = ({cardTitle, cardImageSrc, cardTotalCalories, cardCaloriesPServing, cardMealType, cardLink}) => {
    return (
        <div id='diet-card'>
            <div id='diet-card-title-div'>
                <h2 id='card-title'>{cardTitle}</h2>
            </div>
            <div>
                <img id='diet-card-img-div' src={cardImageSrc} alt="meatballs-img" />
            </div>
            <div id='diet-card-body'>
                <p className='body-paragraph'>Total Calories: <span className='value-paragraph'>{cardTotalCalories} Kcal</span></p>
                <p className='body-paragraph'>Calories Per Serving: <span className='value-paragraph'>{cardCaloriesPServing} Kcal</span></p>
                <p className='body-paragraph'>Meal Type: <span className='value-paragraph'>{cardMealType}</span></p>
                <p className='body-paragraph'>Recipe Link: <a id='card-link' href={cardLink}><span id='link-paragraph'>Link</span></a></p>
            </div>
        </div>
    )
}

export default DietCard