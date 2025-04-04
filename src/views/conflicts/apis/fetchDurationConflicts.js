export default async function fetchDurationConflicts(serviceId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/services/get_duration_conflicts/${serviceId}`,
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
      let conflicts = [];

      const table = json.conflicts;
      for (let row of table) {
        const [
          serviceId,
          appoId,
          appoDate,
          appoDOW,
          appoStart,
          appoEnd,
          empAlias,
          serviceName,
          contactName,
          phoneNumId,
          phoneNum,
          color,
        ] = row;

        conflicts.push({
          serviceId,
          appoId,
          appoDate,
          appoDOW,
          appoStart,
          appoEnd,
          empAlias,
          serviceName,
          contactName,
          phoneNumId,
          phoneNum,
          color,
        });
      }

      return conflicts;
    } else {
      console.log(
        "Failed to fetch duration conflicts, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
