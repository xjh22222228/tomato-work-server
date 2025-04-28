import { DateEntity } from '@/entities/date.entity';
export declare class UserConfigure extends DateEntity {
    id: string;
    uid: number;
    isTaskNotify: boolean;
    isMatterNotify: boolean;
    serverChanSckey: string;
}
