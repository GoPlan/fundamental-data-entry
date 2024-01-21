import {useCallback, useContext, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

import StatementList from "./StatementList";
import StatementForm from "./StatementForm";
import {AppContext} from "./AppContext";

function fieldsListToMap(fieldsList) {

    const fieldsDict = {}

    fieldsList.forEach(item => {
        fieldsDict[item.fieldname] = item.value
    })

    return fieldsDict
}

function docToStatement(statement) {
    statement.statementfields = fieldsListToMap(statement.statementfields)
    return statement
}

export default function StatementPanel() {

    const appCtx = useContext(AppContext)
    const authorizationBearer = `Bearer ${appCtx.user.jwt.token.access_token}`

    const [statementList, setStatementList] = useState([])
    const [statement, setStatement] = useState(null)
    const [statementToSelect, setStatementToSelect] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const listURL = appCtx.statement.listURL

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

    const reloadCurrentStatement = useCallback(() => {
        setStatementToSelect({
            stockcode: statement.stockcode,
            statementtype: statement.statementtype,
            quarter: statement.quarter
        })
    }, [statement])


    if (statementToSelect) {
        const getURL = appCtx.statement.getURL
        const stockcode = statementToSelect.stockcode
        const statementtype = statementToSelect.statementtype
        const quarter = statementToSelect.quarter

        const fetchURL = `${getURL}/${stockcode}/${statementtype}/${quarter}`

        fetch(fetchURL, {
            headers: {
                Accept: "application/json",
                Authorization: authorizationBearer
            }
        })
            .then(res => res.json())
            .then(doc => {
                setStatement(docToStatement(doc))
                setStatementToSelect(null)
            })

    }

    return (
        <Container>
            <Row>
                <Col><StatementList editable={{isEditing, setIsEditing}}
                                    statementList={statementList}
                                    statement={statement}
                                    setSelectstatement={setStatementToSelect}/></Col>
                <Col><StatementForm editable={{isEditing, setIsEditing}}
                                    statement={statement}
                                    reloadCurrentStatement={reloadCurrentStatement}/></Col>
            </Row>
        </Container>
    )
}