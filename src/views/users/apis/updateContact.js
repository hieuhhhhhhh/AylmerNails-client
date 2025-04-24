import notifyReqError from "@/stores/notifyReqError";

export default async function updateContact(phoneNum, name) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/appointments/update_contact`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNum,
        name,
      }),
    });
    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return json.contactId;
    } else {
      notifyReqError(json.message);
      console.log("Failed to update contact, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
