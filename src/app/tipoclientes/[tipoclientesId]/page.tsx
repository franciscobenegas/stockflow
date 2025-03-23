import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/authOptions";
import { redirect } from "next/navigation";
import { Headers } from "./components/Headers";
import { InfoTipoCliente } from "./components/InfoTipoCliente";
// import { InfoCliente } from "./components/InfoCliente";

export default async function TipoClienteIdPage({
  params,
}: {
  params: { tipoclientesId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) {
    return redirect("/");
  }

  const tipoclienteFull = await prisma.tipoCliente.findUnique({
    where: {
      id: +params.tipoclientesId,
    },
  });

  if (!tipoclienteFull) {
    return redirect("/");
  }

  return (
    <div>
      <Headers />
      <InfoTipoCliente tipoCliente={tipoclienteFull} />
    </div>
  );
}
