import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import prisma from "@/libs/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { clienteId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { clienteId } = params;
    const values = await req.json();

    if (!session?.user?.name) {
      return new Response("No tiene autorizacion para ejecuar este servicio", {
        status: 401,
      });
    }

    const clienteUpd = await prisma.cliente.update({
      where: {
        id: clienteId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(clienteUpd);
  } catch (error) {
    console.log("[Cliente ID New] ", error);
    return new NextResponse("Error Interno", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { clienteId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { clienteId } = params;

    if (!session?.user?.name) {
      return new Response("No tiene autorizacion para ejecuar este servicio", {
        status: 401,
      });
    }

    const deleteCliente = await prisma.cliente.delete({
      where: {
        id: clienteId,
      },
    });

    return NextResponse.json(deleteCliente);
  } catch (error) {
    console.log("[Cliente ID Delete] ", error);
    return new NextResponse("Error Interno", { status: 500 });
  }
}
