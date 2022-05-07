import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepositories } from "../repositories/feedbacks-repository";

interface SubmitFeedbackFunctionRequest {
  type: string;
  comment: string;
  screenshot?: string;  
}


export class SubmitFeedbackFunction {
  constructor(
    private feedbacksRepository: FeedbacksRepositories,
    private mailAdapter: MailAdapter,
  ){
    this.feedbacksRepository = feedbacksRepository
  }
  async execute(request:SubmitFeedbackFunctionRequest) {
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error('Type is required.')
    }
    if(!comment) {
      throw new Error('Comment is required.')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot formart.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: Verdana; font-size: 15px; color: #fff; background-color: #000; padding: 1rem; border-radius: 1rem; align-items: center;" >`,
        `<p>Tipo do feedback: ${type}`,
        `<p>Comentário: ${comment}`,
        screenshot ? `<img src="${screenshot}" style="height: 100%; width: 85%; background-color: #fff; padding: 1rem; border-radius: 1rem; margin-top: 5rem; margin-left: 3rem"/>` : '',
        `</div>`
      ].join('\n')
    })
  }
}