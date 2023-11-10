import { useShoppingCart } from "../context/ShoppingCartContext"
import  extraItems  from "../data/items2.json"

import { Stack,Button} from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
type CartItemProps ={
    id:number
    quantity:number
}

export function CartItem2({ id,quantity}:CartItemProps) {
const {removeFromCart}=useShoppingCart()
const item2=extraItems.find(i => i.id === id)
if (item2 == null) return null

return (
    <Stack direction ="horizontal" gap={2} className="d-flex align-items-center">
        <img src={item2.imgUrl}
        style={{width:"125px",height:"125px",objectFit:"cover"}}
        />
        <div className="me-auto">
            <div>
            {item2.name} {quantity >1 &&  <span 
            className="text-muted" style={{fontSize:".65rem"}}>x{quantity}</span>}
            </div>
            <div
            className="text-muted" style={{fontSize:".75rem"}}>{formatCurrency(item2.price)}
            </div>
        </div> 
        <div> {formatCurrency(item2.price * quantity)}</div>
        <Button variant=" outline-danger" size="sm" onClick={()=>removeFromCart(item2.id)}>&times;</Button>
    </Stack>

    

)
}