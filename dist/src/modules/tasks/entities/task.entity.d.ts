import { DateEntity } from '@/entities/date.entity';
export declare const enum TaskType {
    PENDING = 1,
    IN_PROGRESS = 2,
    COMPLETED = 3,
    UNCOMPLETED = 4
}
export declare class Task extends DateEntity {
    id: string;
    uid: number;
    content: string;
    date: number;
    type: number;
    count: number;
}
