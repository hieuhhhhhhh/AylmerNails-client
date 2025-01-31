import getTodayUnixTime from "@/lib/getTodayUnixTime";

export default async function fetchServicePreview(serviceId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/services/get_service_preview/${serviceId}/${getTodayUnixTime()}`,
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
      // return result if successufl
      const raw = json.preview;

      // extract resources
      const [, name, description, , cate_id, cate_name, length] = raw;
      const preview = { name, description, cate_id, cate_name, length };

      // return formatted result
      return preview;
    } else {
      console.log("Failed to fetch service preview, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
