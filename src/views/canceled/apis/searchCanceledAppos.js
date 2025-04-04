export default async function searchCanceledAppos(query, limit) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/search_canceled_appointments`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query.replace(/\s+/g, ""),
          limit,
        }),
      }
    );
    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      // res holder
      const appos = [];

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
      return appos;
    } else {
      console.log(
        "Failed to search canceled appointments, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
