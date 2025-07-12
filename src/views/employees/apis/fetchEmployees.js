import getTodayUnixTime from "@/lib/getTodayUnixTime";
import notifyReqError from "@/stores/notifyReqError";

export default async function fetchEmployees() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/employees/get_employees/${getTodayUnixTime()}`,
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
      const raw = json.all_employees;
      const employees = [];
      raw.forEach((e) => {
        // unpack properties and create new employee
        const [employee_id, alias, last_date, is_active, color] = e;
        const employee = { employee_id, alias, last_date, is_active, color };

        employees.push(employee);
      });

      // return result
      console.log("emp: ", employees);
      return employees;
    } else {
      notifyReqError(json.message);
      console.log("Failed to fetch employee list, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
