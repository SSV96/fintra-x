import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AddressInputSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zipCode: z.string(),
});

export const RegisterUserInputSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
  firstName: z.string(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  address: AddressInputSchema.optional(),
});

export class RegisterUserDTO extends createZodDto(RegisterUserInputSchema) {}
