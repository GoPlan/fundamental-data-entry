import Form from 'react-bootstrap/Form'
import StatementField from "./StatementField";

export default function IncomeForm() {
    // const [Revenue, setRevenue] = useState();
    // const [RevenueDeduction, setRevenueDeduction] = useState();
    // const [NetRevenue, setNetRevenue] = useState();
    // const [COGS, setCOGS] = useState();
    // const [GrossProfit, setGrossProfit] = useState();
    // const [FinancialIncome, setFinancialIncome] = useState();
    // const [FinancialExpense, setFinancialExpense] = useState();
    // const [InterestExpense, setInterestExpense] = useState();
    // const [AssociateAndJointVenture, setAssociateAndJointVenture] = useState();
    // const [SellingExpense, setSellingExpense] = useState();
    // const [GeneralAndAdministrativeExpense, setGeneralAndAdministrativeExpense] = useState();
    // const [OperatingProfit, setOperatingProfit] = useState();
    // const [OtherIncome, setOtherIncome] = useState();
    // const [OtherExpense, setOtherExpense] = useState();
    // const [OtherProfit, setOtherProfit] = useState();
    // const [ProfitBeforeTax, setProfitBeforeTax] = useState();
    // const [CurrentTaxExpense, setCurrentTaxExpense] = useState();
    // const [DeferredTaxExpense, setDeferredTaxExpense] = useState();
    // const [ProfitAfterTax, setProfitAfterTax] = useState();
    // const [ProfitAfterTaxForMinorityInterest, setProfitAfterTaxForMinorityInterest] = useState();
    // const [ProfitAfterTaxForShareholdersOfParentCompany, setProfitAfterTaxForShareholdersOfParentCompany] = useState();


    return (
        <Form>
            <StatementField fieldname="Revenue"/>
            <StatementField fieldname="RevenueDeduction"/>
            <StatementField fieldname="NetRevenue"/>
        </Form>
    )
}