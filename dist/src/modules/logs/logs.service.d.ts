import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './entities/log.entity';
import { GetLogDto } from './dto/get-log.dto';
import { Company } from '../company/entities/company.entity';
export interface LogItem extends Log {
    companyName: string;
}
export declare class LogsService {
    private logsRepository;
    private companyRepository;
    constructor(logsRepository: Repository<Log>, companyRepository: Repository<Company>);
    create(uid: number, createLogDto: CreateLogDto): Promise<Log>;
    findAll(uid: number, getLogDto: GetLogDto): Promise<{
        rows: LogItem[];
        count: number;
    }>;
    findOne(getLogDto: GetLogDto, uid: number): Promise<Log>;
    update(uid: number, updateLogDto: UpdateLogDto): Promise<Log>;
    remove(id: string, uid: number): Promise<void>;
}
