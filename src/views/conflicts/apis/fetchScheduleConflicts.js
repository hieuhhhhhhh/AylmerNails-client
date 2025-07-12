import notifyReqError from "@/stores/notifyReqError";

export default async function fetchScheduleConflicts(empId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/employees/get_schedule_conflicts/${empId}`,
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
          empId,
          appoId,
          appoDate,
          appoDOW,
          appoStart,
          appoEnd,
          empAlias,
          serviceName,
          category,
          contactName,
          phoneNumId,
          phoneNum,
          opening,
          closing,
        ] = row;

        conflicts.push({
          empId,
          appoId,
          appoDate,
          appoDOW,
          appoStart,
          appoEnd,
          empAlias,
          serviceName,
          category,
          contactName,
          phoneNumId,
          phoneNum,
          opening,
          closing,
        });
      }

      return conflicts;
    } else {
      notifyReqError(json.message);
      console.log(
        "Failed to fetch schedule conflicts, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
