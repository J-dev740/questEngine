import { ExpertInfo, UserRoles } from "../types";

export interface IProfile {
	role: UserRoles;
	activeUser: ExpertInfo | null;
}
