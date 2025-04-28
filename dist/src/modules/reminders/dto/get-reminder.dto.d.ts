import { PaginationDto } from '@/dtos/pagination.dto';
export declare class GetReminderDto extends PaginationDto {
    startDate?: string;
    endDate?: string;
    type?: number;
}
