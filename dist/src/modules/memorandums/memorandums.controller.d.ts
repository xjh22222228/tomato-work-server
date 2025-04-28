import { MemorandumsService } from './memorandums.service';
import { CreateMemorandumDto } from './dto/create-memorandum.dto';
import { UpdateMemorandumDto } from './dto/update-memorandum.dto';
import { GetMemorandumDto } from './dto/get-memorandum.dto';
export declare class MemorandumsController {
    private readonly memorandumsService;
    constructor(memorandumsService: MemorandumsService);
    create(user: any, createMemorandumDto: CreateMemorandumDto): Promise<import("./entities/memorandum.entity").Memorandum>;
    findAll(user: any, getMemorandumDto: GetMemorandumDto): Promise<{
        rows: import("./memorandums.service").MemorandumItem[];
        count: number;
    }>;
    findOne(user: any, id: string): Promise<import("./memorandums.service").MemorandumItem>;
    update(user: any, updateMemorandumDto: UpdateMemorandumDto): Promise<import("./entities/memorandum.entity").Memorandum>;
    remove(user: any, id: string): Promise<void>;
}
