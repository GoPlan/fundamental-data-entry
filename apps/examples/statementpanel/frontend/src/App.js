import 'bootstrap/dist/css/bootstrap.min.css'
import {Col, Container, Row} from "react-bootstrap";

import StatementPanel from "./components/StatementPanel";
import {AppContext} from "./components/AppContext";

function App() {
    const appCtx = {
        username: "user00",
        statement: {
            listURL: "http://localhost:8005/statement/list",
            getURL: "http://localhost:8005/statement/get"
        },
        statementField: {
            getURL: "http://localhost:8005/statement/field/get",
            updateURL: "http://localhost:8005/statement/field/update"
        }
    }

    return (
        <AppContext.Provider value={appCtx}>
            <Container>
                <Row>
                    <Col><StatementPanel/></Col>
                </Row>
            </Container>
        </AppContext.Provider>
    )
}

export default App;
