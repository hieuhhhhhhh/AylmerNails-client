import getTodayUnixTime from "@/lib/getTodayUnixTime";

export default async function fetchCategorizedServices() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/services/get_many_services/${getTodayUnixTime()}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // read status and process response
    if (res.ok) {
      // fetch services
      const json = await res.json();

      // refactor services to categories and return result
      const categories = refactorServices(json.all_services);

      return categories;
    } else {
      console.log("Failed to fetch all services, message: ", res.statusText);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}

// re-group services by category_ids, then sort the group by number of services
function refactorServices(raw) {
  // parse array to js object
  const services = raw.map(
    ([service_id, service_name, category_id, category_name]) => ({
      service_id,
      service_name,
      category_id,
      category_name,
    })
  );

  // a map of categories where category_id is key
  const categories = new Map();

  // re-group services based on their category_id
  services.forEach((service) => {
    const { category_id, category_name, service_id, service_name } = service;

    // if key not found in map create new key.
    if (!categories.has(category_id)) {
      categories.set(category_id, {
        category_id,
        category_name,
        services: [], // array of services that has same category_id
      });
    }

    // add the service to the matching category_id
    categories.get(category_id).services.push({ service_id, service_name });
  });

  // sort the map based on the length of prop 'services'
  const sorted = Array.from(categories.values()).sort(
    (a, b) => b.services.length - a.services.length
  );

  // return result
  return sorted;
}
