export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number;
			DATABASE_PORT: number;
			CACHE_PORT: number;
			DATABASE_HOST: string;
			DATABASE_DIALECT: string;
			DATABASE_PASSWORD: string;
			DATABASE_USERNAME: string;
			CACHE_HOST: string;
			JWT_SECRET: string;
			JWT_LIFE_TIME: number;
		}
	}
}
