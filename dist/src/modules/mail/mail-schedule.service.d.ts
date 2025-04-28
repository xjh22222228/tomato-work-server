import { MailService } from './mail.service';
export declare class MailScheduleService {
    private mailService;
    private readonly logger;
    constructor(mailService: MailService);
    handleCron(): Promise<void>;
}
