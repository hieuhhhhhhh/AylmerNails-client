import notifyReqError from "@/stores/notifyReqError";

export default async function addEmployee(
  alias,
  key_intervals,
  intervalPercent,
  colorId,
  service_ids
) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // convert to secs
    key_intervals = key_intervals.map((e) => e * 60);

    // start requesting server
    const res = await fetch(`${baseURL}/api/employees/add_employee`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alias: alias,
        key_intervals: key_intervals,
        interval_percent: intervalPercent,
        color_id: colorId,
        service_ids: service_ids,
      }),
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return json.added_employee_id;
    } else {
      notifyReqError(json.message);
      console.log("Failed to add employee, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
