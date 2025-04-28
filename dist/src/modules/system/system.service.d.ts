import { DataSource } from 'typeorm';
import * as os from 'os';
export declare class SystemService {
    private dataSource;
    constructor(dataSource: DataSource);
    getSystemInfo(): Promise<{
        mysqlVersion: any;
        currentSystemTime: number;
        freemem: number;
        totalmem: number;
        platform: NodeJS.Platform;
        type: string;
        hostname: string;
        arch: string;
        nodeVersion: string;
        cpus: os.CpuInfo[];
    }>;
}
