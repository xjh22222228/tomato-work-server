import { DateEntity } from '@/entities/date.entity';
export declare class BillType extends DateEntity {
    id: string;
    uid: number;
    sortIndex: number;
    name: string;
    type: number;
}
