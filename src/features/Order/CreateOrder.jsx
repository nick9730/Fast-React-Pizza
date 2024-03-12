import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../Services/apiRestaurant";
import Button from "../../Ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {clearCart, getCart, getTotalCartPrice} from "../Cart/cartSlice";
import EmptyCart from "../Cart/EmptyCart"
import store from "../../store"
import { formatCurrency } from "../../Utilities/helpers";
import { useState } from "react";
import { fetchAddress } from "../User/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
  
const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart); 
  const username = useSelector((state)=>state.user.username)
  const dispatch = useDispatch();
   const navigation = useNavigation()
   const isSubmitting = navigation.state === "submitting"
   const formErrors = useActionData();

  
  const totalCartPrice = useSelector(getTotalCartPrice)
  const  priorityPrice = withPriority ? totalCartPrice * 0.2 : 0 
  const totalPrice = totalCartPrice +priorityPrice

  if(!cart.length) return <EmptyCart/>

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
     
      <button onClick={()=>dispatch(fetchAddress())}>Get Position</button>
      {/* <Form method="POST" action="/order/new"> */}

      <Form method= 'POST'  action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input w-full" defaultValue={username} type="text" name="customer" required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label  className="sm:basis-40">Phone number</label>
          <div className="grow" >
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-full">{formErrors.phone} </p>}
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label  className="sm:basis-40" >Address</label>
          <div className="grow">
            <input 
            
            className="input w-full"

             type="text"

              name="address" 

              required />
          </div>
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input

          className="h-6 w-6 accent-yellow-400   focus:outline-none 
          focus:ring
           focus:ring-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}/> 
          <Button type="primary" disabled={isSubmitting} 
       >
            {isSubmitting ?"Placing order" : `Order now from${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}


export default CreateOrder;
