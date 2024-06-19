import { BadRequestException } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { LivestreamDocument, modelName as livestreamModelName } from "../schema/livestream.schema";
import { GenericQueryService } from "./_generic.query";

export default class LivestreamQueryService extends GenericQueryService<LivestreamDocument> {
	constructor(model: Model<LivestreamDocument>) {
		super(model, livestreamModelName);
	}

	async getSpecificLivestreamQuery(livestreamId: string): Promise<LivestreamDocument> {
		if (await this.checkValidity({ _id: new Types.ObjectId(livestreamId) })) {
			const livestream = await this.model.aggregate([
				{ $match: { _id: new Types.ObjectId(livestreamId) } },

				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner",
					},
				},

				{
					$lookup: {
						from: "games",
						localField: "game",
						foreignField: "_id",
						as: "game",
					},
				},
				{
					$project: {
						"game.users": 0,
						"game.courses": 0,
						"game.livestreams": 0,
					},
				},

				{
					$lookup: {
						from: "currencies",
						localField: "currency",
						foreignField: "_id",
						as: "currency",
					},
				},
				{ $unwind: "$currency" },

				{
					$group: {
						_id: "$_id",
						title: { $first: "$title" },
						owner: { $first: "$owner" },
						game: { $first: "$game" },
						description: { $first: "$description" },
						price: { $first: "$price" },
						currency: { $first: "$currency" },
					},
				},
				{
					$project: {
						_id: 1,
						title: 1,
						owner: { $arrayElemAt: ["$owner", 0] },
						game: { $arrayElemAt: ["$game", 0] },
						description: 1,
						price: 1,
						currency: 1,
					},
				},
			]);

			return Promise.resolve(livestream[0]);
		}
		throw new BadRequestException(`${this.modelName} not found`);
	}

	async upcomingLivestreamQuery(): Promise<LivestreamDocument[]> {
		return this.model.aggregate([
			{ $match: { streamStart: { $gte: new Date() } } },
			{ $lookup: { from: "users", localField: "owner", foreignField: "_id", as: "owner" } },
			{ $unwind: "$owner" },
			{ $lookup: { from: "games", localField: "game", foreignField: "_id", as: "game" } },
			{ $unwind: "$game" },
			{
				$project: {
					"owner.username": 1,
					"owner._id": 1,
					"game.title": 1,
					"game._id": 1,
					icon: 1,
					streamStart: 1,
					streamEnd: 1,
				},
			},
		]);
	}

	async ongoingLivestreamQuery(): Promise<LivestreamDocument[]> {
		return this.model.aggregate([
			{
				$match: {
					$and: [{ streamEnd: { $gt: new Date() }, streamStart: { $lte: new Date() } }],
				},
			},
			{ $lookup: { from: "users", localField: "owner", foreignField: "_id", as: "owner" } },
			{ $unwind: "$owner" },
			{ $lookup: { from: "games", localField: "game", foreignField: "_id", as: "game" } },
			{ $unwind: "$game" },
			{
				$project: {
					"owner.username": 1,
					"owner._id": 1,
					"game.title": 1,
					"game._id": 1,
					icon: 1,
					streamStart: 1,
					streamEnd: 1,
				},
			},
		]);
	}
}
