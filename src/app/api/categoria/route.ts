import prisma from "../../../libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await req.json();

    if (!session?.user?.name) {
      return new Response("No tiene autorizacion para ejecuar este servicio", {
        status: 401,
      });
    }

    const categoriaAdd = await prisma.categoria.create({
      data: {
        usuarioId: session.user.name,
        ...data,
      },
    });

    return NextResponse.json(categoriaAdd);
  } catch (error) {
    console.log("[Categoria] - ", error);
    return new NextResponse("Ops algo salio mal, vuelva a intentarlos", {
      status: 500,
    });
  }
}
