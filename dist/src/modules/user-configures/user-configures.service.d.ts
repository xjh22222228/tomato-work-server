import { Repository } from 'typeorm';
import { UpdateUserConfigureDto } from './dto/update-user-configure.dto';
import { UserConfigure } from './entities/user-configure.entity';
export declare class UserConfiguresService {
    private userConfiguresRepository;
    constructor(userConfiguresRepository: Repository<UserConfigure>);
    findOrCreate(uid: number): Promise<UserConfigure>;
    update(uid: number, updateUserConfigureDto: UpdateUserConfigureDto): Promise<UserConfigure>;
}
