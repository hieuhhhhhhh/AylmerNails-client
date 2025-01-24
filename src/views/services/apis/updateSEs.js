export default async function updateServiceEmployees(serviceId, employeeIds) {
  try {
    console.log(employeeIds);

    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/services/update_service_employees`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          employee_ids: employeeIds,
        }),
      }
    );

    // read status and process response
    if (!res.ok) {
      // fetch json
      const json = await res.json();

      console.log("Failed to update members, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
