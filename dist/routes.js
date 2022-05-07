"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_mail_adapter_1 = require("./adapters/nodeMailer/nodemailer-mail-adapter");
const submit_feedbacks_function_1 = require("./functions/submit-feedbacks-function");
const prisma_feedbacks_repository_1 = require("./repositories/prisma/prisma-feedbacks-repository");
exports.routes = express_1.default.Router();
exports.routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbacksRepository = new prisma_feedbacks_repository_1.PrismaFeedbacksRepositories();
    const nodemailerMailerAdapter = new nodemailer_mail_adapter_1.NodemailerMailAdapter();
    const submitFeedbackFunction = new submit_feedbacks_function_1.SubmitFeedbackFunction(prismaFeedbacksRepository, nodemailerMailerAdapter);
    await submitFeedbackFunction.execute({
        type,
        comment,
        screenshot,
    });
    return res.status(201).send();
});
