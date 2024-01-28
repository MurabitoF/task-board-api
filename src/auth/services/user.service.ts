import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserDto } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string): Promise<UserEntity> {
		const user = await this.prisma.user.findUnique({ where: { id } });

		if (!user) throw new NotFoundException("User not found");

		return user;
	}

	async findByUsername(username: string): Promise<UserEntity> {
		const user = await this.prisma.user.findUnique({ where: { username } });

		if (!user) throw new NotFoundException("User not found");

		return user;
	}

	async create(createUserDto: UserDto): Promise<UserEntity> {
		const salt = await bcrypt.genSalt();
		const newUser = {
			...createUserDto,
			password: await bcrypt.hash(createUserDto.password, salt),
		};
		return this.prisma.user.create({ data: newUser });
	}
}
