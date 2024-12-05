import { z } from 'zod';

export const validatorUpdateEmployee = z.object({
  productivity: z
    .number()
    .min(0, { message: 'Allowed productivity score: 0-100' })
    .max(100, { message: 'Allowed productivity score: 0-100' }),
  collaboration: z
    .number()
    .min(0, { message: 'Allowed collaboration score: 0-100' })
    .max(100, { message: 'Allowed collaboration score: 0-100' }),
  communication: z
    .number()
    .min(0, { message: 'Allowed communication score: 0-100' })
    .max(100, { message: 'Allowed communication score: 0-100' })
});

export const validatorPredictStoryPointsForEmp = z.object({
  id: z.string().min(1, { message: 'Id can not be empty' }),
  projectKey: z.string().min(1, { message: 'Project Key can not be empty' }),
  summary: z.string().min(1, { message: 'Summary can not be empty' }),
  description: z.string().min(1, { message: 'Description can not be empty' }),
  assignee: z.string().min(1, { message: 'Assignee can not be empty' }),
  status: z.string().min(1, { message: 'Status can not be empty' }),
  issueType: z.string().min(1, { message: 'Issue Type can not be empty' }),
  sprint: z.number().min(1, { message: 'Sprint can not be less than or equal to zero' })
});
