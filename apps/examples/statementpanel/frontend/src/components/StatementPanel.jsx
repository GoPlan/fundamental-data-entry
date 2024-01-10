import {useCallback, useContext, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

import StatementList from "./StatementList";
import StatementForm from "./StatementForm";
import {AppContext} from "./AppContext";
import StatementFormStructure from "./StatementFormStructure";

function fieldsList2Dict(fieldsList) {
    if (!fieldsList)
        return {};

    const fieldsDict = {}

    fieldsList.map(el => {
        fieldsDict[el.fieldname] = el.value
    })

    return fieldsDict
}

export default function StatementPanel() {

    const appCtx = useContext(AppContext)

    const [firstRun, setFirstRun] = useState(true)
    const [statementList, setStatementList] = useState(null)
    const [statement, setStatement] = useState(null)
    const [selectStatement, setSelectStatement] = useState(null)
    const [statementFields, setStatementFields] = useState(null)

    useEffect(() => {
        const listURL = appCtx.statement.listURL
        const username = appCtx.username

        if(firstRun){
            fetch(`${listURL}/${username}`)
                .then(result => result.json())
                .then(docs => {
                    setStatementList(docs)
                    setFirstRun(false)
                })
        }
    }, []);

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
                setStatementFields(fieldsList2Dict(doc.statementfields))
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
                    <Col><StatementForm statement={statement} statementFields={statementFields}/></Col>
                </Row>
            </Container>
        )
    }
}