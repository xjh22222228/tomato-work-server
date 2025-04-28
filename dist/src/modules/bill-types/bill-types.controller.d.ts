import { BillTypesService } from './bill-types.service';
import { CreateBillTypeDto } from './dto/create-bill-type.dto';
import { UpdateBillTypeDto } from './dto/update-bill-type.dto';
export declare class BillTypesController {
    private readonly billTypesService;
    constructor(billTypesService: BillTypesService);
    create(uid: number, createBillTypeDto: CreateBillTypeDto): Promise<import("./entities/bill-type.entity").BillType>;
    findAll(uid: number): Promise<import("./entities/bill-type.entity").BillType[]>;
    findOne(uid: number, id: string): Promise<import("./entities/bill-type.entity").BillType>;
    update(uid: number, updateBillTypeDto: UpdateBillTypeDto): Promise<{
        msg: string;
    }>;
    remove(uid: number, ids: string[]): Promise<void>;
}
