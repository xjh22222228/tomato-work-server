import { DateEntity } from '@/entities/date.entity';
export declare class Company extends DateEntity {
    id: string;
    uid: number;
    companyName: string;
    startDate: Date;
    endDate: Date;
    remark: string;
    amount: number;
    expectLeaveDate: Date;
}
