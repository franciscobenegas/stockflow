// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./authOptions";
import { redirect } from "next/navigation";

export default function Home() {
  // const session = await getServerSession(authOptions);

  redirect("/dashboard");

  return (
    <div>
      <h1>Redireccionando al Dashborad</h1>
    </div>
  );
}
