import { DateEntity } from '@/entities/date.entity';
export declare class Reminder extends DateEntity {
    id: string;
    uid: number;
    content: string;
    date: BigInt;
    type: number;
}
