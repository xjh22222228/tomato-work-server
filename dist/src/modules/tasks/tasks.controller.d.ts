import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { Task } from './entities/task.entity';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(user: any, createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(user: any, getTaskDto: GetTaskDto): Promise<Record<string, Task[]>>;
    findOne(user: any, id: string): Promise<Task>;
    update(user: any, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(user: any, id: string): Promise<void>;
}
