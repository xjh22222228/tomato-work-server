import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    update(uid: number, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
}
