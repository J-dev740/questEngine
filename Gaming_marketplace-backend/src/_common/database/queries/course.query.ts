import { BadRequestException } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { CONTRACT_STATUS, Page } from "../../types.global";
import { CourseDocument, modelName as courseModelName } from "../schema/course.schema";
import { IVideo } from "../schema/video.schema";
import { GenericQueryService } from "./_generic.query";

export default class CourseQueryService extends GenericQueryService<CourseDocument> {
	constructor(model: Model<CourseDocument>) {
		super(model, courseModelName);
	}

	async getCourseVideosQuery(_id: string): Promise<Array<IVideo>> {
		if (await this.checkValidity({ _id })) {
			const videos = await this.model.aggregate([
				{ $match: { _id: new Types.ObjectId(_id) } },

				{
					$project: {
						_id: 0,
						videos: 1,
					},
				},
				{
					$lookup: {
						from: "videos",
						localField: "videos",
						foreignField: "_id",
						as: "videos",
					},
				},
				{ $unwind: "$videos" },
				{ $sort: { "videos.seq_id": 1 } },
			]);

			return Promise.resolve(videos);
		}
		throw new BadRequestException(`${this.modelName} not found`);
	}

	async getPendingCourseQuery(): Promise<CourseDocument[]> {
		const courses = await this.model.aggregate([
			{ $match: { status: CONTRACT_STATUS.success } },
			{
				$lookup: {
					from: "videos",
					localField: "videos",
					foreignField: "_id",
					as: "videos",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "owner",
					foreignField: "_id",
					as: "owner",
				},
			},
			{ $unwind: "$owner" },
		]);
		return Promise.resolve(courses);
	}

	async getSpecificCourseQuery(courseId: string): Promise<CourseDocument> {
		if (await this.checkValidity({ _id: new Types.ObjectId(courseId) })) {
			const course = await this.model.aggregate([
				{ $match: { _id: new Types.ObjectId(courseId) } },
				{
					$lookup: {
						from: "videos",
						localField: "videos",
						foreignField: "_id",
						as: "videos",
						pipeline: [{ $sort: { seq_id: 1 } }],
					},
				},
			]);

			return Promise.resolve(course[0]);
		}
		throw new BadRequestException(`${this.modelName} not found`);
	}

	async getPreviewCoursesQuery(courseId: string): Promise<CourseDocument> {
		if (await this.checkValidity({ _id: new Types.ObjectId(courseId) })) {
			const course = await this.model.aggregate([
				{ $match: { _id: new Types.ObjectId(courseId) } },
				{ $addFields: { videos: { $slice: ["$videos", 2] } } },
				{
					$lookup: {
						from: "videos",
						localField: "videos",
						foreignField: "_id",
						as: "videos",
					},
				},
			]);

			return Promise.resolve(course[0]);
		}
		throw new BadRequestException(`${this.modelName} not found`);
	}

	async getAllCoursesQuery(userId: string): Promise<CourseDocument[]> {
		const course = await this.model.aggregate([
			{ $match: { owner: new Types.ObjectId(userId) } },
			{
				$lookup: {
					from: "videos",
					localField: "videos",
					foreignField: "_id",
					as: "videos",
				},
			},
		]);

		return Promise.resolve(course);
	}

	async getGameCourseQuery(gameId: string, { skip, length }: Page): Promise<CourseDocument[]> {
		return this.model.aggregate([
			{ $match: { game: new Types.ObjectId(gameId) } },
			{
				$facet: {
					result: [
						{ $addFields: { usersLen: { $size: "$users" } } },
						{ $sort: { usersLen: 1 } },
						{ $skip: skip },
						{ $limit: length },
						{ $unset: "usersLen" },
					],
					totalCount: [{ $count: "count" }],
				},
			},
			{ $unwind: "$totalCount" },
		]);
	}
}
