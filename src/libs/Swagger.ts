import { Router } from 'express';
import  swaggerJSDoc = require('swagger-jsdoc');
import * as swaggerUI from 'swagger-ui-express';

export interface ISwaggerDefinition {
	swaggerDefinition: {
		basePath: string;
		info: {
			description: string;
			title: string;
			version: string;
		};
	};
}

export default class Swagger {
	public getRouter({ swaggerDefinition }: ISwaggerDefinition) {
		const router = Router();

		router.route('/').get((req, res) => {
			const options = {
				// path to the API docs
				apis: ['dist/src/**/*.js'],
				swaggerDefinition,
			};
			// initialize swagger-jsdoc
			const swaggerSpec = swaggerJSDoc(options);
			res.send(swaggerSpec);
		});
		return router;
	}
  /**
   * @description Swagger
   * @param swaggerUrl 
   * @returns 
   */
	public getUI(swaggerUrl: string) {
		
		const options = {
			swaggerUrl: `${swaggerUrl}.json`,
		};
		return {
			serve: swaggerUI.serve,
			setup: swaggerUI.setup(undefined, options),
		};
	}
}
