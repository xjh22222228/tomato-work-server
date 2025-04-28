import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { GetCompanyDto } from './dto/get-company.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    create(req: any, createCompanyDto: CreateCompanyDto): Promise<import("./entities/company.entity").Company>;
    findAll(req: any, getCompanyDto: GetCompanyDto): Promise<{
        rows: import("./entities/company.entity").Company[];
        count: number;
    }>;
    findOne(req: any, id: string): Promise<import("./entities/company.entity").Company>;
    update(req: any, updateCompanyDto: UpdateCompanyDto): Promise<import("./entities/company.entity").Company>;
    remove(req: any, id: string): Promise<void>;
}
