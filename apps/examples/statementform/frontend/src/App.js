import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col} from "react-bootstrap";

import StatementForm from "./components/StatementForm";

function App() {
    return (
        <Container>
            <Row>
                <Col><StatementForm/></Col>
            </Row>
        </Container>
    );
}

export default App;
