import {
  findUserByEmail,
  createUser,
} from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/password';
import { signToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { RegisterInput, LoginInput, PublicUser } from '../types/user.types';

function toPublicUser(user: {
  id: string;
  email: string;
  name: string | null;
  created_at: Date;
}): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    created_at: user.created_at,
  };
}

export async function register(input: RegisterInput) {
  const existing = await findUserByEmail(input.email);
  if (existing) {
    throw new AppError('Email already in use', 409);
  }

  const passwordHash = await hashPassword(input.password);
  const user = await createUser(input.email, passwordHash, input.name);

  const token = signToken({ userId: user.id, email: user.email });

  return { user: toPublicUser(user), token };
}

export async function login(input: LoginInput) {
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const valid = await comparePassword(input.password, user.password_hash);
  if (!valid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signToken({ userId: user.id, email: user.email });

  return { user: toPublicUser(user), token };
}