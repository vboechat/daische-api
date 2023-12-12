import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class RequestTaskDto {
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  startTime: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  endTime: number;
}
