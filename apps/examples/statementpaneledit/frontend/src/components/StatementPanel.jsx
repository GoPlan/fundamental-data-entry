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
        const username = appCtx.username

        fetch(`${listURL}/${username}`)
            .then(result => result.json())
            .then(docs => {
                setStatementList(docs)
            })
    }, [appCtx]);


    if (selectStatement) {
        const getURL = appCtx.statement.getURL
        const username = selectStatement.username
        const stockcode = selectStatement.stockcode
        const statementtype = selectStatement.statementtype
        const quarter = selectStatement.quarter
        const fetchURL = `${getURL}/${username}/${stockcode}/${statementtype}/${quarter}`

        fetch(fetchURL)
            .then(res => res.json())
            .then(doc => {
                setStatement(doc)
                setSelectStatement(null)
            })
    }

    console.log(statement)

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