import { useShoppingCart } from "../context/ShoppingCartContext"
import  womenItems  from "../data/items1.json"

import { Stack,Button} from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
type CartItemProps ={
    id:number
    quantity:number
}

export function CartItem1({ id,quantity}:CartItemProps) {
const {removeFromCart}=useShoppingCart()
const item1=womenItems.find(i => i.id === id)
if (item1 == null) return null

return (
    <Stack direction ="horizontal" gap={2} className="d-flex align-items-center">
        <img src={item1.imgUrl}
        style={{width:"125px",height:"125px",objectFit:"cover"}}
        />
        <div className="me-auto">
            <div>
            {item1.name} {quantity >1 &&  <span 
            className="text-muted" style={{fontSize:".65rem"}}>x{quantity}</span>}
            </div>
            <div
            className="text-muted" style={{fontSize:".75rem"}}>{formatCurrency(item1.price)}
            </div>
        </div> 
        <div> {formatCurrency(item1.price * quantity)}</div>
        <Button variant=" outline-danger" size="sm" onClick={()=>removeFromCart(item1.id)}>&times;</Button>
    </Stack>

    

)
}