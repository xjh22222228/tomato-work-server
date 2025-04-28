"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./modules/users/users.module");
const bills_module_1 = require("./modules/bills/bills.module");
const bill_types_module_1 = require("./modules/bill-types/bill-types.module");
const tasks_module_1 = require("./modules/tasks/tasks.module");
const todo_lists_module_1 = require("./modules/todo-lists/todo-lists.module");
const reminders_module_1 = require("./modules/reminders/reminders.module");
const memorandums_module_1 = require("./modules/memorandums/memorandums.module");
const inner_messages_module_1 = require("./modules/inner-messages/inner-messages.module");
const logs_module_1 = require("./modules/logs/logs.module");
const company_module_1 = require("./modules/company/company.module");
const auth_module_1 = require("./modules/auth/auth.module");
const user_configures_module_1 = require("./modules/user-configures/user-configures.module");
const mail_module_1 = require("./modules/mail/mail.module");
const guards_module_1 = require("./guards/guards.module");
const common_module_1 = require("./modules/common/common.module");
const global_modules_module_1 = require("./global-modules/global-modules.module");
const system_module_1 = require("./modules/system/system.module");
const path = require("path");
function getEnvFilePath() {
    const env = process.env.NODE_ENV;
    if (env === 'production') {
        return path.resolve('.env.production');
    }
    else if (env === 'development') {
        return path.resolve('.env.development');
    }
    else {
        return path.resolve('.env.local');
    }
}
console.log(getEnvFilePath());
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: getEnvFilePath(),
            }),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return {
                        type: 'mysql',
                        host: configService.get('DB_HOST'),
                        port: Number(configService.get('DB_PORT')),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_DATABASE'),
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
                        logging: ['query', 'error'],
                        timezone: '+08:00',
                    };
                },
            }),
            global_modules_module_1.GlobalModulesModule,
            users_module_1.UsersModule,
            bills_module_1.BillsModule,
            bill_types_module_1.BillTypesModule,
            tasks_module_1.TasksModule,
            todo_lists_module_1.TodoListsModule,
            reminders_module_1.RemindersModule,
            memorandums_module_1.MemorandumsModule,
            inner_messages_module_1.InnerMessagesModule,
            logs_module_1.LogsModule,
            company_module_1.CompanyModule,
            auth_module_1.AuthModule,
            user_configures_module_1.UserConfiguresModule,
            mail_module_1.MailModule,
            guards_module_1.GuardsModule,
            common_module_1.CommonModule,
            system_module_1.SystemModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map