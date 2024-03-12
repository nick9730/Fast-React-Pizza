import { useSelector } from "react-redux";
import Button from "../../Ui/Button";
import { formatCurrency } from "../../Utilities/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";
import { getCurrentQuantityItemById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantinty, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityItemById(pizzaId))

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantinty}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
       <UpdateItem pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
