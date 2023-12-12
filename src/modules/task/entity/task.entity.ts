export class TaskEntity {
  id: number;
  taskName: string;
  ownerId: number;
  startTime: number;
  endTime: number;
  createdAt: Date;
  updatedAt: Date;
}
