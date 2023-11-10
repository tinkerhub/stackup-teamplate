import {Row,Col} from "react-bootstrap"
import extraItems from "../data/items2.json"
import {ExtraItem} from "../components/ExtraItem"


export function Extras() {
return ( 
<>
<h1>Extras</h1>
<Row md={2} xs={1} lg={4} className="g-3">
    {extraItems.map(item =>(
    <Col key={item.id}><ExtraItem {...item}/>
    </Col>
    ))}
</Row>
</>
)
}