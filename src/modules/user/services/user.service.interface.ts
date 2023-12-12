import { RequestUserDto } from "../dtos/request.user.dto";
import { UserEntity } from "../entity/user.entity";

export interface UserServiceInterface {
  create(userDto: RequestUserDto): Promise<UserEntity>;
  findOne(email: string): Promise<UserEntity>;
}
