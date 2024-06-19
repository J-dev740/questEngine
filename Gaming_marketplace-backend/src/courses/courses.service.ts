import { BadRequestException, Injectable, UseFilters } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BigNumber } from "ethers";
import { Model, Types } from "mongoose";
import { UsersService } from "@src/users/users.service";
import CourseQueryService from "../_common/database/queries/course.query";
import GameQueryService from "../_common/database/queries/game.query";
import LanguageQueryService from "../_common/database/queries/language.query";
import ReviewQueryService from "../_common/database/queries/review.query";
import UserQueryService from "../_common/database/queries/user.query";
import VideoQueryService from "../_common/database/queries/video.query";
import {
	CourseDocument,
	ICourse,
	modelName as courseModelName,
} from "../_common/database/schema/course.schema";
import { GameDocument, modelName as gameModelName } from "../_common/database/schema/game.schema";
import {
	LanguageDocument,
	modelName as langModelName,
} from "../_common/database/schema/language.schema";
import {
	IReview,
	modelName as reviewModelName,
	ReviewDocument,
} from "../_common/database/schema/review.schema";
import { modelName as userModelName, UserDocument } from "../_common/database/schema/user.schema";
import {
	IVideo,
	modelName as videoModelName,
	VideoDocument,
} from "../_common/database/schema/video.schema";
import { HttpExceptionFilter } from "../_common/exceptions/http-exception.filter";
import { CONTRACT_STATUS, Page } from "../_common/types.global";
import { parseLogs } from "../_common/utils";
import { reviewDataDto } from "./controllers/reviews/dto/courseReview.dto";
import { courseDataDto } from "./dto/courseData.dto";
import { UpdateCurrencyDto } from "./dto/updateCurrency.dto";
import { videoDataDto } from "./dto/videoData.dto";

interface AddCourseEvent {
	courseId: BigNumber;
	owner: string;
	tokenAddress: string[];
	price: BigNumber;
}

@Injectable()
@UseFilters(new HttpExceptionFilter())
export class CoursesService {
	userQueryService: UserQueryService;

	gameQueryService: GameQueryService;

	languageQueryService: LanguageQueryService;

	courseQueryService: CourseQueryService;

	reviewQueryService: ReviewQueryService;

	videoQueryService: VideoQueryService;

	constructor(
		@InjectModel(userModelName) private UserModel: Model<UserDocument>,
		@InjectModel(reviewModelName) private ReviewModel: Model<ReviewDocument>,
		@InjectModel(gameModelName) private GameModel: Model<GameDocument>,
		@InjectModel(langModelName) private LangModel: Model<LanguageDocument>,
		@InjectModel(videoModelName) private VideoModel: Model<VideoDocument>,
		@InjectModel(courseModelName)
		private CourseModel: Model<CourseDocument>,
		private usersService: UsersService,
	) {
		this.userQueryService = new UserQueryService(UserModel);
		this.gameQueryService = new GameQueryService(GameModel);
		this.languageQueryService = new LanguageQueryService(LangModel);
		this.courseQueryService = new CourseQueryService(CourseModel);
		this.reviewQueryService = new ReviewQueryService(ReviewModel);
		this.videoQueryService = new VideoQueryService(VideoModel);
	}

	async handleCourseRegister(courseData: courseDataDto, walletAddress: string): Promise<ICourse> {
		const { _id } = await this.userQueryService.readEntity({
			walletAddress,
		});

		if (!(await this.gameQueryService.checkValidity({ _id: courseData.game })))
			throw new BadRequestException("Invalid game");

		if (!(await this.languageQueryService.checkValidity({ _id: courseData.language })))
			throw new BadRequestException("Invalid language");

		const uploadPromises = courseData.videos.map((video: videoDataDto) =>
			this.handleVideoUpload(video),
		);
		const newVideos = await Promise.all(uploadPromises);

		const uploadedVideo = newVideos.map((newVideo) => newVideo._id);

		const createdCourse: ICourse = {
			language: courseData.language,
			owner: new Types.ObjectId(_id),
			title: courseData.title,
			videos: uploadedVideo,
			game: courseData.game,
			description: courseData.description,
			icon: courseData.icon,
			prices: courseData.prices,
			primaryAmount: courseData.primaryAmount,
			primaryCurrency: courseData.primaryCurrency,
			users: [],
			status: CONTRACT_STATUS.success,
		};

		const course = await this.courseQueryService.createEntity(createdCourse);
		await this.userQueryService.updateEntity(
			{ _id: course.owner },
			{ $push: { courses: course._id } },
		);
		return course;
	}

	async handleDeleteCourse(id: string): Promise<ICourse> {
		const course = await this.courseQueryService.readEntity({
			_id: new Types.ObjectId(id),
		});

		await this.userQueryService.updateEntity(
			{ _id: course.owner },
			{ $pull: { courses: course._id } },
		);

		await this.gameQueryService.updateEntity(
			{ _id: course.game },
			{ $pull: { courses: course._id } },
		);

		return course;
	}

	handleGetAllCourse(): Promise<ICourse[]> {
		return this.courseQueryService.readMultipleEntities({}, { limit: 100 }, { videos: 0 });
	}

	async handleGetSpecificCourse(_id: string): Promise<ICourse> {
		return this.courseQueryService.getSpecificCourseQuery(_id);
	}

	handleCoursePreview(_id: string): Promise<ICourse> {
		return this.courseQueryService.getPreviewCoursesQuery(_id);
	}

	async handleVideoUpload(videoData: videoDataDto) {
		const uploadedVideo: IVideo = {
			seq_id: videoData.seq_id,
			title: videoData.title,
			description: videoData.description,
			assetId: videoData.assetId,
			playbackId: videoData.playbackId,
			icon: videoData.icon,
			duration: videoData.duration,
		};

		return this.videoQueryService.createEntity(uploadedVideo);
	}

	async handleGetExpertCourse(_id: string): Promise<Array<ICourse>> {
		return this.userQueryService.getExpertCoursesQuery(_id);
	}

	async handleGetCourseVideos(_id: string) {
		return this.courseQueryService.getCourseVideosQuery(_id);
	}

	async handleGetGameCourses(_id: string, page: Page): Promise<Array<ICourse>> {
		return this.courseQueryService.getGameCourseQuery(_id, page);
	}

	async handleGetCourseReviews(_id: string): Promise<Array<IReview>> {
		return this.reviewQueryService.getReviewsQuery("course", _id, 50, {
			rating: -1,
		});
	}

	async handlePostCourseReview(
		courseId: string,
		walletAddress: string,
		reviewData: reviewDataDto,
	): Promise<IReview> {
		const user = await this.userQueryService.readEntity({ walletAddress });
		const course = await this.courseQueryService.readEntity({
			_id: courseId,
		});

		const review: IReview = {
			course: new Types.ObjectId(courseId),
			content: reviewData.content,
			rating: reviewData.rating,
			upvotes: reviewData.upvotes,
			game: course.game,
			user: user._id,
		};

		return this.reviewQueryService.createEntity(review);
	}

	async confirmAddCourse(body: any) {
		if (!body.confirmed) return;
		const { courseId } = parseLogs<AddCourseEvent>(body)[0];
		const course = await this.courseQueryService.readEntity({
			_id: courseId._hex.substring(2),
		});
		await this.gameQueryService.updateEntity(
			{ _id: course.game },
			{ $push: { courses: course._id, experts: course.owner } },
		);
		await this.userQueryService.updateEntity(
			{ _id: course.owner },
			{ $push: { games: course.game } },
		);
		await this.courseQueryService.updateEntity(
			{ _id: course._id },
			{ status: CONTRACT_STATUS.confirmed },
		);
	}

	getPendingAddCourses() {
		return this.courseQueryService.getPendingCourseQuery();
	}

	rejectAddCourse(courseId: string) {
		return this.courseQueryService.deleteEntity({
			_id: courseId,
			status: CONTRACT_STATUS.success,
		});
	}

	approveAddCourse(courseId: string) {
		return this.courseQueryService.updateEntity(
			{ _id: courseId },
			{ status: CONTRACT_STATUS.approved },
		);
	}

	async updateCurrencyDto(
		walletAddress: string,
		id: string,
		currDto: UpdateCurrencyDto,
	): Promise<boolean> {
		// check if the expert fro mwalletaddress owns the course or not
		const courseId = new Types.ObjectId(id);

		if (
			!(await this.userQueryService.checkValidity({
				walletAddress,
				courses: courseId,
			}))
		)
			throw new BadRequestException("course does not belong to this wallet");

		const { primaryAmount, primaryCurrency, prices } = currDto;
		return this.courseQueryService.updateEntity(
			{ _id: courseId },
			{ primaryCurrency, primaryAmount, prices },
		);
	}

	async handleUserEnrollCourse(courseId: string, walletAddress: string): Promise<boolean> {
		const course = await this.courseQueryService.readEntity({
			_id: new Types.ObjectId(courseId),
		});
		// console.log('handleEnrollCourse',courseId,walletAddress)
		const user = await this.usersService.getUserProfile(walletAddress.toLowerCase());

		await this.userQueryService.updateEntity(
			{ _id: user._id },
			{ $push: { purchasedCourses: course._id } },
		);
		return this.courseQueryService.updateEntity(
			{ _id: course._id },
			{ $push: { users: user._id } },
		);
	}
}
