import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import axios from "axios";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class TelegramService {
	constructor(private readonly httpService: HttpService) {}

	getTelegramHello() {
		return "Hello Telegram";
	}

	async verifyUser(ChannelName, userID): Promise<boolean> {
		// userID = "1050710421";

		const responsechannel = await firstValueFrom(
			this.httpService
				.get(`${process.env.TELEGRAM_URL}/getChat?chat_id=@${ChannelName}`)
				.pipe(
					catchError((error: "error") => {
						throw new BadRequestException(error);
					}),
				),
		);
		// console.log('responseChannel',responsechannel.data)
		const chatID = responsechannel.data.result.id;

		// const response = await firstValueFrom(
		// 	this.httpService
		// 		.get(
		// 			`${process.env.TELEGRAM_URL}/getChatMember?chat_id=${chatID}&user_id=${userID}`,
		// 		)
		// 		.pipe(
		// 			catchError((error: "error") => {
		// 				throw new BadRequestException(error);
		// 			}),
		// 		),
		// );
		const response = await axios.get(
			`${process.env.TELEGRAM_URL}/getChatMember?chat_id=${chatID}&user_id=${userID}`,
		);

		console.log("response-GetChatMember", response.data);

		if (response.data.ok === true) {
			return true;
		}
		return false;
	}
}
