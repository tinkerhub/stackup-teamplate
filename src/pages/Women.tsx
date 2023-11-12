import {Row,Col} from "react-bootstrap"
import womenItems from "../data/items1.json"
import {WomenItem} from "../components/WomenItem"


export function Women() {
return ( 
<>
<h1>Gents</h1>
<Row md={2} xs={1} lg={4} className="g-3">
    {womenItems.map(item =>(
    <Col key={item.id}><WomenItem {...item}/>
    </Col>
    ))}
</Row>
</>
)
}