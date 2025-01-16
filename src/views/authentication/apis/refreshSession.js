// send token to server, if token expired or invalid, navigate to login page

export default async function refreshSession() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/authentication/request_continue_session`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // read status and process response
    if (res.ok) {
      const data = await res.json();

      if (data && data.token) {
        console.log("Session continued.");
      } else {
        this.$router.push("./login");
        console.log("Failed to use token, message: ", data.message);
      }
    } else {
      console.log("Response error: ", res.statusText);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
