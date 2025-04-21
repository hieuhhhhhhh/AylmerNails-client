export default async function updateAppo(
  appoId,
  phoneNum,
  contactName,
  serviceId,
  AOSOs,
  empId,
  date,
  start,
  duration,
  empIds,
  message,
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
        phone_num: phoneNum,
        name: contactName,
        service_id: serviceId,
        AOSOs,
        emp_id: empId,
        date,
        start,
        end: start + duration,
        selected_emps: empIds,
        message,
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
      console.log(json.start);
      console.log(json.end);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
