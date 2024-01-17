import 'bootstrap/dist/css/bootstrap.min.css'
import {StrictMode, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

import StatementPanel from "./components/StatementPanel";
import Login from "./components/Login"
import {AppContext} from "./components/AppContext";

function App() {

    const [token, setToken] = useState(null)

    const appCtx = {
        jwt: {
            token,
            setToken
        },
        oauth2: {
            tokenURL: "http://localhost:8005/oauth2/token"
        },
        statement: {
            listURL: "http://localhost:8005/statement/list",
            getURL: "http://localhost:8005/statement/get"
        },
        statementField: {
            getURL: "http://localhost:8005/statement/field/get",
            updateURL: "http://localhost:8005/statement/field/update"
        }
    }

    // console.log(appCtx.jwt)

    if (appCtx.jwt.token == null) {
        return (
            <StrictMode>
                <AppContext.Provider value={appCtx}>
                    <Container>
                        <Row>
                            <Col>
                                <Login/>
                            </Col>
                        </Row>
                    </Container>
                </AppContext.Provider>
            </StrictMode>
        )
    } else {
        return (
            <StrictMode>
                <AppContext.Provider value={appCtx}>
                    <Container>
                        <Row>
                            <Col>
                                <StatementPanel/>
                            </Col>
                        </Row>
                    </Container>
                </AppContext.Provider>
            </StrictMode>
        )
    }
}

export default App;
