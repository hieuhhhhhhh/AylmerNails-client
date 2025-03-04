export default async function fetchAppoLength(serviceId, empId, date, AOSOs) {
  try {
    // return if serviceId is not defined
    if (!serviceId) return;

    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/appointments/get_appo_length`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        employee_id: empId,
        date,
        AOSOs,
      }),
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return json.length;
    } else {
      console.log(
        "Failed to fetch appointment length, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
