import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodeMailer/nodemailer-mail-adapter';
import { SubmitFeedbackFunction } from './functions/submit-feedbacks-function';
import { PrismaFeedbacksRepositories } from './repositories/prisma/prisma-feedbacks-repository';

export const routes = express.Router();

routes.post('/feedbacks', async(req, res) => { 
  const { type, comment, screenshot } = req.body;
  
  const prismaFeedbacksRepository = new PrismaFeedbacksRepositories();
  const nodemailerMailerAdapter = new NodemailerMailAdapter();
  const submitFeedbackFunction = new SubmitFeedbackFunction(
    prismaFeedbacksRepository,
    nodemailerMailerAdapter
  )

  await submitFeedbackFunction.execute({
    type,
    comment,
    screenshot,
  })
  return res.status(201).send();
})