import Table from 'react-bootstrap/Table';
export default function StatementTable({statementsList}) {

    return (
        <Table bordered hover>
            <thead>
            <tr>
                <th>Stock</th>
                <th>Period</th>
                <th>Statement</th>
            </tr>
            </thead>
            <tbody>
            {
                statementsList.map(item => {
                    return (
                        <tr>
                            <td>{item.stockcode}</td>
                            <td>{item.period}</td>
                            <td>{item.statementtype}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    )
}