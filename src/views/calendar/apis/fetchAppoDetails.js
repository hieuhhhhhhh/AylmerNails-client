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

  // unpack
  const [
    id,
    empId,
    serviceId,
    ,
    date,
    start,
    end,
    note,
    color,
    empAlias,
    serviceName,
    cateName,
  ] = json.appo_details;

  // append results
  details = {
    id,
    empId,
    serviceId,
    date,
    start,
    end,
    note,
    color,
    empAlias,
    serviceName,
    cateName,
    AOSOs: [],
  };

  // read AOSOs
  const AOSOs = json.AOSOs;
  for (let AOSO of AOSOs) {
    // unpack
    const [id, question, optionId, answer, offset] = AOSO[0];

    // create new AOSO
    const newAOSO = { id, question, optionId, answer, offset };

    // append
    details.AOSOs.push(newAOSO);
  }

  // return result
  return details;
}
