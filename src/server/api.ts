import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/task";
import { TasksController } from "../shared/tasks-controller";
import { createPostgresConnection } from "remult/postgres";
export const api = remultExpress({
    dataProvider: async () => {
        return createPostgresConnection(
            { connectionString: "postgres://postgres:MASTERKEY@localhost/postgres" ,
        })
    },
    entities: [Task],
    controllers: [TasksController],
    initApi: async remult => {
        const taskRepo = remult.repo(Task);
        if (await taskRepo.count() === 0) {
            await taskRepo.insert([
                { id: 1, title: "Setup", completed: true },
                { id: 2, title: "Entities", completed: false },
                { id: 3, title: "Paging, Sorting and Filtering", completed: false },
                { id: 4, title: "CRUD Operations", completed: false },
                { id: 5, title: "Validation", completed: false },
                { id: 6, title: "Backend methods", completed: false },
                { id: 7, title: "Database", completed: false },
                { id: 8, title: "Authentication and Authorization", completed: false },
                { id: 9, title: "Deployment", completed: false }
            ]);
        }
    }
});