import { Module } from "@nestjs/common";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";
import { PrismaService } from "src/prisma.service";

@Module({
	controllers: [SettingsController],
	providers: [SettingsService, PrismaService],
})

export class SettingModule {}