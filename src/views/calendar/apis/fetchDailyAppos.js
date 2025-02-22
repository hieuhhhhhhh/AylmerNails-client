export default async function fetchDailyAppos(date) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/get_daily_appos/${date}`,
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
      return parseApiRes(json);
    } else {
      console.log(
        "Failed to fetch daily appointments, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}

function parseApiRes(json) {
  // res holders
  const newEmployees = {};
  let dayStart = null;
  let dayEnd = null;
  // unpack
  const { employees, appos } = json;

  // read data about employees
  for (let emp of employees) {
    // unpack
    const [id, alias, , colorCode, start, end] = emp;

    // create new employee
    const newEmp = { id, alias, colorCode, start, end, appos: [] };
    newEmployees[id] = newEmp;

    // find day's start and day's end
    if (start < dayStart || !dayStart) {
      dayStart = start;
    }
    if (end < dayEnd || !dayEnd) {
      dayEnd = end;
    }
  }

  // read data about appointments
  for (let appo of appos) {
    // unpack
    const [id, empId, serviceId, AOSOs, date, start, end] = appo;

    // create new appointment
    const newAppo = { id, empId, serviceId, AOSOs, date, start, end };

    // append new appointment to employee
    newEmployees[empId].push(newAppo);
  }

  // return all results
  return { employees: newEmployees, dayStart, dayEnd };
}
