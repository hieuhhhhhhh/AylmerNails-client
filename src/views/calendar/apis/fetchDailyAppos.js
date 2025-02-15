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
      // refactor data and return result
      // const raw = json.appos;
      // const employees = [];
      // let nextEmpId = null;
      // let i = -1;

      // raw.forEach((appo) => {
      //   // unpack properties and create new employee
      //   const [
      //     appoId,
      //     empId,
      //     serviceId,
      //     AOSOs,
      //     date,
      //     start,
      //     end,
      //     empAlias,
      //     colorCode,
      //   ] = appo;

      //   if (empId !== nextEmpId) {
      //     nextEmpId = empId;
      //     i++;
      //     const employee = { empId, empAlias, colorCode, appos: [] };
      //     employees.push(employee);
      //   }

      //   const newAppo = {
      //     appoId,
      //     empId,
      //     serviceId,
      //     AOSOs,
      //     date,
      //     start,
      //     end,
      //   };
      //   employees[i].appos.push(newAppo);
      // });

      // return employees;

      return json;
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
