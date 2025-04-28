import { Repository, DataSource } from 'typeorm';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './entities/reminder.entity';
import { User } from '../users/entities/user.entity';
import { GetReminderDto } from './dto/get-reminder.dto';
interface NotificationItem {
    email: string;
    content: string;
    id: string;
    sckey?: string;
}
export declare class RemindersService {
    private remindersRepository;
    private usersRepository;
    private dataSource;
    constructor(remindersRepository: Repository<Reminder>, usersRepository: Repository<User>, dataSource: DataSource);
    create(uid: number, createReminderDto: CreateReminderDto): Promise<Reminder>;
    findAll(uid: number, getReminderDto: GetReminderDto): Promise<{
        rows: Reminder[];
        count: number;
    }>;
    findOne(id: string, uid: number): Promise<Reminder>;
    update(uid: number, updateReminderDto: UpdateReminderDto): Promise<Reminder>;
    remove(id: string, uid: number): Promise<void>;
    findAllNotSend(): Promise<NotificationItem[]>;
    updateTypeById(ids: string[], type: number): Promise<void>;
}
export {};
