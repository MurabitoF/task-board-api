import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserDto } from "../dto/user.dto";
import { UserService } from "./user.service";
import { SignInResponse } from "../dto/signInResponse.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async signIn(userDto: UserDto): Promise<SignInResponse> {
		const user = await this.userService.findByUsername(userDto.username);
		if (await !bcrypt.compare(user.password, userDto.password)) {
			throw new UnauthorizedException();
		}
		const payload = { username: user.username, sub: user.id };
		const token = this.jwtService.sign(payload);
		return { token, username: userDto.username };
	}
}
