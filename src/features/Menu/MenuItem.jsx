import Button from "../../Ui/Button";
import { formatCurrency } from "../../Utilities/helpers";
import {useDispatch, useSelector} from 'react-redux'   
import { addItem, getCurrentQuantityItemById } from "../Cart/cartSlice";
import DeleteItem from "../Cart/DeleteItem";
import UpdateItem from "../Cart/UpdateItem";


function MenuItem({ pizza }) {

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityItemById(id))

const isInCart = currentQuantity >0

function hadndleAddtoCart(e){
  
 const newItem = {
  pizzaId:id,
  name,
  quantinty:1,
  unitPrice,
  totalPrice:unitPrice*1,
}
dispatch(addItem(newItem))
}


  return (
    <li className="flex gap-3 py-1">
      <img src={imageUrl} alt={name} className={`"h-24 " ${soldOut ?'opacity-40 greyscale ' :""}`} />
      <div className="flex flex-col grow ">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500 ">{ingredients.join(', ')}</p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p>
           : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
        
        
     {isInCart && 
     <div className="flex items-center gap-3 sm:gap-8">
      <UpdateItem pizzaId={id} currentQuantity={currentQuantity}/>
       <DeleteItem pizzaId={id}/>
      </div>}
       {!soldOut && !isInCart && <Button Button  type="small" onClick={hadndleAddtoCart}>Add to Cart</Button>}
        </div>
      </div>

    </li>
  );
}

export default MenuItem;
