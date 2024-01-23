import {useCallback, useContext, useEffect, useState} from "react";
import StockCodeList from "./StockCodeList";
import {AppContext} from "./AppContext";
import StockStatementsView from "./StockStatementsView.jsx";

function statementsDocToList(docs) {
    return docs
}

export default function StockPanel() {

    const appCtx = useContext(AppContext)
    const authorizationBearer = `Bearer ${appCtx.user.jwt.token.access_token}`

    const [stockcodeList, setStockcodeList] = useState([])
    const [currentStockCode, setCurrentStockCode] = useState(null)
    const [statementsList, setStatementsList] = useState([])
    // const [currentStatement, setCurrentStatement] = useState(null)
    // const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const listURL = appCtx.statement.listStockCodesURL

        fetch(listURL, {
            method: "GET",
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

    const selectStockCode = useCallback((stockcode) => {
        const listURL = `${appCtx.statement.listStatementsURL}/${stockcode}`

        fetch(listURL.toString(), {
            method: "GET",
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

    const deSelectStockCode = useCallback(() => {
        setCurrentStockCode(null)
        setStatementsList(null)
    })

    if (currentStockCode) {
        return (
            <StockStatementsView statementsList={statementsList} goBack={deSelectStockCode}/>
        )
    } else {
        return (
            <StockCodeList stockcodeList={stockcodeList} selectStockCode={selectStockCode}/>
        )
    }
}