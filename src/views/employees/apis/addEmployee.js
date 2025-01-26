export default async function addService(alias, key_intervals, service_ids) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

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
        service_ids: service_ids,
      }),
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return json.added_employee_id;
    } else {
      console.log("Failed to add employee, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
