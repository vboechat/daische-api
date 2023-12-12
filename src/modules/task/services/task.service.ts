import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TaskServiceInterface } from "./task.service.interface";
import { TaskEntity } from "../entity/task.entity";
import { TaskRepositoryInterface } from "../repositories/task.repository.interface";
import { RequestTaskDto } from "../dtos/request.task.dto";
import { UserPayloadEntity } from "src/modules/auth/types/payload.type";

@Injectable()
export class TaskService implements TaskServiceInterface {
  constructor(
    @Inject("TaskRepositoryInterface")
    private readonly taskRepository: TaskRepositoryInterface
  ) {}

  async create(
    taskDto: RequestTaskDto,
    user: UserPayloadEntity
  ): Promise<TaskEntity> {
    const task = await this.taskRepository.create(taskDto, user);

    return task;
  }

  async findAll(user: UserPayloadEntity): Promise<TaskEntity[]> {
    const tasks = await this.taskRepository.findAll(user);

    return tasks;
  }

  async findOne(id: number, user: UserPayloadEntity): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne(id, user);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async update(
    id: number,
    taskDto: RequestTaskDto,
    user: UserPayloadEntity
  ): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne(id, user);

    if (!task) {
      throw new NotFoundException();
    }

    const updatedTask = await this.taskRepository.update(id, taskDto, user);

    return updatedTask;
  }

  async delete(id: number, user: UserPayloadEntity): Promise<void> {
    const task = await this.taskRepository.findOne(id, user);

    if (!task) {
      throw new NotFoundException();
    }

    await this.taskRepository.delete(id, user);
  }
}
