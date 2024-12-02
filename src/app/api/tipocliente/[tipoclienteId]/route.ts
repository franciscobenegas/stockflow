import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import prisma from "@/libs/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { tipoclienteId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { tipoclienteId } = params;
    const values = await req.json();

    if (!session?.user?.name) {
      return new Response("No tiene autorizacion para ejecuar este servicio", {
        status: 401,
      });
    }

    const tipoclienteUpd = await prisma.tipoCliente.update({
      where: {
        id: +tipoclienteId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(tipoclienteUpd);
  } catch (error) {
    console.log("[TipoCliente ID New] ", error);
    return new NextResponse("Error Interno", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { tipoclienteId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { tipoclienteId } = params;

    if (!session?.user?.name) {
      return new Response("No tiene autorizacion para ejecuar este servicio", {
        status: 401,
      });
    }

    const deleteTipoCliente = await prisma.tipoCliente.delete({
      where: {
        id: +tipoclienteId,
      },
    });

    return NextResponse.json(deleteTipoCliente);
  } catch (error) {
    console.log("[TipoCliente ID Delete] ", error);
    return new NextResponse("Error Interno", { status: 500 });
  }
}
