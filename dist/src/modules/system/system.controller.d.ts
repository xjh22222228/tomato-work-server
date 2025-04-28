import { SystemService } from './system.service';
export declare class SystemController {
    private readonly systemService;
    constructor(systemService: SystemService);
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
        cpus: import("os").CpuInfo[];
    }>;
}
