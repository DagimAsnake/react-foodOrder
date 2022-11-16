import React, { useState, useEffect } from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';


function AvailableMeals() {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState()

    useEffect(() => {

        const fetchHandler = async () => {
            const response = await fetch('https://react-foodorder-67ff8-default-rtdb.firebaseio.com/meals.json')

            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const data = await response.json()

            const loadedMeals = []

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                })
            }

            setMeals(loadedMeals)
            setIsLoading(false)
        }

        fetchHandler().catch(error => {
            setHttpError(error.message)
            setIsLoading(false)
        })

    }, [])

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading.......</p>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    }


    const mealsList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price} />)

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals