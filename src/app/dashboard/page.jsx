import { BookOpenCheck, UserRound, Waypoints } from "lucide-react";
import { CardSummary } from "../components/CardSummary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../authOptions";
import { redirect } from "next/navigation";
import { UltimosClientes } from "../components/UltimosClientes";
import { SalesDistributors } from "../components/SalesDistributors";

const dataCardSummary = [
  {
    icon: UserRound,
    total: "12.450",
    average: 15,
    title: "Compañias creadas",
    tooltipText: "ver mas datos de compañias creadas",
  },
  {
    icon: Waypoints,
    total: "86.5%",
    average: 80,
    title: "Total de Visitas",
    tooltipText: "ver mas datos de total de visitas",
  },
  {
    icon: BookOpenCheck,
    total: "365.000",
    average: 30,
    title: "Total de Ventas",
    tooltipText: "ver mas datos de Total de Ventas",
  },
];

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session.user.name) {
    redirect("/auth/login");
  }

  return (
    <div>
      <h1>DashBoard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  lg:gap-x-20">
        {dataCardSummary.map(({ icon, total, average, title, tooltipText }) => (
          <CardSummary
            key={title}
            icon={icon}
            total={total}
            average={average}
            title={title}
            tooltipText={tooltipText}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-10 mt-12 ">
        <UltimosClientes />

        <SalesDistributors />
      </div>
    </div>
  );
};

export default DashboardPage;
