import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Status from "./Config/Status";
import WordpressStatus from "./Config/WordpressStatus";
import WordpressConfig from "./Config/WordpressConfig";
import OpenAIConfig from "./Config/OpenAIConfig";
import OllamaStatus from "./Config/OllamaStatus";
import OpenAIStatus from "./Config/OpenAIStatus";

export default function GeneralConfiguration() {
  return (
    <div className="container mx-auto space-y-4  h-full">
      <Status />

      <Tabs defaultValue="health" className="space-y-4 ">
        <TabsList className=" w-full ">
          <TabsTrigger className=" w-full " value="health">
            Health Check
          </TabsTrigger>
          <TabsTrigger className=" w-full " value="config">
            Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="health" className=" ">
          <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-5">
              <OllamaStatus />
              <OpenAIStatus />
            </div>
            <WordpressStatus />
          </div>
        </TabsContent>

        <TabsContent
          value="config"
          className="flex flex-col md:flex-row items-start justify-center gap-5 "
        >
          <WordpressConfig />
          <OpenAIConfig />
        </TabsContent>
      </Tabs>
    </div>
  );
}
// FUTURE IDEA:
/* 
<Card>
  <CardHeader>
    <CardTitle>Error Logs</CardTitle>
    <CardDescription>
      Recent issues and troubleshooting tips
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <p className="text-sm">No recent errors to display.</p>
      <Button variant="outline">View Full Logs</Button>
    </div>
  </CardContent>
</Card>
*/
