import notifyReqError from "@/stores/notifyReqError";

export default async function addAppo(
  phoneNum,
  contactName,
  serviceId,
  AOSOs,
  empId,
  date,
  start,
  duration,
  note
) {
  try {
    console.log("note", note);
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/add_appointment_manually`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_num: phoneNum,
          name: contactName,
          service_id: serviceId,
          AOSOs,
          emp_id: empId,
          date,
          start,
          end: start + duration,
          note,
        }),
      }
    );

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return json.appo_id;
    } else {
      notifyReqError(json.message);
      console.log("Failed to add appointment, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
