import { PaginationDto } from '@/dtos/pagination.dto';
export declare class GetBillDto extends PaginationDto {
    startDate?: string;
    endDate?: string;
    typeId?: string;
    type?: number;
    keyword?: string;
    sort?: string;
}
