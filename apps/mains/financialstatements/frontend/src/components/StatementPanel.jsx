import {useCallback, useContext, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

import StatementStockCodeList from "./StatementStockCodeList";
import StatementForm from "./StatementForm";
import {AppContext} from "./AppContext";
import StatementTable from "./StatementTable";

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

function statementsDocToList(docs) {
    return docs
}

export default function StatementPanel() {

    const appCtx = useContext(AppContext)
    const authorizationBearer = `Bearer ${appCtx.user.jwt.token.access_token}`

    const [stockcodeList, setStockcodeList] = useState([])
    const [currentStockCode, setCurrentStockCode] = useState(null)
    const [statementsList, setStatementsList] = useState([])
    const [currentStatement, setCurrentStatement] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const listURL = appCtx.statement.listStockCodesURL

        fetch(listURL, {
            headers: {
                Accept: "application/json",
                Authorization: authorizationBearer
            }
        })
            .then(result => result.json())
            .then(docs => {
                setStockcodeList(docs)
            })
    }, [appCtx]);

    const selectStatement = useCallback((stockcode, period, statementtype) => {
        const getURL = appCtx.statement.getStatementURL
        const fetchURL = `${getURL}/${stockcode}/${period}/${statementtype}`

        fetch(fetchURL, {
            headers: {
                Accept: "application/json",
                Authorization: authorizationBearer
            }
        })
            .then(res => res.json())
            .then(doc => {
                setCurrentStatement(docToStatement(doc))
            })
    }, [appCtx])

    const deSelectStatement = useCallback(() => {
        setCurrentStatement(null)
    })

    const reloadCurrentStatement = useCallback(() => {
        selectStatement(
            currentStatement.stockcode,
            currentStatement.period,
            currentStatement.statementtype
        )
    }, [currentStatement])

    const fetchStatementList = useCallback((stockcode) => {
        const listURL = `${appCtx.statement.listStatementsURL}/${stockcode}`

        fetch(listURL.toString(), {
            headers: {
                Accept: "application/json",
                Authorization: authorizationBearer
            },
        })
            .then(result => result.json())
            .then(docs => {
                setStatementsList(statementsDocToList(docs))
                setCurrentStockCode(stockcode)
                deSelectStatement()
            })
    }, [])

    if (currentStatement) {
        return (
            <Container>
                <Row>
                    <Col><StatementStockCodeList isEditing={isEditing}
                                                 currentStockCode={currentStockCode}
                                                 stockcodeList={stockcodeList}
                                                 stockcodeSelect={fetchStatementList}/> </Col>
                    <Col><StatementForm editable={{isEditing, setIsEditing}}
                                        currentStatement={currentStatement}
                                        reloadCurrentStatement={reloadCurrentStatement}/></Col>
                </Row>
            </Container>)
    } else {
        return (
            <Container>
                <Row>
                    <Col><StatementStockCodeList isEditing={isEditing}
                                                 currentStockCode={currentStockCode}
                                                 stockcodeList={stockcodeList}
                                                 stockcodeSelect={fetchStatementList}/> </Col>
                    <Col><StatementTable statementsList={statementsList}
                                         selectStatement={selectStatement}/></Col>
                </Row>
            </Container>
        )
    }


}