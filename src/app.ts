import 'reflect-metadata';
import cors from 'cors';
import express, { Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import hpp from 'hpp';
import http from 'http';
import { autoInjectable } from 'tsyringe';

import UserRoutes from './routes/User.Routes';
import PetRoutes from './routes/Pet.Routes';
import AuctionRoutes from './routes/Auction.Routes';
import IRoute from './utils/abstractions/route';
import db from './infrastructure/models';
import { DatabaseSeeds } from './infrastructure/seeds';
import { ErrorMiddleware } from './middleware';
dotenv.config();

@autoInjectable()
export default class App {
	public app: express.Application;
	public server: any;
	constructor(
		protected userRoutes?: UserRoutes,
		protected petRoutes?: PetRoutes,
		protected auctionRoutes?: AuctionRoutes
	) {
		// this.apiRoot = `/api/${process.env.SERVICE_NAME}/`
		this.app = express();
		this.server = http.createServer(this.app);
		this.initializeMiddlewares();
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.initializeRoutes([userRoutes!, petRoutes!, auctionRoutes!]);
	}

	public listen() {
		db.sequelize.sync({ force: true }).then(async () => {
			await DatabaseSeeds(db);
			this.server.listen(process.env.PORT, '0.0.0.0', () => {
				console.log(
					`🚀Service ${process.env.SERVICE_NAME} is listening on ${process.env.PORT}`
				);
			});
		});
	}

	public getServer() {
		return this.server;
	}

	private initializeMiddlewares() {
		this.app.use(
			cors({
				origin: process.env.NODE_ENV === 'production' ? true : false,
				credentials: true,
			})
		);

		this.app.use(hpp());
		this.app.use(helmet());
		this.app.use(
			express.json({
				verify: (req, res: Response, buf) => {
					res.locals.rawBody = buf;
				},
			})
		);
		this.app.use(
			express.urlencoded({
				extended: true,
				verify: (req, res: Response, buf) => {
					res.locals.rawBody = buf;
				},
			})
		);
		this.app.use(ErrorMiddleware);
	}

	private initializeRoutes(routes: IRoute[]) {
		routes.forEach((route) => {
			this.app.use(`/api`, route.router);
		});
	}
}
