const baseUrl = process.env.NEXT_PUBLIC_HOST_NAME

export const fetchUserData = async () => {
  const response = await fetch(baseUrl + '/api/users')
  // console.log(response, '🔥 🔥 response 🔥 🔥')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
