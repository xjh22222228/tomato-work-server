import { ConfigService } from '@nestjs/config';
import { RemindersService } from '../reminders/reminders.service';
interface MailData {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    markdown?: string;
    sckey?: string;
}
export declare class MailService {
    private configService;
    private remindersService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService, remindersService: RemindersService);
    private initTransporter;
    wechatPush(data: MailData): Promise<void>;
    register(loginName: string): Promise<void>;
    send(data: MailData): Promise<any>;
    sendReminder(): Promise<void>;
}
export {};
