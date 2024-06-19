import { Model } from "mongoose";
import { modelName, VideoDocument } from "../schema/video.schema";
import { GenericQueryService } from "./_generic.query";

export default class VideoQueryService extends GenericQueryService<VideoDocument> {
	constructor(model: Model<VideoDocument>) {
		super(model, modelName);
	}
}
