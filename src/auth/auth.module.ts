import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "./services/user.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "./auth.guard";

@Module({
	imports: [
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				global: true,
				secret: configService.get("JWT_SECRET"),
				signOptions: { expiresIn: "1d" },
			}),
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserService,
		{
			provide: "APP_GUARD",
			useClass: AuthGuard,
		},
	],
	exports: [UserService],
})
export class AuthModule {}
