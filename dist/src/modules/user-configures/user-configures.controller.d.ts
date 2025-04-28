import { UserConfiguresService } from './user-configures.service';
import { UpdateUserConfigureDto } from './dto/update-user-configure.dto';
export declare class UserConfiguresController {
    private readonly userConfiguresService;
    constructor(userConfiguresService: UserConfiguresService);
    findOne(user: any): Promise<import("./entities/user-configure.entity").UserConfigure>;
    update(user: any, updateUserConfigureDto: UpdateUserConfigureDto): Promise<import("./entities/user-configure.entity").UserConfigure>;
}
