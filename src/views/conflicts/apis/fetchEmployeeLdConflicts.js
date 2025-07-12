import notifyReqError from "@/stores/notifyReqError";

export default async function fetchEmployeeLdConflicts(empId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/employees/get_employee_ld_conflicts/${empId}`,
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
      console.log("table", table);
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
          category,
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
          category,
        });
      }

      return conflicts;
    } else {
      notifyReqError(json.message);
      console.log(
        "Failed to fetch employee's last date conflicts, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
