import {Container,Nav,Button,Navbar as NavbarBs} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"
export function Navbar() {
    const {openCart , cartQuantity} =useShoppingCart()
    return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
            
                <Nav.Link to="/" as={NavLink}>
                    Gents
                </Nav.Link>
                <Nav.Link to="/women" as={NavLink}>
                    Women
                </Nav.Link>
                <Nav.Link to="/extras" as={NavLink}>
                    Extras
                </Nav.Link>
            </Nav>
            {cartQuantity >0 && (
            <Button 
            onClick={openCart}
             style={{width:"3rem" ,height:"3rem",position:"relative"}}
            variant="outline-primary"
            className="rounded-circle">
            <svg
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="cart">
                <g fill="#134563">
                    <path d="M48.5 45.7H18.2c-.5 0-.9-.2-1.1-.6-.3-.4-.3-.9-.1-1.3l2.6-6.6L17 12.6H8.6V9.8h9.6c.7 0 1.3.5 1.4 1.2l2.8 26.1c0 .2 0 .4-.1.7l-2 5h28.2v2.9"></path>
                    <path d="m21.3 38.8-.6-2.7 31.9-6.6V18.2h-33v-2.8H54c.8 0 1.4.6 1.4 1.4v13.8c0 .7-.5 1.2-1.1 1.3l-33 6.9M49.9 54c-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm0-8.3c-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8-1.3-2.8-2.8-2.8zm-33 8.3c-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm0-8.3c-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8-1.3-2.8-2.8-2.8z"></path>
                </g>
            </svg>
                <div className="rounded-circle bg-danger d-flex justify-content-center
                 align-items-center" style={{
                    color:"white",
                    width:"1.5rem",
                    height:"1.5rem",
                    position:"absolute",
                    bottom:0,
                    right:0,
                    transform:"translate(25%,25%)",
             }}
             >
             {cartQuantity}
             </div>
            </Button>
    )}
        </Container>
    </NavbarBs>
    )
}