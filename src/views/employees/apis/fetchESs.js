import getTodayUnixTime from "@/lib/getTodayUnixTime";

export default async function fetchEmployeeServices(employeeId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/employees/get_employee_services/${employeeId}/${getTodayUnixTime()}`,
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
      const ES_ids = fetchESids(json.services);
      console.log("categories: ", categories);

      console.log("ES_ids: ", ES_ids);
      return { categories, ES_ids };
    } else {
      console.log(
        "Failed to fetch employee's services, message: ",
        json.message
      );
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
    cate_name: "Unclassified",
    services: [],
  };

  rawCategories.forEach((raw) => {
    const [cate_id, cate_name] = raw;
    categories[cate_id] = { cate_id, cate_name, services: [] };
  });

  // re-group services based on their category_id
  rawServices.forEach((raw) => {
    const [service_id, service_name, cate_id, employee_id] = raw;

    // add the service to the matching category_id
    categories[cate_id].services.push({
      service_id,
      service_name,
      cate_id,
      employee_id,
    });
  });

  // remove 'Unclassified' if no services in there
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

function fetchESids(rawServices) {
  // extract employee's services
  const ES_ids = new Set();

  rawServices.forEach((raw) => {
    const [service_id, , , employee_id] = raw;

    // add the service to the matching category_id
    if (employee_id) {
      ES_ids.add(service_id);
    }
  });
  return ES_ids;
}
