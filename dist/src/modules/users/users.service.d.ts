import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(uid: number): Promise<User>;
    findByLoginName(loginName: string): Promise<User | null>;
    findByLoginNameAndPassword(loginName: string, password: string): Promise<User | null>;
    findByToken(token: string): Promise<User | null>;
    update(uid: number, updateUserDto: UpdateUserDto): Promise<User>;
}
