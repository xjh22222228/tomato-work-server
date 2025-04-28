import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { GetBillDto } from './dto/get-bill.dto';
export declare class BillsController {
    private readonly billsService;
    constructor(billsService: BillsService);
    create(uid: number, createBillDto: CreateBillDto): Promise<import("./entities/bill.entity").Bill>;
    findAll(uid: number, getBillDto: GetBillDto): Promise<{
        rows: import("./entities/bill.entity").Bill[];
        count: number;
        consumptionAmount: number;
        incomeAmount: number;
        availableAmount: number;
    }>;
    findOne(uid: number, id: string): Promise<import("./entities/bill.entity").Bill>;
    update(uid: number, updateBillDto: UpdateBillDto): Promise<void>;
    remove(uid: number, id: string): Promise<void>;
    sumAmount(uid: number, getBillDto: GetBillDto): Promise<{
        data: import("./bills.service").SumPriceResponse[];
    }>;
    amountGroup(uid: number, getBillDto: GetBillDto): Promise<any[]>;
}
