export function getAuthToken() {
  const token = localStorage.getItem("accessToken");
  return token;
}
