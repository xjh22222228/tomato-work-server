import { CreateTodoListDto } from './create-todo-list.dto';
declare const UpdateTodoListDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTodoListDto>>;
export declare class UpdateTodoListDto extends UpdateTodoListDto_base {
    id: string;
}
export {};
