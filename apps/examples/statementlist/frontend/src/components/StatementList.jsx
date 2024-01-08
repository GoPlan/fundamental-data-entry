import {useContext} from "react";
import {ListGroup} from "react-bootstrap";
import {StatementContext} from "./AppContext";

export default function StatementList() {

    const {currentStatement, setCurrentStatement} = useContext(StatementContext)

    const statements = [
        {
            stockcode: "PVT",
            statementtype: "Income",
            quarter: "2023Q4",
        },
        {
            stockcode: "BSR",
            statementtype: "Income",
            quarter: "2023Q4",
        },
        {
            stockcode: "HPG",
            statementtype: "Income",
            quarter: "2023Q4",
        },
    ]

    const stockClickHandle = (e) => {
        console.log(e.target.innerText)
        setCurrentStatement({
            stockcode: e.target.innerText,
            statementtype: "Income",
            quarter: "2023Q4"
        })

    }

    return (
        <ListGroup>
            {
                statements.map(item => (
                        <ListGroup.Item action
                                        onClick={stockClickHandle}
                                        key={item.stockcode}>{item.stockcode}</ListGroup.Item>
                    )
                )
            }
        </ListGroup>
    )
}