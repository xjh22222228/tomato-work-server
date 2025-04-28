import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { GetTaskDto } from './dto/get-task.dto';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    create(uid: number, createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(uid: number, getTaskDto: GetTaskDto): Promise<Task[]>;
    findOne(id: string, uid: number): Promise<Task>;
    update(uid: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: string, uid: number): Promise<void>;
    updateBeforeToDay(): Promise<void>;
}
