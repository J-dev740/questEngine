import { BadRequestException } from "@nestjs/common";
import { Model, PipelineStage, Types } from "mongoose";
import { CourseDocument } from "../schema/course.schema";
import { GameDocument } from "../schema/game.schema";
import { modelName, ReviewDocument } from "../schema/review.schema";
import { UserDocument } from "../schema/user.schema";
import { GenericQueryService } from "./_generic.query";

export default class ReviewQueryService extends GenericQueryService<ReviewDocument> {
	constructor(model: Model<ReviewDocument>) {
		super(model, modelName);
	}

	protectInfo = (fields: string[] = []): PipelineStage.Unset => ({
		$unset: ["purchasedLivestreams", "purchasedCourses", "stream", ...fields],
	});

	async discoverUsers(limit: number, sortBy: Record<string, -1 | 1>): Promise<UserDocument[]> {
		const users = (await this.model.aggregate([
			{
				$lookup: {
					from: "courses",
					localField: "course",
					foreignField: "_id",
					as: "course",
				},
			},
			{ $unwind: "$course" },
			{
				$group: {
					_id: {
						course: "$course._id",
						owner: "$course.owner",
					},
					avg_rating: { $avg: "$rating" },
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "_id.owner",
					foreignField: "_id",
					as: "owner",
					pipeline: [
						{
							$lookup: {
								from: "courses",
								as: "courses",
								localField: "courses",
								foreignField: "_id",
								pipeline: [{ $project: { _id: 1, title: 1 } }],
							},
						},
						this.protectInfo(),
					],
				},
			},
			{ $unwind: "$owner" },
			{
				$project: {
					_id: 0,
					owner: 1,
					rating: { $trunc: ["$avg_rating", 3] },
				},
			},
			{ $sort: sortBy },
			{ $limit: limit },
		])) as UserDocument[];
		return Promise.resolve(users);
	}

	async discoverCourses(
		limit: number,
		sortBy: Record<string, -1 | 1>,
	): Promise<CourseDocument[]> {
		const courses = (await this.model.aggregate([
			{
				$lookup: {
					from: "courses",
					localField: "course",
					foreignField: "_id",
					as: "course",
				},
			},
			{ $unwind: "$course" },
			{ $group: { _id: "$course._id", rating: { $avg: "$rating" } } },
			{
				$project: {
					_id: 0,
					course: "$_id",
					rating: { $trunc: ["$rating", 3] },
				},
			},
			{
				$lookup: {
					from: "courses",
					localField: "course",
					foreignField: "_id",
					as: "course",
				},
			},
			{ $unwind: "$course" },
			{ $sort: sortBy },
			{ $limit: limit },
		])) as CourseDocument[];
		return Promise.resolve(courses);
	}

	async discoverGames(limit: number, sortBy: Record<string, -1 | 1>): Promise<GameDocument[]> {
		const games = (await this.model.aggregate([
			{
				$lookup: {
					from: "games",
					localField: "game",
					foreignField: "_id",
					as: "game",
				},
			},
			{ $unwind: "$game" },
			{ $project: { _id: "$game._id", rating: 1 } },
			{ $group: { _id: "$_id", avg: { $avg: "$rating" } } },
			{
				$lookup: {
					from: "games",
					localField: "_id",
					foreignField: "_id",
					as: "data",
				},
			},
			{ $unwind: "$data" },
			{
				$project: {
					data: { courses: 1 },
					rating: { $trunc: ["$avg", 3] },
				},
			},
			{
				$lookup: {
					from: "courses",
					localField: "data.courses",
					foreignField: "_id",
					as: "data",
				},
			},
			{ $project: { "data.users": 1, rating: 1 } },
			{ $unwind: "$data" },
			{ $unwind: "$data.users" },
			{
				$group: {
					_id: {
						gameId: "$_id",
						rating: "$rating",
					},
					users: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: "$_id.gameId",
					rating: "$_id.rating",
					data: { users: "$users" },
				},
			},
			{ $sort: sortBy },
			{ $limit: limit },
		])) as GameDocument[];
		return Promise.resolve(games);
	}

	async getReviewsQuery(
		reviewModelName: string,
		modelId: string,
		limit: number,
		sortBy: Record<string, -1 | 1>,
	): Promise<ReviewDocument[]> {
		if (await this.checkValidity({ [reviewModelName]: modelId })) {
			const reviews = await this.model.aggregate([
				{ $match: { [reviewModelName]: new Types.ObjectId(modelId) } },
				{
					$lookup: {
						from: "users",
						localField: "user",
						foreignField: "_id",
						as: "user",
					},
				},
				{
					$lookup: {
						from: "courses",
						localField: "course",
						foreignField: "_id",
						as: "course",
					},
				},
				{
					$lookup: {
						from: "livestreams",
						localField: "livestreams",
						foreignField: "_id",
						as: "livestream",
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

				{ $sort: sortBy },
				{ $limit: limit },
			]);

			return Promise.resolve(reviews);
		}

		throw new BadRequestException(`${this.modelName} not found`);
	}
}
