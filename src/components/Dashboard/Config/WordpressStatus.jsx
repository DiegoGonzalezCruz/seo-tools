"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "lucide-react";
import { Progress } from "@/components/ui/card";
import { useWordpressHealthCheck } from "@/hooks/config/useWordpressHealthCheck";
import { useSession } from "next-auth/react";

const WordpressStatus = () => {
  const user = useSession();
  console.log(user, "user");
  // const { data, isSuccess, isLoading } = useWordpressHealthCheck(userId);
  // console.log(data, "data");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">WordPress API</CardTitle>
        <Database className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {wordpressCheckLoading ? (
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        ) : (
          <div className="text-2xl font-bold">
            {wordpressCheckData ? "Connected" : "Disconnected"}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {wordpressCheckLoading
            ? "Loading..."
            : wordpressCheckData
              ? "Resource usage: 100%"
              : "Action required"}
        </p>
        {/* <Progress value={wordpressCheckData ? 100 : 0} className="mt-2" /> */}
      </CardContent>
    </Card>
  );
};

export default WordpressStatus;
