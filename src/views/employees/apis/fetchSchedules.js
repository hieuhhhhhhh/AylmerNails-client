import getTodayUnixTime from "@/lib/getTodayUnixTime";
import parseUnixHours from "@/lib/parseUnixHours";

export default async function fetchSchedules(empId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/employees/get_employee_schedules/${empId}`,
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
      const raw = json.schedules;
      return refactorSchedules(raw);
    } else {
      console.log("Failed to fetch employee list, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}

function refactorSchedules(raw) {
  // result holder
  let schedules = {};

  // iterate every row
  raw.forEach((e) => {
    const [
      day_of_week,
      opening_time,
      closing_time,
      schedule_id,
      effective_from,
    ] = e;

    // group opening and closing times by schedule_ids
    if (day_of_week === "Monday") {
      // reset schedules if expired schedule found
      if (effective_from <= getTodayUnixTime()) {
        schedules = {};
      }

      schedules[schedule_id] = {
        schedule_id,
        date: effective_from,
        openings: [],
        closings: [],
        checked: [],
      };
      schedules[schedule_id].openings = [];
      schedules[schedule_id].closings = [];
    }

    // stack all 7 days of week to one schedule prop
    if (closing_time > opening_time) {
      schedules[schedule_id].openings.push(parseUnixHours(opening_time));
      schedules[schedule_id].closings.push(parseUnixHours(closing_time));
      schedules[schedule_id].checked.push(true);
    } else {
      schedules[schedule_id].openings.push(null);
      schedules[schedule_id].closings.push(null);
      schedules[schedule_id].checked.push(false);
    }
  });

  // sort the map based on the length of prop 'services'
  const sorted = Object.values(schedules).sort((a, b) => a.date - b.date);

  console.log("sorted: ", sorted);

  // return result
  return sorted;
}
