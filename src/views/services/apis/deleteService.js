import notifyReqError from "@/stores/notifyReqError";

export default async function deleteService(serviceId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/services/delete_service`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
      }),
    });

    // fetch json

    // read status and process response
    if (res.ok) {
      return true;
    } else {
      const json = await res.json();
      notifyReqError(json.message);
      console.log("Failed to delete service, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
