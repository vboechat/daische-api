import { PrismaService } from "../../../common/services/prisma.client.service";
import { RequestTaskDto } from "../dtos/request.task.dto";
import { TaskEntity } from "../entity/task.entity";
import { TaskRepositoryInterface } from "./task.repository.interface";
import { Injectable } from "@nestjs/common";
import { UserPayloadEntity } from "../../../modules/auth/types/payload.type";

@Injectable()
export class TaskRepository implements TaskRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(
    taskDto: RequestTaskDto,
    user: UserPayloadEntity
  ): Promise<TaskEntity> {
    const task = await this.prisma.tasks.create({
      data: {
        taskName: taskDto.taskName,
        ownerId: user.sub,
        startTime: taskDto.startTime,
        endTime: taskDto.endTime,
      },
    });

    return task;
  }

  async findAll(user: UserPayloadEntity): Promise<TaskEntity[]> {
    const tasks = await this.prisma.tasks.findMany({
      where: { ownerId: user.sub },
    });

    return tasks;
  }

  async findOne(id: number, user: UserPayloadEntity): Promise<TaskEntity> {
    const task = await this.prisma.tasks.findUnique({
      where: {
        id,
        ownerId: user.sub,
      },
    });

    return task;
  }

  async update(
    id: number,
    taskDto: RequestTaskDto,
    user: UserPayloadEntity
  ): Promise<TaskEntity> {
    const task = await this.prisma.tasks.update({
      where: {
        id,
        ownerId: user.sub,
      },
      data: {
        taskName: taskDto.taskName,
        startTime: taskDto.startTime,
        endTime: taskDto.endTime,
      },
    });

    return task;
  }

  async delete(id: number, user: UserPayloadEntity): Promise<void> {
    await this.prisma.tasks.delete({
      where: {
        id,
        ownerId: user.sub,
      },
    });

    return null;
  }
}
