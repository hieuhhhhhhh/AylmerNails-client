export default async function fetchCanceledAppos(limit) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/get_canceled_appointments/${limit}`,
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
      const appos = [];
      const lastTracked = json.last_tracked;

      // unpack
      const tables = json.appos;
      for (let row of tables) {
        const [cancelId, userId, details, time, firstName, lastName, phoneNum] =
          row;

        const appo = JSON.parse(details);
        appo.cancelId = cancelId;
        appo.canceler = { userId, firstName, lastName, phoneNum };
        appo.cancelTime = time;

        appos.push(appo);
      }

      //  return results
      return { appos, lastTracked };
    } else {
      console.log("Failed to fetch booking history, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
