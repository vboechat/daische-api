import { Module } from "@nestjs/common";
import { TaskController } from "./controllers/task.controller";
import { TaskService } from "./services/task.service";
import { TaskRepository } from "./repositories/task.repository";
import { PrismaService } from "src/common/services/prisma.client.service";

@Module({
  controllers: [TaskController],
  providers: [
    {
      provide: "TaskServiceInterface",
      useClass: TaskService,
    },
    {
      provide: "TaskRepositoryInterface",
      useClass: TaskRepository,
    },
    PrismaService,
  ],
})
export class TaskModule {}
