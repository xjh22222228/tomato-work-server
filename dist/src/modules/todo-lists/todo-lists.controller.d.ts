import { TodoListsService } from './todo-lists.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { GetTodoListDto } from './dto/get-todo-list.dto';
export declare class TodoListsController {
    private readonly todoListsService;
    constructor(todoListsService: TodoListsService);
    create(user: any, createTodoListDto: CreateTodoListDto): Promise<import("./entities/todo-list.entity").TodoList>;
    findAll(user: any, getTodoListDto: GetTodoListDto): Promise<{
        rows: import("./entities/todo-list.entity").TodoList[];
        count: number;
    }>;
    findOne(user: any, id: string): Promise<import("./entities/todo-list.entity").TodoList>;
    update(user: any, updateTodoListDto: UpdateTodoListDto): Promise<import("./entities/todo-list.entity").TodoList>;
    remove(user: any, id: string): Promise<void>;
}
