export default async function fetchBusinessLinks() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/business_links/get_all`, {
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
      return json.links;
    } else {
      console.log("Failed to fetch business links, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
