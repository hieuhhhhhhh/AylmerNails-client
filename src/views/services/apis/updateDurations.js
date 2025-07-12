import notifyReqError from "@/stores/notifyReqError";

export default async function updateDurations(serviceId, rows) {
  try {
    // payload holders
    let default_duration = 0;
    let durations = [];

    // parse input
    default_duration = rows[0].duration;
    for (let row of rows.slice(1)) {
      const { empId, duration } = row;
      durations.push(empId);
      durations.push(duration);
    }
    console.log("durations", rows);

    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/services/update_durations`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        default_duration,
        durations,
      }),
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return true;
    }

    notifyReqError(json.message);
    console.log("Failed to update durations, message: ", json.message);
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
