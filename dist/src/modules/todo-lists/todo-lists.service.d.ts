import { Repository } from 'typeorm';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { TodoList } from './entities/todo-list.entity';
import { GetTodoListDto } from './dto/get-todo-list.dto';
export declare class TodoListsService {
    private todoListsRepository;
    constructor(todoListsRepository: Repository<TodoList>);
    create(uid: number, createTodoListDto: CreateTodoListDto): Promise<TodoList>;
    findAll(uid: number, getTodoListDto: GetTodoListDto): Promise<{
        rows: TodoList[];
        count: number;
    }>;
    findOne(id: string, uid: number): Promise<TodoList>;
    update(uid: number, updateTodoListDto: UpdateTodoListDto): Promise<TodoList>;
    remove(id: string, uid: number): Promise<void>;
}
