import 'bootstrap/dist/css/bootstrap.min.css'
import {StrictMode, useCallback, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

import StatementPanel from "./components/StatementPanel";
import Login from "./components/Login"
import {AppContext} from "./components/AppContext";

function validateAuthDoc(doc) {
    return "access_token" in doc
}


function App() {

    const appCtx = {
        user: null,
        oauth2: {
            tokenURL: "http://localhost:8005/oauth2/token"
        },
        statement: {
            listStockCodesURL: "http://localhost:8005/statements/stockcodes",
            listStatementsURL : "http://localhost:8005/statements/list",
            getStatementURL: "http://localhost:8005/statements/get"
        },
        statementField: {
            getURL: "http://localhost:8005/statements/field/get",
            updateURL: "http://localhost:8005/statements/field/update"
        }
    }

    const [token, setToken] = useState(null)

    const signOut = useCallback(() => {
        setToken(null)
    }, [token])

    const signIn = useCallback((username, password) => {

        const tokenURL = appCtx.oauth2.tokenURL

        const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)

        fetch(tokenURL, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(doc => {
                if (validateAuthDoc(doc)) {
                    setToken(doc)
                }
            })
            .catch(err => console.log(err))
    }, [])


    appCtx.user = {
        jwt: {
            token,
            signIn,
            signOut
        },
    }

    if (appCtx.user && appCtx.user.jwt && appCtx.user.jwt.token) {
        return (
            <StrictMode>
                <AppContext.Provider value={appCtx}>
                    <Container>
                        <Row> <Col> <StatementPanel/> </Col> </Row>
                    </Container>
                </AppContext.Provider>
            </StrictMode>
        )
    } else {
        return (
            <StrictMode>
                <AppContext.Provider value={appCtx}>
                    <Container>
                        <Row> <Col> <Login signIn={signIn}/> </Col> </Row>
                    </Container>
                </AppContext.Provider>
            </StrictMode>
        )
    }
}

export default App;
