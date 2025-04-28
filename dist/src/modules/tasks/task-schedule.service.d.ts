import { TasksService } from './tasks.service';
export declare class TaskScheduleService {
    private tasksService;
    private readonly logger;
    constructor(tasksService: TasksService);
    handleCron(): Promise<void>;
}
