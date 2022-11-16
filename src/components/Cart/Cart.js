import React, { useContext, useState } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/Cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

function Cart(props) {

    const [isCheckingout, setIsCheckingout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmitted, setDidSubmitted] = useState(false)

    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItem = cartCtx.items.length > 0

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const orderHandler = () => {
        setIsCheckingout(true)
    }

    const submitOrderHandler = async (userData) => {

        setIsSubmitting(true)

        await fetch('https://react-foodorder-67ff8-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })

        setIsSubmitting(false)
        setDidSubmitted(true)

        cartCtx.clearCart()

    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item =>
            <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}

            />)}
    </ul>

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.hideCart}>Close</button>
        {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = <>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckingout && <Checkout onConfirm={submitOrderHandler} onCancel={props.hideCart} />}
        {!isCheckingout && modalActions}
    </>

    const isSubmittingModalContent = <p>Sending order......</p>

    const didSubmittedModalContent = <>
        <p>Successfully sent the order</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.hideCart}>Close</button>
        </div>
    </>

    return (
        <Modal onClose={props.hideCart}>
            {!isSubmitting && !didSubmitted && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmitted && didSubmittedModalContent}
        </Modal>
    )
}

export default Cart