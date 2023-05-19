import {CommonRoutesConfig} from './common.routes.config';
import express from 'express';

export class IssueCredentialRoute extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'IssueCredential');
    }
    // the endpoints of each routing class' resource
    configureRoutes() {
        this.app.route(`/issue-credential`)
        .get((req: express.Request, res: express.Response) => {
            res.status(200).send(`List of issue-credential`);
        })
        .post((req: express.Request, res: express.Response) => {
            res.status(200).send(`Post to issue-credential`);
        });

    this.app.route(`/issue-credential/:userId`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            // this middleware function runs before any request to /issue-credential/:userId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
        .get((req: express.Request, res: express.Response) => {
            res.status(200).send(`GET requested for id ${req.params.userId}`);
        })
        .put((req: express.Request, res: express.Response) => {
            res.status(200).send(`PUT requested for id ${req.params.userId}`);
        })
        .patch((req: express.Request, res: express.Response) => {
            res.status(200).send(`PATCH requested for id ${req.params.userId}`);
        })
        .delete((req: express.Request, res: express.Response) => {
            res.status(200).send(`DELETE requested for id ${req.params.userId}`);
        });
        return this.app;
    }
}
