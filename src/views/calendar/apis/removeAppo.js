export default async function removeAppo(appoId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/admin_remove_appointment`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appo_id: appoId }),
      }
    );

    // read status and process response
    if (res.ok) {
      return true;
    } else {
      // fetch json
      const json = await res.json();

      console.log("Failed to remove appointment, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
