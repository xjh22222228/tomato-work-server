import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { GetLogDto } from './dto/get-log.dto';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    create(user: any, createLogDto: CreateLogDto): Promise<import("./entities/log.entity").Log>;
    findAll(user: any, getLogDto: GetLogDto): Promise<{
        rows: import("./logs.service").LogItem[];
        count: number;
    }>;
    findOne(user: any, getLogDto: GetLogDto): Promise<import("./entities/log.entity").Log>;
    update(user: any, updateLogDto: UpdateLogDto): Promise<import("./entities/log.entity").Log>;
    remove(user: any, id: string): Promise<void>;
}
