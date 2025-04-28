import { Repository } from 'typeorm';
import { CreateBillTypeDto } from './dto/create-bill-type.dto';
import { UpdateBillTypeDto } from './dto/update-bill-type.dto';
import { BillType } from './entities/bill-type.entity';
export declare class BillTypesService {
    private billTypeRepository;
    constructor(billTypeRepository: Repository<BillType>);
    create(uid: number, createBillTypeDto: CreateBillTypeDto): Promise<BillType>;
    findAll(uid: number): Promise<BillType[]>;
    findOne(uid: number, id: string): Promise<BillType>;
    findOneByName(uid: number, updateBillTypeDto: Partial<UpdateBillTypeDto>): Promise<BillType | null>;
    update(uid: number, updateBillTypeDto: UpdateBillTypeDto): Promise<void>;
    remove(uid: number, ids: string[]): Promise<void>;
}
