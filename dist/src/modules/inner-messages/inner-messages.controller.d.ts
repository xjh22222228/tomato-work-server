import { InnerMessagesService } from './inner-messages.service';
import { CreateInnerMessageDto } from './dto/create-inner-message.dto';
import { UpdateInnerMessageDto } from './dto/update-inner-message.dto';
export declare class InnerMessagesController {
    private readonly innerMessagesService;
    constructor(innerMessagesService: InnerMessagesService);
    create(req: any, createInnerMessageDto: CreateInnerMessageDto): Promise<import("./entities/inner-message.entity").InnerMessage>;
    findAll(req: any): Promise<{
        rows: import("./entities/inner-message.entity").InnerMessage[];
    }>;
    findUnread(req: any): Promise<import("./entities/inner-message.entity").InnerMessage[]>;
    findOne(req: any, id: string): Promise<import("./entities/inner-message.entity").InnerMessage>;
    update(req: any, id: string, updateInnerMessageDto: UpdateInnerMessageDto): Promise<import("./entities/inner-message.entity").InnerMessage>;
    markAsRead(req: any, id: string): Promise<import("./entities/inner-message.entity").InnerMessage>;
    remove(req: any, id: string): Promise<void>;
}
