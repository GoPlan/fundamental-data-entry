import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col} from "react-bootstrap";

import IncomeForm from "./components/IncomeForm";

function App() {
    return (
        <Container>
            <Row>
                <Col><IncomeForm/></Col>
            </Row>
        </Container>
    );
}

export default App;
