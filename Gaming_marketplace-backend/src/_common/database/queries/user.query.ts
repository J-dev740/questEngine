import { BadRequestException } from "@nestjs/common";
import { Model, PipelineStage, Types } from "mongoose";
import { AUTH_ROLES, Page } from "../../types.global";
import { CourseDocument, ICourse } from "../schema/course.schema";
import { ILivestream, LivestreamDocument } from "../schema/livestream.schema";
import { UserDocument, modelName } from "../schema/user.schema";
import { GenericQueryService } from "./_generic.query";

export default class UserQueryService extends GenericQueryService<UserDocument> {
	constructor(model: Model<UserDocument>) {
		super(model, modelName);
	}

	protectInfo = (fields: string[] = []): PipelineStage.Unset => ({
		$unset: ["purchasedLivestreams", "purchasedCourses", "stream", ...fields],
	});

	async createEntity(data: any): Promise<UserDocument> {
		if ("walletAddress" in data) {
			const { walletAddress } = data;
			if (await this.checkValidity({ walletAddress }))
				throw new BadRequestException(`${this.modelName} already exists`);
		}

		return super.createEntity(data);
	}

	async paginateAllExperts({ skip, length }: Page): Promise<UserDocument[]> {
		return this.model.aggregate([
			{ $match: { role: AUTH_ROLES.expert } },
			{
				$facet: {
					result: [
						{ $addFields: { coursesLen: { $size: "$courses" } } },
						{ $sort: { coursesLen: 1 } },
						{ $skip: skip },
						{ $limit: length },
						this.protectInfo(["coursesLen"]),
					],
					totalCount: [{ $count: "count" }],
				},
			},
			{ $unwind: "$totalCount" },
		]);
	}

	async getPurchasedCoursesQuery(userId: string): Promise<Array<ICourse>> {
		if (await this.checkValidity({ _id: new Types.ObjectId(userId) })) {
			const purchasedCourses = await this.model.aggregate([
				{ $match: { _id: new Types.ObjectId(userId) } },
				{
					$project: {
						_id: 0,
						username: 1,
						purchasedCourses: 1,
					},
				},
				{
					$lookup: {
						from: "courses",
						localField: "purchasedCourses",
						foreignField: "_id",
						as: "purchasedCourses",
					},
				},
				{
					$addFields: {
						_id: "$purchasedCourses._id",
						"purchasedCourses.username": "$username",
					},
				},
				{ $unwind: "$purchasedCourses" },
				{ $replaceRoot: { newRoot: "$purchasedCourses" } },
				{
					$lookup: {
						from: "videos",
						localField: "videos",
						foreignField: "_id",
						as: "videos",
					},
				},
			]);
			return Promise.resolve(purchasedCourses);
		}
		throw new BadRequestException(`${this.modelName} not found`);
	}

	async getExpertCoursesQuery(userId: string): Promise<CourseDocument[]> {
		if (await this.checkValidity({ _id: new Types.ObjectId(userId) })) {
			const courses = await this.model.aggregate([
				{ $match: { _id: new Types.ObjectId(userId) } },
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
					$addFields: {
						_id: "$courses._id",
						"courses.username": "$username",
					},
				},
				{ $unwind: "$courses" },
				{ $replaceRoot: { newRoot: "$courses" } },
				{
					$lookup: {
						from: "videos",
						localField: "videos",
						foreignField: "_id",
						as: "videos",
					},
				},
				{ $unset: "videos.playbackId" },
			]);
			return Promise.resolve(courses);
		}
		throw new BadRequestException(`${this.modelName} not found`);
	}

	async getPurchasedLivestreamsQuery(userId: string): Promise<Array<ILivestream>> {
		if (await this.checkValidity({ _id: new Types.ObjectId(userId) })) {
			const purchasedLivestreams = await this.model.aggregate([
				{ $match: { _id: new Types.ObjectId(userId) } },
				{
					$lookup: {
						from: "livestreams",
						localField: "purchasedLivestreams",
						foreignField: "_id",
						as: "purchasedLivestreams",
					},
				},
				{
					$addFields: {
						_id: "$purchasedLivestreams._id",
						"purchasedLivestreams.username": "$username",
					},
				},
				{ $unwind: "$purchasedLivestreams" },
				{ $replaceRoot: { newRoot: "$purchasedLivestreams" } },
				{ $match: { streamEnd: { $gte: new Date() } } },
				{ $sort: { streamStart: -1 } },
			]);
			return Promise.resolve(purchasedLivestreams);
		}
		throw new BadRequestException(`${this.modelName} not found`);
	}

	async getExpertLivestreamsQuery(userId: string): Promise<LivestreamDocument[]> {
		if (await this.checkValidity({ _id: new Types.ObjectId(userId) })) {
			const livestreams = await this.model.aggregate([
				{ $match: { _id: new Types.ObjectId(userId) } },
				{
					$project: {
						_id: 0,
						livestreams: 1,
					},
				},
				{
					$lookup: {
						from: "livestreams",
						localField: "livestreams",
						foreignField: "_id",
						as: "livestreams",
					},
				},
				{
					$addFields: {
						_id: "$livestreams._id",
						"livestreams.username": "$username",
					},
				},
				{ $unwind: "$livestreams" },
				{ $replaceRoot: { newRoot: "$livestreams" } },
				{ $match: { streamEnd: { $gte: new Date() } } },
				{ $sort: { streamStart: -1 } },
				{ $unset: "streamId" },
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner",
						pipeline: [{ $project: { _id: 1, username: 1 } }],
					},
				},
				{ $unwind: "$owner" },
				{
					$lookup: {
						from: "games",
						localField: "game",
						foreignField: "_id",
						as: "game",
						pipeline: [{ $project: { _id: 1, title: 1 } }],
					},
				},
				{ $unwind: "$game" },
			]);
			return Promise.resolve(livestreams);
		}
		throw new BadRequestException(`${this.modelName} not found`);
	}

	async getLeaderboard({ skip, length }: Page): Promise<Array<UserDocument>> {
		return this.model.aggregate([{ $sort: { gems: -1 } }, { $skip: skip }, { $limit: length }]);
	}

	async getLeaderBoardDaily(day: Date, { skip, length }: Page): Promise<any> {
		return this.model.aggregate([
			{
				$facet: {
					result: [
						{ $match: { updatedAt: { $gt: day } } },
						{ $sort: { gems: -1 } },
						{ $skip: skip * length },
						{ $limit: length },
						this.protectInfo(),
					],
					totalCount: [{ $count: "count" }],
				},
			},
			{ $unwind: "$totalCount" },
		]);
	}

	async getLeaderBoardMonthly(day: Date, { skip, length }: Page): Promise<UserDocument[]> {
		return this.model.aggregate([
			{
				$facet: {
					result: [
						{ $match: { updatedAt: { $gt: day } } },
						{ $sort: { gems: -1 } },
						{ $skip: skip * length },
						{ $limit: length },
						this.protectInfo(),
					],
					totalCount: [{ $count: "count" }],
				},
			},
			{ $unwind: "$totalCount" },
		]);
	}

	async getGameExpertsQuery(id: string, { skip, length }: Page): Promise<UserDocument[]> {
		return this.model.aggregate([
			{ $match: { games: new Types.ObjectId(id), role: AUTH_ROLES.expert } },
			{
				$facet: {
					result: [
						{ $addFields: { coursesLen: { $size: "$courses" } } },
						{ $sort: { coursesLen: 1 } },
						{ $skip: skip },
						{ $limit: length },
						this.protectInfo(["coursesLen"]),
					],
					totalCount: [{ $count: "count" }],
				},
			},
			{ $unwind: "$totalCount" },
		]);
	}
}
