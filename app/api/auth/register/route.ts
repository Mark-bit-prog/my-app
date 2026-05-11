import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof name !== "string"
    ) {
      return Response.json({ message: "Invalid request body" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const trimmedName = name.trim();

    if (!trimmedName || !emailPattern.test(normalizedEmail)) {
      return Response.json({ message: "Invalid name or email" }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: trimmedName,
      },
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return Response.json(
        { message: "User with this email already exists" },
        { status: 409 },
      );
    }

    return Response.json({ message: "Registration failed" }, { status: 500 });
  }
}
