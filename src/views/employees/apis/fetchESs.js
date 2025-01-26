import getTodayUnixTime from "@/lib/getTodayUnixTime";

export default async function fetchEmployeeServices(employeeId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/employees/get_employee_services/${employeeId}/${getTodayUnixTime()}`,
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
      const raw = json.services;
      const service_ids = [];
      raw.forEach((e) => {
        // unpack properties and create new employee
        const [service_id, ,] = e;
        service_ids.push(service_id);
      });

      // return result

      return service_ids;
    } else {
      console.log(
        "Failed to fetch employee's services, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
