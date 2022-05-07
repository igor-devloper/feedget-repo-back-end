"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFeedbacksRepositories = void 0;
const prisma_1 = require("../../prisma");
class PrismaFeedbacksRepositories {
    async create({ type, comment, screenshot }) {
        await prisma_1.prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot
            }
        });
    }
}
exports.PrismaFeedbacksRepositories = PrismaFeedbacksRepositories;
