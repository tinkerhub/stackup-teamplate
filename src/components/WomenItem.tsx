import {Card} from "react-bootstrap"
import {formatCurrency} from "../utilities/formatCurrency"
import {Button} from "react-bootstrap"
import {useShoppingCart} from "../context/ShoppingCartContext.tsx"

type WomenItemProps ={
    id:number
    name:string
    price:number
    imgUrl:string
}
export function WomenItem({ id, name, price, imgUrl }:
    WomenItemProps) {
        const { 
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
        } = useShoppingCart()
        const quantity =getItemQuantity(id)
        return (
        <Card className="h-100">
            <Card.Img 
            variant="top"
            src={imgUrl}
            height="280px" style={{objectFit:"cover"}}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex 
                justify-content-space-between align-items-baseline
                 mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{ formatCurrency(price)}</span>
                  
                </Card.Title>
                <div className="mt-auto">
                  {quantity === 0? (
                    <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add to Cart</Button>
                  ) : <div className="d-flex align-items-center 
                  flex-column" style={{gap:".5rem"}}>
                      <div className="d-flex align-items-center
                      justify-content-center" style={{gap:".5rem"}}>
                        <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                        <div>
                        <span className="fs-3">{quantity}</span>in cart
                        </div>
                       <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                      </div>
                        <Button onClick={() => removeFromCart(id)} variant="danger" size="sm" >Remove</Button>
                      </div>}
                </div>
            </Card.Body>
        </Card>
        )
    }