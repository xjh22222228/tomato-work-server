import { Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './entities/bill.entity';
import { BillType } from '../bill-types/entities/bill-type.entity';
import { GetBillDto } from './dto/get-bill.dto';
export interface SumPriceResponse {
    date: string;
    type: number;
    price: number;
    name: string;
}
export declare class BillsService {
    private billRepository;
    private billTypeRepository;
    constructor(billRepository: Repository<Bill>, billTypeRepository: Repository<BillType>);
    create(uid: number, createBillDto: CreateBillDto): Promise<Bill>;
    findAll(uid: number, getBillDto: GetBillDto): Promise<{
        rows: Bill[];
        count: number;
        consumptionAmount: number;
        incomeAmount: number;
        availableAmount: number;
    }>;
    findOne(uid: number, id: string): Promise<Bill>;
    update(uid: number, updateBillDto: UpdateBillDto): Promise<void>;
    remove(uid: number, id: string): Promise<void>;
    findSumPriceByDate(uid: number, getBillDto: GetBillDto): Promise<SumPriceResponse[]>;
    findAmountGroup(uid: number, getBillDto: GetBillDto): Promise<any[]>;
}
