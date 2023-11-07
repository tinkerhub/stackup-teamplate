import {Routes,Route} from "react-router-dom"
import {Container} from "react-bootstrap"
import {Gents} from "./pages/Gents"
import {Women} from "./pages/Women"
import {Extras} from "./pages/Extras"
import {Navbar} from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  return (
    
   <ShoppingCartProvider>
    <Navbar />
  <Container className="mb-4">
    <Routes>
      <Route path="/" element={<Gents />} />
      <Route path="/women" element={<Women/>} />
      <Route path="/extras" element={<Extras />} />
    </Routes>
  </Container>
  </ShoppingCartProvider>

  )
}
export default App