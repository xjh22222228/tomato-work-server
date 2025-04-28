import { DateEntity } from '@/entities/date.entity';
export declare class Memorandum extends DateEntity {
    id: string;
    uid: number;
    sortIndex: number;
    title: string;
    markdown: string;
}
