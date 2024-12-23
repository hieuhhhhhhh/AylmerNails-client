export default async function submitCredentials(phone_number, password) {
  // reformat phone number
  const formatted = "+1" + phone_number.replace(/\D/g, "");

  // get app path
  const baseURL = process.env.VUE_APP_BASE_URL;

  // start requesting server
  return await fetch(`${baseURL}/api/authentication/request_log_in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone_num: formatted,
      password: password,
    }),
  });
}
