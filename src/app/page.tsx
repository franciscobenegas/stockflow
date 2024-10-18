import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <section className="flex justify-center items-center mt-32">
      <h1 className="text-5xl">Home Page</h1>
    </section>
  );
}
