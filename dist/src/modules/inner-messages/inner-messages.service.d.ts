import { Repository } from 'typeorm';
import { CreateInnerMessageDto } from './dto/create-inner-message.dto';
import { UpdateInnerMessageDto } from './dto/update-inner-message.dto';
import { InnerMessage } from './entities/inner-message.entity';
export declare class InnerMessagesService {
    private innerMessagesRepository;
    constructor(innerMessagesRepository: Repository<InnerMessage>);
    create(uid: number, createInnerMessageDto: CreateInnerMessageDto): Promise<InnerMessage>;
    findAll(uid: number): Promise<InnerMessage[]>;
    findUnread(uid: number): Promise<InnerMessage[]>;
    findOne(id: string, uid: number): Promise<InnerMessage>;
    update(id: string, uid: number, updateInnerMessageDto: UpdateInnerMessageDto): Promise<InnerMessage>;
    markAsRead(id: string, uid: number): Promise<InnerMessage>;
    remove(id: string, uid: number): Promise<void>;
}
