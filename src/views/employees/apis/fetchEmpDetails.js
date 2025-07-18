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
      const [
        emp_id,
        alias,
        colorId,
        colorName,
        colorCode,
        stored_intervals,
        interval_percent,
        last_date,
      ] = raw;

      // fetch intervals
      const si = JSON.parse(stored_intervals);

      const key_intervals = [si[1] / 60, (si[2] - si[1]) / 60];

      // fetch conflicts count
      const scheduleCC = json.schedule_conflicts;
      const lastDateCC = json.ld_conflicts;

      // create and return result
      const details = {
        emp_id,
        alias,
        colorId,
        colorName,
        colorCode,
        key_intervals,
        interval_percent,
        last_date,
        scheduleCC,
        lastDateCC,
      };
      console.log("details: ", details);
      return details;
    } else {
      console.log("Failed to fetch employee details, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
