import {Row,Col} from "react-bootstrap"
import gentsItems from "../data/items.json"
import {GentsItem} from "../components/GentsItem"


export function Gents() {
return ( 
<>
<h1>Gents</h1>
<Row md={2} xs={1} lg={4} className="g-3">
    {gentsItems.map(item =>(
    <Col key={item.id}><GentsItem {...item}/>
    </Col>
    ))}
</Row>
</>
)
}