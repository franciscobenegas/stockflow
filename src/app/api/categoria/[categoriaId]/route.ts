import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import prisma from "@/libs/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { categoriaId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { categoriaId } = params;
    const values = await req.json();
    console.log("valores", values);

    if (!session?.user?.name) {
      return new Response("No tiene autorizacion para ejecuar este servicio", {
        status: 401,
      });
    }

    const categoriaUpd = await prisma.categoria.update({
      where: {
        id: +categoriaId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(categoriaUpd);
  } catch (error) {
    console.log("[Categoria ID New] ", error);
    return new NextResponse("Error Interno", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoriaId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { categoriaId } = params;

    if (!session?.user?.name) {
      return new Response("No tiene autorizacion para ejecuar este servicio", {
        status: 401,
      });
    }

    const DeleteCategoria = await prisma.categoria.delete({
      where: {
        id: +categoriaId,
      },
    });

    return NextResponse.json(DeleteCategoria);
  } catch (error) {
    console.log("[Categoria ID Delete] ", error);
    return new NextResponse("Error Interno", { status: 500 });
  }
}
