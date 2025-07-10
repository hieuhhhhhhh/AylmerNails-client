import notifyReqError from "@/stores/notifyReqError";

export default async function searchBookings(query, limit) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/appointments/search_bookings`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query.trim(),
        limit,
      }),
    });
    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      // res holder
      const appos = [];

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
          profileName,
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
          profileName,
          date,
          start,
          end,
        };
        appos.push(appo);
      }

      //  return results
      return appos;
    } else {
      notifyReqError(json.message);
      console.log("Failed to search booking history, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
