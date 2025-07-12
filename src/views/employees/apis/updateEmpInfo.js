import notifyReqError from "@/stores/notifyReqError";

export default async function updateEmpInfo(
  employeeId,
  alias,
  colorId,
  intervalPercent,
  lastDate,
  serviceIds
) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/employees/update_employee_info`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_id: employeeId,
        alias: alias,
        color_id: colorId,
        interval_percent: intervalPercent,
        last_date: lastDate,
        service_ids: serviceIds,
      }),
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return true;
    }

    notifyReqError(json.message);
    console.log(
      "Failed to update employee information, message: ",
      json.message
    );
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
