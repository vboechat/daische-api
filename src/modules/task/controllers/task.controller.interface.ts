import { UserPayloadEntity } from "src/modules/auth/types/payload.type";
import { RequestTaskDto } from "../dtos/request.task.dto";
import { TaskEntity } from "../entity/task.entity";

export interface TaskControllerInterface {
  create(taskDto: RequestTaskDto, user: UserPayloadEntity): Promise<TaskEntity>;
  findAll(user: UserPayloadEntity): Promise<Array<TaskEntity>>;
  findOne(id: number, user: UserPayloadEntity): Promise<TaskEntity>;
  update(
    id: number,
    taskDto: RequestTaskDto,
    user: UserPayloadEntity
  ): Promise<TaskEntity>;
  delete(id: number, user: UserPayloadEntity): Promise<void>;
}
