import notifyReqError from "@/stores/notifyReqError";

export default async function fetchServiceDetails(service_id) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/services/get_service_details/${service_id}`,
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
      return getServiceDetails(json);
    } else {
      notifyReqError(json.message);
      console.log("Failed to fetch employee list, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}

function getServiceDetails(json) {
  // fetch service information
  const service_info = json.info;
  const [
    service_id,
    name,
    description,
    first_date,
    last_date,
    duration,
    cate_id,
    cate_name,
    price,
    client_can_book,
  ] = service_info;

  // fetch durations
  const tables = json.durations;
  let empDurations = [];

  for (let row of tables) {
    const [empId, alias, duration] = row;
    empDurations.push({ empId, alias, duration });
  }

  //fetch AOSs
  let AOSs = {};
  const table = json.AOSs;
  table.forEach((row) => {
    const [option_id, name, length_offset, AOS_id, prompt] = row;
    if (!AOSs[AOS_id]) {
      // init an AOS
      AOSs[AOS_id] = { AOS_id, prompt, options: [] };
    }
    // group all options by their AOS_id
    AOSs[AOS_id].options.push({ option_id, name, length_offset });
  });
  // convert to array
  AOSs = Object.values(AOSs);

  // fetch conflicts
  const durationCC = json.duration_conflicts;
  const lastDateCC = json.ld_conflicts;

  // merge all data
  let details = {
    service_id,
    name,
    description,
    first_date,
    last_date,
    cate_id,
    cate_name,
    duration,
    empDurations,
    AOSs,
    durationCC,
    lastDateCC,
    price,
    client_can_book,
  };

  console.log("detaills: ", details);

  // return results
  return details;
}
