export default async function fetchServiceLdConflicts(serviceId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/services/get_service_ld_conflicts/${serviceId}`,
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
        });
      }

      return conflicts;
    } else {
      console.log(
        "Failed to fetch service's last date conflicts, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
