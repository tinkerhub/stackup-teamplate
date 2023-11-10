import { Offcanvas,Stack} from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import  gentsItems  from "../data/items.json"
import  womenItems  from "../data/items1.json"
import extraItems  from "../data/items2.json"
import { CartItem } from "./Cartitem"
import { CartItem1 } from "./Cartitem1"
import { CartItem2 } from "./Cartitem2"





type ShoppingCartProps ={
    isOpen: boolean
}

export function ShoppingCart({isOpen}: ShoppingCartProps) {
    const { closeCart,cartItems} = useShoppingCart()
    return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item =>(
                    <CartItem key={item.id} {...item} />
                    ))}
                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(cartItems.reduce((total,cartItem) =>{
                        const item=gentsItems.find(i => i.id === cartItem.id)
                        
                    return total +(item?.price ||0) * cartItem.quantity 
                    }, 0 )
                    )}
                    
                </div>
            </Stack>

            <Stack gap={3}>
                {cartItems.map(item1 =>(
                    <CartItem1 key={item1.id} {...item1} />
                    ))}
                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(cartItems.reduce((total,cartItem) =>{
                        const item1=womenItems.find(i => i.id === cartItem.id)
                        
                    return total +(item1?.price ||0) * cartItem.quantity 
                    }, 0 )
                    )}
                    
                </div>
            </Stack>

            <Stack gap={3}>
                {cartItems.map(item2 =>(
                    <CartItem2 key={item2.id} {...item2} />
                    ))}
                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(cartItems.reduce((total,cartItem) =>{
                        const item2=extraItems.find(i => i.id === cartItem.id)
                        
                    return total +(item2?.price ||0) * cartItem.quantity 
                    }, 0 )
                    )}
                    
                </div>
            </Stack>


            <Stack gap={3}>
                {cartItems.map(item =>(
                    <CartItem key={item.id} {...item} />
                    ))}
                {cartItems.map(item1 =>(
                    <CartItem1 key={item1.id} {...item1} />
                    ))}
                {cartItems.map(item2 =>(
                    <CartItem2 key={item2.id} {...item2} />
                    ))}
                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(cartItems.reduce((total,cartItem) =>{
                        const item=gentsItems.find(i => i.id === cartItem.id)
                        const item1=womenItems.find(i => i.id === cartItem.id)
                        const item2=extraItems.find(i => i.id === cartItem.id)
                        
                    return total +(item2?.price ||0) +(item1?.price ||0) +(item?.price ||0)  * cartItem.quantity 
                    }, 0 )
                    )}
                    
                </div>
            </Stack>

                
            

            


           
        </Offcanvas.Body>
    </Offcanvas>
    )
}