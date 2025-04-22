export default async function fetchAppoDetails(appoId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/get_appo_details/${appoId}`,
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
      console.log("Failed to fetch appo details, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}

function parseApiRes(json) {
  // res holder
  let details = {};

  // unpack appo info
  const [
    id,
    empId,
    serviceId,
    AOSOs,
    date,
    start,
    end,
    message,
    note,
    color,
    empAlias,
    serviceName,
    cateName,
    phoneNumId,
    phoneNum,
    contactName,
    userId,
    savedOn,
  ] = json.appo_details;

  // append info
  details = {
    id,
    empId,
    serviceId,
    AOSOs: JSON.parse(AOSOs),
    date,
    start,
    end,
    message,
    note,
    color,
    empAlias,
    serviceName,
    cateName,
    phoneNumId,
    phoneNum,
    contactName,
    userId,
    savedOn,
    AOSOsText: [],
    selectedEmps: [],
  };

  // read selected employees
  const table = json.appo_emps;
  for (let row of table) {
    const [empId, empAlias] = row;

    // append next employee
    const employee = { empId, empAlias };
    details.selectedEmps.push(employee);
  }

  // read AOSOs
  const AOSOsText = json.AOSOs;
  for (let e of AOSOsText) {
    // unpack
    const [id, question, optionId, answer, offset] = e[0];

    // create new AOSO
    const text = { id, question, optionId, answer, offset };

    // append
    details.AOSOsText.push(text);
  }

  // return result
  console.log("details", details);
  return details;
}
