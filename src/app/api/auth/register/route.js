/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prisma";

export async function POST(request) {
  try {
    const data = await request.json();

    const emailFount = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (emailFount) {
      return NextResponse.json(
        {
          message: "el Email ya existe",
        },
        { status: 400 }
      );
    }

    const userFount = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (userFount) {
      return NextResponse.json(
        { message: "el Usuario ya existe" },
        { status: 400 }
      );
    }

    const hashPassw = await bcrypt.hashSync(data.password, 10);

    // Load hash from your password DB.
    // bcrypt.compareSync(myPlaintextPassword, hash); // true

    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashPassw,
      },
    });

    const { password, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
