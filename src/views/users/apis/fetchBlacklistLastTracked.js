export default async function fetchBlacklistLastTracked() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/users/get_blacklist_last_tracked`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      // res holder
      const lastTracked = json.last_tracked;
      console.log("last: ", lastTracked);

      return lastTracked;
    } else {
      console.log(
        "Failed to get last tracked on blacklist, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
