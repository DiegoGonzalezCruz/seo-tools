"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "lucide-react";
import { Progress } from "@/components/ui/card";
import { useWordpressHealthCheck } from "@/hooks/config/useWordpressHealthCheck";
import { useSession } from "next-auth/react";

const WordpressStatus = () => {
  const { data, status } = useSession();
  // console.log(data, "data user");
  const user = data?.user;
  const {
    data: wpData,
    isSuccess,
    isLoading,
  } = useWordpressHealthCheck({
    userId: user?.id,
    enabled: status === "authenticated",
  });

  // console.log(wpData, "wpData");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">WordPress API</CardTitle>
        <Database className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        ) : (
          <div className="text-2xl font-bold">
            {wpData ? "Connected" : "Disconnected"}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {isLoading
            ? "Loading..."
            : wpData
              ? "Resource usage: 100%"
              : "Action required"}
        </p>
        {/* <Progress value={wpData ? 100 : 0} className="mt-2" /> */}
      </CardContent>
    </Card>
  );
};

export default WordpressStatus;
