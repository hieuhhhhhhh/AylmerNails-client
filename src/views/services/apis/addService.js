import parseDate from "@/lib/parseDate";
import notifyReqError from "@/stores/notifyReqError";

export default async function addService(
  name,
  categoryId,
  description,
  date,
  duration,
  AOSs,
  employee_ids,
  price,
  clientCanBook
) {
  try {
    // parse AOSs
    const newAOSs = [];
    AOSs.forEach((AOS) => {
      // fetch question
      newAOSs.push(AOS.prompt);

      // fetch options
      const proOptions = [];
      AOS.options.forEach((option) => {
        proOptions.push(option.name);
        proOptions.push(option.length_offset);
      });
      newAOSs.push(proOptions);
    });

    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/services/add_service`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        category_id: categoryId,
        description,
        date: parseDate(date),
        duration,
        AOSs: newAOSs,
        employee_ids,
        price,
        client_can_book: clientCanBook,
      }),
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      return json.added_service_id;
    } else {
      notifyReqError(json.message);
      console.log("Failed to add service, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
