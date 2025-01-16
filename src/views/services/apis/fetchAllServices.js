export default async function fetchAllServices() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/services/get_all_services`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // read status and process response
    if (res.ok) {
      const json = await res.json();
      return json.all_services; // Return the specific part of the response you need
    } else {
      console.log("Failed to fetch all services, message: ", res.statusText);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
