import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { GetCompanyDto } from './dto/get-company.dto';
import { LogsService } from '../logs/logs.service';
export declare class CompanyService {
    private companyRepository;
    private readonly logsService;
    constructor(companyRepository: Repository<Company>, logsService: LogsService);
    create(uid: number, createCompanyDto: CreateCompanyDto): Promise<Company>;
    findAll(uid: number, getCompanyDto: GetCompanyDto): Promise<{
        rows: Company[];
        count: number;
    }>;
    findOne(id: string, uid: number): Promise<Company>;
    findByIds(ids: string[]): Promise<Company[]>;
    update(uid: number, updateCompanyDto: UpdateCompanyDto): Promise<Company>;
    remove(id: string, uid: number): Promise<void>;
}
