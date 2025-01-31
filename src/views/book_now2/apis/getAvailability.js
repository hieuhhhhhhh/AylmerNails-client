import getTodayUnixTime from "@/lib/getTodayUnixTime";

export default async function getAvailability() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/appointments/get_availability`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: getTodayUnixTime(),
        service_id: 1,
        selected_AOSO: [],
        employee_ids: [7],
      }),
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return json.DELAs;
    } else {
      console.log("Failed to fetch availabilities, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
