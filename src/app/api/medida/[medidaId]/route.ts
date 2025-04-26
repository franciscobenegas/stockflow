import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import prisma from "@/libs/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { medidaId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { medidaId } = params;
    const values = await req.json();

    if (!session?.user?.name) {
      return new Response("No tiene autorizacion para ejecuar este servicio", {
        status: 401,
      });
    }

    const medidaUpd = await prisma.medidas.update({
      where: {
        id: +medidaId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(medidaUpd);
  } catch (error) {
    console.log("[Categoria ID New] ", error);
    return new NextResponse("Error Interno", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { medidaId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { medidaId } = params;

    if (!session?.user?.name) {
      return new Response("No tiene autorizacion para ejecuar este servicio", {
        status: 401,
      });
    }

    const DeleteMedida = await prisma.medidas.delete({
      where: {
        id: +medidaId,
      },
    });

    return NextResponse.json(DeleteMedida);
  } catch (error) {
    console.log("[Medida ID Delete] ", error);
    return new NextResponse("Error Interno", { status: 500 });
  }
}
