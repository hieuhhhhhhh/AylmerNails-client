import getTodayUnixTime from "@/lib/getTodayUnixTime";

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
      console.log("Failed to fetch employee list, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}

function getServiceDetails(json) {
  // fetch service information
  const service_info = json.service_info[0];
  const [service_id, name, description, last_date, cate_id, cate_name] =
    service_info;

  // fetch service's lengths
  const tables = json.service_lengths;
  let lengths = [];

  for (let i = 0; i < tables.length; i += 2) {
    const raw = tables[i][0];
    const [effective_from, length] = raw;

    if (effective_from <= getTodayUnixTime()) {
      console.log("hey");
      lengths = [];
    }

    const raw_variations = tables[i + 1];
    let variations = [];

    raw_variations.forEach((e) => {
      const variation = {};
      const [employee_id, employee_alias, length_offset] = e;
      variation.employee_id = employee_id;
      variation.employee_alias = employee_alias;
      variation.length_offset = length_offset;

      variations.push(variation);
    });
    const l = { effective_from, length, variations };

    lengths.push(l);
  }

  //fetch AOSs
  let AOSs = {};
  const table = json.service_AOSs;
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

  // merge all data
  let details = {};
  details.service_id = service_id;
  details.name = name;
  details.description = description;
  details.last_date = last_date;
  details.cate_id = cate_id;
  details.cate_name = cate_name;
  details.lengths = lengths;
  details.AOSs = AOSs;

  console.log("detaills: ", details);

  // return results
  return details;
}
