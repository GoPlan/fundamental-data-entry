import Form from 'react-bootstrap/Form'
import StatementField from "./StatementField";
import {StatementContext} from "./AppContext";
import {useContext} from "react";

const StatementFormStructure = {
    Income: [
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
    ],
    Balance: [],
    Cashflow: []
}

export default function StatementForm() {

    const statementCtx = useContext(StatementContext)
    const fields = StatementFormStructure[statementCtx.currentStatement.statementtype]

    // console.log(statementCtx.currentStatement)

    return (
        <Form>
            {
                fields.map(fieldname => <StatementField key={fieldname} fieldname={fieldname}/>)
            }
        </Form>
    )
}