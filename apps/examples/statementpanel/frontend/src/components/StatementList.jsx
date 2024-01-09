import {useContext} from "react";
import {ListGroup} from "react-bootstrap";
import {StatementContext} from "./AppContext";

export default function StatementList({statementList, statement, setSelectstatement}) {

    const stockClickHandle = (e) => {
        const selected = statementList.find(el => el.stockcode === e.target.innerText)
        setSelectstatement(selected)
    }

    if (statementList) {
        return (
            <ListGroup>
                {
                    statementList.map(item => (
                            <ListGroup.Item action
                                            active={statement && item.stockcode === statement.stockcode ? statement : false}
                                            onClick={stockClickHandle}
                                            key={item.stockcode}>{item.stockcode}</ListGroup.Item>
                        )
                    )
                }
            </ListGroup>
        )
    } else {
        return <></>
    }
}