import {useContext, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

import StatementList from "./StatementList";
import StatementForm from "./StatementForm";
import {AppContext} from "./AppContext";


export default function StatementPanel() {

    const appCtx = useContext(AppContext)

    const [statementList, setStatementList] = useState([])
    const [statement, setStatement] = useState(null)
    const [selectStatement, setSelectStatement] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const listURL = appCtx.statement.listURL
        const authorizationBearer = `Bearer ${appCtx.user.jwt.token.access_token}`

        fetch(listURL, {
            headers: {
                Accept: "application/json",
                Authorization: authorizationBearer
            }
        })
            .then(result => result.json())
            .then(docs => {
                setStatementList(docs)
            })
    }, [appCtx]);


    if (selectStatement) {
        const getURL = appCtx.statement.getURL
        const stockcode = selectStatement.stockcode
        const statementtype = selectStatement.statementtype
        const quarter = selectStatement.quarter

        const fetchURL = `${getURL}/${stockcode}/${statementtype}/${quarter}`
        const authorizationBearer = `Bearer ${appCtx.user.jwt.token.access_token}`

        fetch(fetchURL, {
            headers: {
                Accept: "application/json",
                Authorization: authorizationBearer
            }
        })
            .then(res => res.json())
            .then(doc => {
                setStatement(doc)
                setSelectStatement(null)
            })
    }

    // console.log(statement)

    return (
        <Container>
            <Row>
                <Col><StatementList editable={{isEditing, setIsEditing}}
                                    statementList={statementList}
                                    statement={statement}
                                    setSelectstatement={setSelectStatement}/></Col>
                <Col><StatementForm editable={{isEditing, setIsEditing}}
                                    statement={statement}
                                    setSelectstatement={setSelectStatement}/></Col>
            </Row>
        </Container>
    )
}