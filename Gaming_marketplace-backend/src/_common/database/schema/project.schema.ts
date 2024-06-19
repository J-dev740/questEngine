import { HydratedDocument, Schema, Types } from "mongoose";

export const modelName = "Project";

export interface IProject {
	name: string;
	quests: Types.ObjectId[];
}

export type ProjectDocument = HydratedDocument<IProject>;

export const ProjectSchema = new Schema<IProject>({
	name: { type: String, required: true },
	quests: [{ type: Schema.Types.ObjectId, ref: "Quest" }],
});
