import notifyReqError from "@/stores/notifyReqError";

export default async function fetchLastTracked() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/get_canceled_last_tracked`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      // res holder
      const lastTracked = json.last_tracked;
      console.log("last: ", lastTracked);

      return lastTracked;
    } else {
      notifyReqError(json.message);
      console.log(
        "Failed to last tracked on bookings, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
