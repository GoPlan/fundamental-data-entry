import 'bootstrap/dist/css/bootstrap.min.css'
import {StrictMode, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

import StatementPanel from "./components/StatementPanel";
import Login from "./components/Login"
import {AppContext} from "./components/AppContext";

function App() {

    const [token, setToken] = useState(null)

    const appCtx = {
        user: {
            jwt: {
                token,
                setToken
            },
            tokenURL: "http://localhost:8005/oauth2/token"
        },
        statement: {
            listURL: "http://localhost:8005/statements/list",
            getURL: "http://localhost:8005/statements/get"
        },
        statementField: {
            getURL: "http://localhost:8005/statements/field/get",
            updateURL: "http://localhost:8005/statements/field/update"
        }
    }

    // console.log(appCtx.jwt)

    if (appCtx.user.jwt.token == null) {
        return (
            <StrictMode>
                <AppContext.Provider value={appCtx}>
                    <Container>
                        <Row> <Col> <Login/> </Col> </Row>
                    </Container>
                </AppContext.Provider>
            </StrictMode>
        )
    } else {
        return (
            <StrictMode>
                <AppContext.Provider value={appCtx}>
                    <Container>
                        <Row> <Col> <StatementPanel/> </Col> </Row>
                    </Container>
                </AppContext.Provider>
            </StrictMode>
        )
    }
}

export default App;
