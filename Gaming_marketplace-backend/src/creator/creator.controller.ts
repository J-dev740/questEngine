/* eslint-disable import/no-extraneous-dependencies */
import { BadRequestException, Controller, DefaultValuePipe, Get, ParseIntPipe, Post } from "@nestjs/common";
import { Body, Patch, Query, UploadedFile, UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreatorService } from "./creator.service";
import { CreateQuestDto } from "./dtos/CreateQuestDto";
import { UpdateQuestRewardDto } from "./dtos/UpdateQuestRewardDto";
import { UpdateQuestDto } from "./dtos/UpdateQuestDto";

@Controller({ path: "creator", version: "1" })
export default class CreatorController {
	constructor(private creatorService: CreatorService) {}

	@Get("/run")
	getRunningStatus(): string {
		return "Running succsessfully !";
	}

	@Get("/all")
	getAllQuests(
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
		@Query("length", new DefaultValuePipe(40), ParseIntPipe) length: number,
	) {
		return this.creatorService.getAllQuests({ skip, length });
	}

	@Post("/create-quest")
	async createQuest(@Body() createQuestDto: CreateQuestDto) {
		return this.creatorService.createQuest(createQuestDto);
	}

	@Post("/upload-image")
	@UseInterceptors(FileInterceptor("file", { limits: { fileSize: 5000000 } })) // limit file size to 5MB
	async uploadImage(@UploadedFile() file): Promise<string> {
		if (!file.mimetype.startsWith("image/")) {
			throw new BadRequestException("Invalid file type");
		}
		return this.creatorService.uploadImage(file);
	}

	@Post("/update-quest-rewards")
	async updateQuestRewards(@Body() updateQuestRewardDto: UpdateQuestRewardDto) {
		return this.creatorService.updateQuestRewards(updateQuestRewardDto);
	}

	@Patch("/update-quest-status")
	async updateQuestStatus(
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
		@Query("length", new DefaultValuePipe(40), ParseIntPipe) length: number,
		@Body() updateQuestStatusDTO: UpdateQuestDto,
	) {
		return this.creatorService.updateQuestStatus(updateQuestStatusDTO, skip, length);
	}
}
