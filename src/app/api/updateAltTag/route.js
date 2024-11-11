export const POST = async (req) => {
  console.log("POST /api/updateAltTag");

  const { id, altTag, userData } = await req.json();
  // console.log(id, altTag, userData, 'id, altTag,userData')
  const activeInstance = userData.data.wordpressInstances.find(
    (instance) => instance.isActive
  );

  const appPassword = activeInstance.appPassword;
  const appUsername = activeInstance.appUsername;
  const url = activeInstance.url;
  console.log(appPassword, appUsername, url, "appPassword, appUsername, url");
  const base64Credentials = btoa(`${appUsername}:${appPassword}`);

  const response = await fetch(`${url}/wp-json/wp/v2/media/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Convert the body object to a JSON string
      alt_text: altTag,
    }),
  });
  // console.log(response, "response");
  const data = await response.json();
  console.log(data, "data from updateAltTag");

  return Response.json(data);
};
