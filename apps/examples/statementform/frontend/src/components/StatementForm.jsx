import Form from 'react-bootstrap/Form'
import StatementField from "./StatementField";

export default function StatementForm() {

    const username = "user00"
    const stockcode = "PVT"
    const statementtype = "Income"
    const quarter = "2023Q4"

    const fields = [
        // "Revenue",
        // "RevenueDeduction",
        "NetRevenue",
        "COGS",
        "GrossProfit",
        // "FinancialIncome",
        // "FinancialExpense",
        // "InterestExpense",
        // "AssociateAndJointVenture",
        // "SellingExpense",
        // "GeneralAndAdministrativeExpense",
        // "OperatingProfit",
        // "OtherIncome",
        // "OtherExpense",
        // "OtherProfit",
        // "ProfitBeforeTax",
        // "CurrentTaxExpense",
        // "DeferredTaxExpense",
        // "ProfitAfterTax",
        // "ProfitAfterTaxForMinorityInterest",
        // "ProfitAfterTaxForShareholdersOfParentCompany"
    ]

    return (
        <Form>
            {
                fields.map(fieldname => <StatementField key={fieldname}
                                                        username={username}
                                                        stockcode={stockcode}
                                                        statementtype={statementtype}
                                                        quarter={quarter}
                                                        fieldname={fieldname}/>)
            }

        </Form>
    )
}