import parseTime from "@/lib/parseTime";
export default async function addSchedule(empId, date, openings, closings) {
  try {
    // parse times in openings and closings
    openings = openings.map((e) => parseTime(e));
    closings = closings.map((e) => parseTime(e));

    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/employees/add_schedule`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employee_id: empId,
        effective_from: date,
        opening_times: openings,
        closing_times: closings,
      }),
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return json.added_schedule_id;
    } else {
      console.log("Failed to add schedule, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
