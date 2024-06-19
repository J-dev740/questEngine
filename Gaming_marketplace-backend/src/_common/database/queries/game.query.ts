import { BadRequestException } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { Page } from "../../types.global";
import { CourseDocument } from "../schema/course.schema";
import { GameDocument, modelName } from "../schema/game.schema";
import { ILivestream } from "../schema/livestream.schema";
import { GenericQueryService } from "./_generic.query";

export default class GameQueryService extends GenericQueryService<GameDocument> {
	constructor(model: Model<GameDocument>) {
		super(model, modelName);
	}

	async paginateAllGames({ skip, length }: Page): Promise<GameDocument[]> {
		return this.model.aggregate([
			{
				$facet: {
					result: [
						{ $addFields: { coursesLen: { $size: "$courses" } } },
						{ $sort: { coursesLen: -1 } },
						{ $skip: skip },
						{ $limit: length },
					],
					totalCount: [{ $count: "count" }],
				},
			},
			{ $unwind: "$totalCount" },
		]);
	}

	async populateCourses(identifier: object, limit: number, sortBy: Record<string, -1 | 1>) {
		const courses = (await this.model.aggregate([
			{
				$lookup: {
					from: "courses",
					localField: "courses",
					foreignField: "_id",
					as: "courses",
				},
			},
			{ $unwind: "$courses" },
			{
				$project: {
					_id: "$courses._id",
					owner: "$courses.owner",
					title: "$courses.title",
					description: "$courses.description",
					price: "$courses.price",
				},
			},
			{ $sort: sortBy },
			{ $limit: limit },
		])) as CourseDocument[];
		return Promise.resolve(courses);
	}

	async getGameLivestreamsQuery(gameId: string): Promise<Array<ILivestream>> {
		if (await this.checkValidity({ _id: gameId })) {
			const livestreams = await this.model.aggregate([
				{ $match: { _id: new Types.ObjectId(gameId) } },
				{
					$lookup: {
						from: "livestreams",
						localField: "livestreams",
						foreignField: "_id",
						as: "livestreams",
					},
				},
				{ $addFields: { "livestreams._id": "$_id" } },
				{ $unwind: "$livestreams" },
				{ $replaceRoot: { newRoot: "$livestreams" } },
				{ $match: { streamStart: { $gte: new Date() } } },
				{ $sort: { streamStart: -1 } },
				{ $unset: "streamId" },
			]);
			return Promise.resolve(livestreams);
		}
		throw new BadRequestException(`${this.modelName} not found`);
	}
}
