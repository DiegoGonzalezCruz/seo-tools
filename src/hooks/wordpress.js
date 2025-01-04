const {
  data: wordpressCheckData,
  isLoading: wordpressCheckLoading,
  isSuccess: wordpressSuccess,
} = useQuery({
  queryKey: ["wp-health-check"],
  queryFn: async () => {
    const response = await fetch("/api/health-check/wordpress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
      }),
    });
    return response.json();
  },
  enabled: status === "authenticated" && !!user,
});

const { data: wpData } = useQuery({
  queryKey: ["wp-instance-data", user],
  queryFn: () => getUserWPInstances(user.id),
  enabled: status === "authenticated" && !!user,
});
console.log(wpData, "wpData");
