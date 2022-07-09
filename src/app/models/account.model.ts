export interface accountOperation {
    id:            number;
    amount:        number;
    description:   string;
    operationType: string;
    date:          Date;
}

export interface AccountDetails {
    accountId:            number;
    balance:              number;
    accountOperationDTOS: accountOperation[];
}