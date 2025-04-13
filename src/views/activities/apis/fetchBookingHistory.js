export default async function fetchBookingHistory(limit) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/get_notifications/${limit}`,
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
        const [
          appoId,
          bookedTime,
          empId,
          empAlias,
          color,
          serviceId,
          serviceName,
          category,
          phoneNumId,
          phoneNum,
          contactName,
          date,
          start,
          end,
        ] = row;

        const appo = {
          appoId,
          bookedTime,
          empId,
          empAlias,
          color,
          serviceId,
          serviceName,
          category,
          phoneNumId,
          phoneNum,
          contactName,
          date,
          start,
          end,
        };
        appos.push(appo);
      }

      //  return results
      return [appos, lastTracked];
    } else {
      console.log("Failed to fetch booking history, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
