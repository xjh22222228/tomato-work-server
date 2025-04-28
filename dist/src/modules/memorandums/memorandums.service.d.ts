import { Repository } from 'typeorm';
import { CreateMemorandumDto } from './dto/create-memorandum.dto';
import { UpdateMemorandumDto } from './dto/update-memorandum.dto';
import { Memorandum } from './entities/memorandum.entity';
import { GetMemorandumDto } from './dto/get-memorandum.dto';
export interface MemorandumItem extends Memorandum {
    html: string;
}
export declare class MemorandumsService {
    private memorandumsRepository;
    constructor(memorandumsRepository: Repository<Memorandum>);
    create(uid: number, createMemorandumDto: CreateMemorandumDto): Promise<Memorandum>;
    findAll(uid: number, getMemorandumDto: GetMemorandumDto): Promise<{
        rows: MemorandumItem[];
        count: number;
    }>;
    findOne(id: string, uid: number): Promise<MemorandumItem>;
    update(uid: number, updateMemorandumDto: UpdateMemorandumDto): Promise<Memorandum>;
    remove(id: string, uid: number): Promise<void>;
}
