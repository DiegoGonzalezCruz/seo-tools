import GeneralConfiguration from "@/components/Dashboard/GeneralConfiguration";
import WPConfigDashboard from "@/components/Dashboard/WPConfigDashboard";

const WPConfig = () => {
  return (
    <main className="flex min-h-screen h-full w-full  flex-col items-center justify-center ">
      {/* <WPConfigDashboard /> */}
      <GeneralConfiguration />
    </main>
  );
};

export default WPConfig;
