import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { GetReminderDto } from './dto/get-reminder.dto';
export declare class RemindersController {
    private readonly remindersService;
    constructor(remindersService: RemindersService);
    create(user: any, createReminderDto: CreateReminderDto): Promise<import("./entities/reminder.entity").Reminder>;
    findAll(user: any, getReminderDto: GetReminderDto): Promise<{
        rows: import("./entities/reminder.entity").Reminder[];
        count: number;
    }>;
    findOne(user: any, id: string): Promise<import("./entities/reminder.entity").Reminder>;
    update(user: any, updateReminderDto: UpdateReminderDto): Promise<import("./entities/reminder.entity").Reminder>;
    remove(user: any, id: string): Promise<void>;
}
