import { SubmitFeedbackFunction } from "./submit-feedbacks-function";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackFunction(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Exemple comment',
      screenshot: 'data:image/png;base64,812ldsamdmwadwa'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
  it('should not be able to submit feedback whithout type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Exemple comment',
      screenshot: 'data:image/png;base64,812ldsamdmwadwa'
    })).rejects.toThrow();
  });
  it('should not be able to submit feedback whithout comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,812ldsamdmwadwa'
    })).rejects.toThrow();
  });
  it('should not be able to submit feedback whit invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Ta tudo buagdoo',
      screenshot: 'teste.jpg'
    })).rejects.toThrow();
  });
});