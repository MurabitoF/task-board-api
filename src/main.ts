import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { PrismaClientExceptionFilter } from "./prisma/prisma-client-exception.filter";

async function bootstrap() {
	const PORT = process.env.PORT || 8080;
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix("api");

	const config = new DocumentBuilder()
		.setTitle("Task Board API")
		.setDescription("Documentation for usage of the REST API")
		.setVersion("1.0.0")
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("/api/docs", app, document);

	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);

	await app.listen(PORT);
}
bootstrap();
