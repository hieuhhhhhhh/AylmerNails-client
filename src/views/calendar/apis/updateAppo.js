export default async function updateAppo(
  appoId,
  serviceId,
  AOSOs,
  empId,
  date,
  start,
  duration,
  note
) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/appointments/update_appointment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appo_id: appoId,
        service_id: serviceId,
        AOSOs,
        emp_id: empId,
        date,
        start,
        end: start + duration,
        note,
      }),
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return json.appo_id;
    } else {
      console.log("Failed to update appointment, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
