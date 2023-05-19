"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueCredentialRoute = void 0;
const common_routes_config_1 = require("./common.routes.config");
class IssueCredentialRoute extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'IssueCredential');
    }
    // the endpoints of each routing class' resource
    configureRoutes() {
        this.app.route(`/issue-credential`)
            .get((req, res) => {
            res.status(200).send(`List of issue-credential`);
        })
            .post((req, res) => {
            res.status(200).send(`Post to issue-credential`);
        });
        this.app.route(`/issue-credential/:userId`)
            .all((req, res, next) => {
            // this middleware function runs before any request to /issue-credential/:userId
            // but it doesn't accomplish anything just yet---
            // it simply passes control to the next applicable function below using next()
            next();
        })
            .get((req, res) => {
            res.status(200).send(`GET requested for id ${req.params.userId}`);
        })
            .put((req, res) => {
            res.status(200).send(`PUT requested for id ${req.params.userId}`);
        })
            .patch((req, res) => {
            res.status(200).send(`PATCH requested for id ${req.params.userId}`);
        })
            .delete((req, res) => {
            res.status(200).send(`DELETE requested for id ${req.params.userId}`);
        });
        return this.app;
    }
}
exports.IssueCredentialRoute = IssueCredentialRoute;
