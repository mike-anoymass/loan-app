export const COLUMNS = [
    {
      Header: "Loan ID",
      Footer: "Loan ID",
      accessor: "id",
    },
    {
      Header: "Loan Percentage",
      Footer: "Loan Percentage",
      accessor: "termId",
    },
    {
      Header: "Reason for Loan",
      Footer: "Reason for Loan",
      accessor: "loanFor",
    },
    {
      Header: "Loan Amount",
      Footer: "Loan Amount",
      accessor: "amount",
      Cell: ( ({value}) => value.toLocaleString('en-MW', { style: 'currency', currency: 'MWK' })),
      disableFilters: true
    },
    {
      Header: "Pay Back Amount",
      Footer: "Pay Back Amount",
      accessor: "paybackAmount",
      Cell: ( ({value}) => value.toLocaleString('en-MW', { style: 'currency', currency: 'MWK' })),
      disableFilters: true
    }
]



export const GROUPED_COLUMNS = [
    {
        Header: "Basic Information",
        Footer: "Basic Info",
        columns: [
            {
                Header: "Loan Percentage",
                Footer: "Loan Percentage",
                accessor: "termId"
            },
            {
                Header: "Reason for Loan",
                Footer: "Reason for Loan",
                accessor: "loanFor"
            },     
        ]

    },
     {
        Header: "Money Information",
        Footer: "Money Infor",
        columns: [
            {
            Header: "Loan Amount",
            Footer: "Loan Amount",
            accessor: "amount"
            },
            {
            Header: "Pay Back Amount",
            Footer: "Pay Back Amount",
            accessor: "paybackAmount"
            }
        ]

    }
]