import notifyReqError from "@/stores/notifyReqError";

export default async function searchSavedAppos(query, limit) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/search_saved_appointments`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query.trim(),
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

      console.log("tables", tables);
      for (let row of tables) {
        const [
          appoId,
          savedOn,
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
          savedOn,
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
      return appos;
    } else {
      notifyReqError(json.message);
      console.log(
        "Failed to search saved appointments, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
