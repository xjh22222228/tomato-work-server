import { BillType } from '../../bill-types/entities/bill-type.entity';
import { DateEntity } from '@/entities/date.entity';
export declare class Bill extends DateEntity {
    id: string;
    uid: number;
    price: number;
    date: number;
    typeId: string;
    remark: string;
    imgs: string;
    billType: BillType;
}
