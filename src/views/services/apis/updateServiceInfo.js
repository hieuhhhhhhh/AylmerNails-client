export default async function updateServiceInfo(
  serviceId,
  name,
  description,
  categoryId,
  lastDate
) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/services/update_service_info`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        name: name,
        description: description,
        category_id: categoryId,
        last_date: lastDate,
      }),
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (!res.ok) {
      console.log(
        "Failed to update service information, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
