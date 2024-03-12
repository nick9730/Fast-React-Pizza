import React from 'react'
import Button from '../../Ui/Button'
import { useDispatch } from 'react-redux'
import { dincreaseItemQuantity, increaseItemQuantity } from './cartSlice'

export default function UpdateItem({pizzaId,currentQuantity}) {

    const dispatch=useDispatch()
  return (
    <div className='flex gap-1 items-center md:gap-3'>
        <Button type="round" onClick={()=>dispatch(dincreaseItemQuantity(pizzaId))}>-</Button>
        <span>{currentQuantity}</span>
        <Button type="round" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        
    </div>
  )
}
