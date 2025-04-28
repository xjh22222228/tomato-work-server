import { Response } from 'express';
import { CommonService } from './common.service';
import { BillsService } from '../bills/bills.service';
import { TasksService } from '../tasks/tasks.service';
import { TodoListsService } from '../todo-lists/todo-lists.service';
import { RemindersService } from '../reminders/reminders.service';
export declare class CommonController {
    private readonly commonService;
    private readonly billsService;
    private readonly tasksService;
    private readonly todoListsService;
    private readonly remindersService;
    constructor(commonService: CommonService, billsService: BillsService, tasksService: TasksService, todoListsService: TodoListsService, remindersService: RemindersService);
    getIndex(): string;
    getCaptcha(code: string | undefined, res: Response): void;
    getPanelData(user: any): Promise<{
        consumption: number | undefined;
        todayTaskCount: number;
        unfinishedTodoListCount: number;
        reminderCount: number;
    }>;
}
