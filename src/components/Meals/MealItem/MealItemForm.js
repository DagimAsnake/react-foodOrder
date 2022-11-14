import React, { useRef, useState } from 'react'
import Classes from './MealItemForm.module.css'
import Input from '../../UI/Input'

function MealItemForm(props) {

    const amountInputRef = useRef()
    const [amountIsValid, setAmountIsValid] = useState(true)

    const submitHandler = (e) => {
        e.preventDefault()

        const enteredAmount = amountInputRef.current.value
        const enteredAmountNumber = +enteredAmount

        if (enteredAmountNumber === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false)
            return
        }

        props.onAddToCart(enteredAmountNumber)
    }

    return (
        <div>
            <form className={Classes.form} onSubmit={submitHandler}>
                <Input
                    ref={amountInputRef}
                    label='Amount'
                    input={{
                        id: 'amount_' + props.id,
                        type: 'number',
                        min: 1,
                        max: 5,
                        step: 1,
                        defaultValue: 1
                    }}
                />
                <button>+ Add</button>
                {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
            </form>
        </div>
    )
}

export default MealItemForm