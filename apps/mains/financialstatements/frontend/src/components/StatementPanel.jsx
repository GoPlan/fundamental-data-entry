import {useCallback, useContext, useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

import StatementStockCodeList from "./StatementStockCodeList";
import StatementForm from "./StatementForm";
import {AppContext} from "./AppContext";
import StatementPeriodList from "./StatementPeriodList";
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

function statementsListToPeriodsMap(statementsList) {

    // TODO: Potential performance issue
    //  This function potentially has performance issue
    //  since a doc is copied forEach statementsList item

    const periodsMap = {}

    statementsList.forEach(item => {
        const period = item.period
        const statementtype = item.statementtype
        const statementfields = item.statementfields

        periodsMap[period] = {...periodsMap[period]}
        periodsMap[period][statementtype] = statementfields
    })

    return periodsMap
}

export default function StatementPanel() {

    const appCtx = useContext(AppContext)
    const authorizationBearer = `Bearer ${appCtx.user.jwt.token.access_token}`

    const [stockcodeList, setStockcodeList] = useState([])
    const [currentStockCode, setCurrentStockCode] = useState(null)
    const [statementsList, setStatementsList] = useState([])
    // const [statement, setStatement] = useState(null)
    // const [statementToSelect, setStatementToSelect] = useState(null)
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

    // const reloadCurrentStatement = useCallback(() => {
    //     setStatementToSelect({
    //         stockcode: statement.stockcode,
    //         statementtype: statement.statementtype,
    //         quarter: statement.quarter
    //     })
    // }, [statement])

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
            })
    }, [])

    // if (statementToSelect) {
    //     const getURL = appCtx.statement.getURL
    //     const stockcode = statementToSelect.stockcode
    //     const statementtype = statementToSelect.statementtype
    //     const quarter = statementToSelect.quarter
    //
    //     const fetchURL = `${getURL}/${stockcode}/${statementtype}/${quarter}`
    //
    //     fetch(fetchURL, {
    //         headers: {
    //             Accept: "application/json",
    //             Authorization: authorizationBearer
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(doc => {
    //             setStatement(docToStatement(doc))
    //             setStatementToSelect(null)
    //         })
    // }

    return (
        <Container>
            <Row>
                <Col><StatementStockCodeList isEditing={isEditing}
                                             currentStockCode={currentStockCode}
                                             stockcodeList={stockcodeList}
                                             stockcodeSelect={fetchStatementList}/> </Col>
                <Col><StatementTable statementsList={statementsList}/></Col>
            </Row>
        </Container>
    )
}