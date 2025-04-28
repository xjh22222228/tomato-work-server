import { PaginationDto } from '@/dtos/pagination.dto';
export declare class GetLogDto extends PaginationDto {
    id?: string;
    startDate?: string;
    endDate?: string;
    companyId?: string;
    logType?: number;
}
