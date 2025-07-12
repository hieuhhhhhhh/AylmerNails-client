import notifyReqError from "@/stores/notifyReqError";

export default async function fetchActiveServices(unixDate) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/services/get_services/${unixDate}`,
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
      // refactor services to categories and return result
      const categories = refactorServices(json.services, json.categories);

      return categories;
    } else {
      notifyReqError(json.message);
      console.log("Failed to fetch employee list, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}

// re-group services by category_ids, then sort the group by number of services
function refactorServices(rawServices, rawCategories) {
  // a map of categories where category_id is key
  const categories = {};
  categories[null] = {
    cate_id: null,
    cate_name: "Others",
    services: [],
  };

  rawCategories.forEach((raw) => {
    const [cate_id, cate_name] = raw;
    categories[cate_id] = { cate_id, cate_name, services: [] };
  });

  // re-group services based on their category_id
  rawServices.forEach((raw) => {
    const [service_id, service_name, last_date, is_active, cate_id] = raw;

    // add the service to the matching category_id
    if (is_active) {
      categories[cate_id].services.push({
        service_id,
        service_name,
        last_date,
      });
    }
  });

  // remove category if no services in there
  if (!categories[null].services.length > 0) {
    delete categories[null];
  }

  // sort the map based on the length of prop 'services'
  const sorted = Object.values(categories).sort(
    (a, b) => b.services.length - a.services.length
  );

  // return result
  return sorted;
}
