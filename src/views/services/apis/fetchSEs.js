import getTodayUnixTime from "@/lib/getTodayUnixTime";
import notifyReqError from "@/stores/notifyReqError";

export default async function fetchServiceEmployees(
  serviceId,
  date = getTodayUnixTime()
) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/services/get_service_employees/${serviceId}/${date}`,
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
      // refactor data and return result
      const raw = json.employees;
      const employees = [];
      raw.forEach((e) => {
        // unpack properties and create new employee
        const [employee_id, alias, last_date, service_id] = e;
        const employee = { employee_id, alias, service_id, last_date };

        employees.push(employee);
      });

      // return result
      return employees;
    } else {
      notifyReqError(json.message);
      console.log(
        "Failed to fetch service's employees, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
