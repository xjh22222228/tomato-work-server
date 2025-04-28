import { DateEntity } from '@/entities/date.entity';
export declare class Log extends DateEntity {
    id: string;
    uid: number;
    companyId: string;
    logType: number;
    doneContent: string;
    undoneContent: string;
    planContent: string;
    summaryContent: string;
}
