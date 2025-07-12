import notifyReqError from "@/stores/notifyReqError";
import secsToHours from "@/lib/secsToHours";

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
    const res = await fetch(`${baseURL}/api/appointments/admin_add_appo`, {
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
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return json.appo_id;
    } else {
      let message = "An error occurred";
      if (json.error_type == 1) {
        message = `Overlapping appointment ${secsToHours(
          json.start
        )} to ${secsToHours(json.end)}`;
      } else if (json.error_type == 2) {
        message = `Schedule is from ${secsToHours(json.start)} to ${secsToHours(
          json.end
        )}`;
      }
      notifyReqError(message);
      console.log("Failed to add appointment, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
