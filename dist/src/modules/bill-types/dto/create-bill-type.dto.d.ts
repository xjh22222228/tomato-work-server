export declare enum BillType {
    INCOME = 1,
    EXPENSE = 2
}
export declare class CreateBillTypeDto {
    name: string;
    type: number;
    sortIndex?: number;
}
