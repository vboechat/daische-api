import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { TaskControllerInterface } from "./task.controller.interface";
import { ParseIdPipe } from "src/common/pipes/parse-id.pipe";
import { TaskEntity } from "../entity/task.entity";
import { RequestTaskDto } from "../dtos/request.task.dto";
import { TaskServiceInterface } from "../services/task.service.interface";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { UserPayloadEntity } from "src/modules/auth/types/payload.type";
import { User } from "src/modules/auth/decorators/user.decorator";

@UseGuards(AuthGuard)
@Controller("task")
export class TaskController implements TaskControllerInterface {
  constructor(
    @Inject("TaskServiceInterface")
    private readonly taskService: TaskServiceInterface
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() taskDto: RequestTaskDto,
    @User() user: UserPayloadEntity
  ): Promise<TaskEntity> {
    const task = await this.taskService.create(taskDto, user);

    return task;
  }

  @Get()
  async findAll(@User() user: UserPayloadEntity): Promise<Array<TaskEntity>> {
    const queryAllTasks = await this.taskService.findAll(user);

    return queryAllTasks;
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIdPipe) id: number,
    @User() user: UserPayloadEntity
  ): Promise<TaskEntity> {
    const task = await this.taskService.findOne(id, user);

    return task;
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIdPipe) id: number,
    @Body() taskDto: RequestTaskDto,
    @User() user: UserPayloadEntity
  ): Promise<TaskEntity> {
    const task = await this.taskService.update(id, taskDto, user);

    return task;
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param("id", ParseIdPipe) id: number,
    @User() user: UserPayloadEntity
  ): Promise<void> {
    await this.taskService.delete(id, user);
  }
}
