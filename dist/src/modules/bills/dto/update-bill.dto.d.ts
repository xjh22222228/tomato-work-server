import { CreateBillDto } from './create-bill.dto';
declare const UpdateBillDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBillDto>>;
export declare class UpdateBillDto extends UpdateBillDto_base {
    id: string;
}
export {};
