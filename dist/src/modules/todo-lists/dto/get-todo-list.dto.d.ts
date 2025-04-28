import { PaginationDto } from '@/dtos/pagination.dto';
export declare class GetTodoListDto extends PaginationDto {
    startDate?: string;
    endDate?: string;
    status?: number;
}
