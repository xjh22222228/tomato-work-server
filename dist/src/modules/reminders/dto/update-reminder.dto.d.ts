import { CreateReminderDto } from './create-reminder.dto';
declare const UpdateReminderDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReminderDto>>;
export declare class UpdateReminderDto extends UpdateReminderDto_base {
    id: string;
}
export {};
