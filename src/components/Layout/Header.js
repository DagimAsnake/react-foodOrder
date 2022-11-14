import React from 'react'
import meals from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

function Header(props) {
    return (
        <div>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.showCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={meals} alt="A table full of Delicious foods" />
            </div>
        </div>
    )
}

export default Header