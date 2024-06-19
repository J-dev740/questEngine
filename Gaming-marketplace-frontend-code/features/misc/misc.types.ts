import { CurrencyInfo, GameInfo, LanguageInfo } from "../types";

export namespace GetGames {
	export type Response = Array<GameInfo>;
}

export namespace GetLanguages {
	export type Response = Array<LanguageInfo>;
}

export namespace GetCurrencies {
	export type Response = Array<CurrencyInfo>;
}

export namespace CreateFeedback {
	export type Params = { content: string };
}
