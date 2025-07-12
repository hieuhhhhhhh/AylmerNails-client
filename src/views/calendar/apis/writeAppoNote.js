import notifyReqError from "@/stores/notifyReqError";

export default async function writeAppoNote(appoId, note) {
  try {
    // parse
    if (!note.length) {
      note = null;
    }

    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/write_appointment_note`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appo_id: appoId, note }),
      }
    );

    // read status and process response
    if (res.ok) {
      return true;
    } else {
      // fetch json
      const json = await res.json();

      notifyReqError(json.message);
      console.log("Failed to write appo note, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
