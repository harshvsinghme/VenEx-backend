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
