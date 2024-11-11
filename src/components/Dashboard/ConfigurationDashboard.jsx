"use client";
import useUserData from "@/lib/hooks/useUserData";
import { fetchUserData } from "@/lib/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import WordpressInstancesList from "./WordpressInstancesList";
import Loading from "../Loading/Loading";
import { validateWordPressCredentials } from "@/lib/wordpress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ConfigurationDashboard = () => {
  const { data: session, status } = useSession();
  const isAuth = status !== "authenticated";
  const { data: userData, isSuccess, isLoading, isError } = useUserData();
  // console.log(userData, 'userData from ConfigurationDashboard')
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      wpSiteURL: "",
      wpPassword: "",
      wpUsername: "",
    },
  });
  // console.log(userData, 'userData')

  const saveCredentialsMutation = useMutation({
    mutationFn: async (formData) => {
      const isValid = await validateWordPressCredentials(
        formData.wpSiteURL,
        formData.wpUsername,
        formData.wpPassword
      );

      if (!isValid) {
        throw new Error("Invalid WordPress credentials");
      }

      const rawFormData = {
        wpSiteURL: formData.wpSiteURL,
        wpPassword: formData.wpPassword,
        userId: userData.id,
        wpUsername: formData.wpUsername,
      };

      const response = await fetch("/api/wordpressInstances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to save configuration");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userData.id] });
      toast.success("Configuration saved successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    saveCredentialsMutation.mutate(data);
  };

  useEffect(() => {
    if (isSuccess && userData?.wordpressInstances?.length) {
      const { url, appPassword, appUsername } = userData.wordpressInstances[0];
      setValue("wpSiteURL", url);
      setValue("wpPassword", appPassword);
      setValue("wpUsername", appUsername);
    }
  }, [isSuccess, userData, setValue]);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading data</div>;

  if (isSuccess)
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-1/2 flex flex-col items-center justify-center gap-5 p-5 bg-gray-100 rounded-lg shadow-lg"
        >
          <Label className="input input-bordered flex items-center gap-2 w-full ">
            WP Site URL
            <Input
              {...register("wpSiteURL")}
              type="text"
              className="input  w-fit  grow "
              placeholder="https://"
              disabled={isAuth}
            />
          </Label>
          <Label className="input input-bordered flex items-center gap-2 w-full">
            WP Password
            <Input
              {...register("wpPassword")}
              type="password"
              className="grow"
              placeholder="Password"
              disabled={isAuth}
            />
          </Label>
          <Label className="input input-bordered flex items-center gap-2 w-full">
            WP Username
            <Input
              {...register("wpUsername")}
              type="text"
              className="grow"
              placeholder="Username"
              disabled={isAuth}
            />
          </Label>

          <Button
            type="submit"
            disabled={isAuth}
            className="btn btn-primary w-full"
          >
            Save Configuration
          </Button>
        </form>
        <WordpressInstancesList userData={userData} />
      </div>
    );
};

export default ConfigurationDashboard;
