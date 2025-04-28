export declare function dateTransformer(format?: string): {
    readonly from: (value: any) => any;
    readonly to: (value: any) => any;
};
export declare function numberTransformer(): {
    readonly from: (value: any) => any;
    readonly to: (value: any) => any;
};
