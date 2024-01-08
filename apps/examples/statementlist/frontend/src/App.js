import {useState} from "react";

import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col} from "react-bootstrap";

import StatementForm from "./components/StatementForm";
import StatementList from "./components/StatementList";
import {AppContext, StatementContext} from "./components/AppContext";

function App() {
    const appCtx = {
        username: "user00",
        statementField: {
            getURL: "http://localhost:8005/statement/field/get",
            updateURL: "http://localhost:8005/statement/field/update"
        }
    }


    const [currentStatement, setCurrentStatement] = useState({
        stockcode: "BSR",
        statementtype: "Income",
        quarter: "2023Q4",
    })

    return (
        <AppContext.Provider value={appCtx}>

            <Container>
                <StatementContext.Provider value={{currentStatement, setCurrentStatement}}>
                    <Row>
                        <Col><StatementList/></Col>
                        <Col><StatementForm/></Col>
                    </Row>
                </StatementContext.Provider>
            </Container>
        </AppContext.Provider>
    )
}

export default App;
