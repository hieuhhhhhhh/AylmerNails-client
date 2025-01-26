export default async function fetchEmpDetails(emp_id) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/employees/get_employee_details/${emp_id}`,
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
      const raw = json.emp_info;
      console.log("raw: ", raw);

      // unpack properties and create new employee
      const [emp_id, alias, stored_intervals, last_date] = raw;

      // fetch intervals
      const si = JSON.parse(stored_intervals);
      const interval1 = si[1];
      const interval2 = si[2] - si[1];
      let intervals = "";

      if (interval1 != interval2) {
        intervals = `${interval1} and ${interval2}`;
      } else {
        intervals = `${interval1}`;
      }

      // create and return result
      const details = { emp_id, alias, intervals, last_date };
      console.log("details: ", details);
      return details;
    } else {
      console.log("Failed to fetch employee details, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
