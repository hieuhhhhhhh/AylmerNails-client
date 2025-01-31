export default async function fetchAvailability(date, services) {
  try {
    // parse input to payload
    const DELAs_requests = Object.values(services).map(
      ({ empIds, serviceId }) => ({
        employe_ids: empIds,
        service_id: serviceId,
        selected_AOSO: [],
        date,
      })
    );

    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/get_availability_list`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          DELAs_requests: DELAs_requests,
        }),
      }
    );

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
