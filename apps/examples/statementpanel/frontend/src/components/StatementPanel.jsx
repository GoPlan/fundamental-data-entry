import {useCallback, useContext, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

import StatementList from "./StatementList";
import StatementForm from "./StatementForm";
import {AppContext} from "./AppContext";
import StatementFormStructure from "./StatementFormStructure";

export default function StatementPanel() {

    const appCtx = useContext(AppContext)

    const [statement, setStatement] = useState(null)
    const [statementList, setStatementList] = useState(null)
    const [firstRun, setFirstRun] = useState(true)
    const [selectStatement, setSelectStatement] = useState(null)

    useEffect(() => {
        const listURL = appCtx.statement.listURL
        const username = appCtx.username

        fetch(`${listURL}/${username}`)
            .then(result => result.json())
            .then(docs => {
                setStatementList(docs)
                setFirstRun(false)
            })

    }, []);

    if (selectStatement) {
        const username = selectStatement.username
        const stockcode = selectStatement.stockcode
        const statementtype = selectStatement.statementtype
        const quarter = selectStatement.quarter
        const url = `http://localhost:8005/statement/get/${username}/${stockcode}/${statementtype}/${quarter}`

        fetch(url)
            .then(res => res.json())
            .then(doc => {
                setStatement(doc)
                setSelectStatement(null)
            })
    }

    if (firstRun) {
        return <></>
    } else {
        return (
            <Container>
                <Row>
                    <Col><StatementList statementList={statementList}
                                        statement={statement}
                                        setSelectstatement={setSelectStatement}/></Col>
                    <Col><StatementForm statement={statement} /></Col>
                </Row>
            </Container>
        )
    }
}