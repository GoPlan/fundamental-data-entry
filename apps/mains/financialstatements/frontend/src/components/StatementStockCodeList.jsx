import {ListGroup} from "react-bootstrap";

// function stockcodeListToMap(stockcodeList) {
//
//     const stockcodeMap = new Map()
//
//     if (stockcodeList) {
//         stockcodeList.forEach(el => {
//             stockcodeMap.set(el.stockcode, el)
//         })
//     }
//
//     return stockcodeMap
// }

export default function StatementStockCodeList({isEditing, currentStockCode, stockcodeList, stockcodeSelect}) {

    const stockClickHandle = (e) => {
        stockcodeSelect(e.target.innerText)
    }

    return (
        <ListGroup>
            {
                stockcodeList.map(stockcode => (
                        <ListGroup.Item action
                                        disabled={isEditing}
                                        active={stockcode === currentStockCode}
                                        onClick={stockClickHandle}
                                        key={stockcode}>{stockcode}</ListGroup.Item>
                    )
                )
            }
        </ListGroup>
    )
}