import notifyReqError from "@/stores/notifyReqError";

export default async function fetchServicePreview(serviceId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/services/get_service_preview/${serviceId}`,
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
      const [
        ,
        name,
        description,
        ,
        cate_id,
        cate_name,
        length,
        price,
        client_can_book,
      ] = raw;
      const preview = {
        name,
        description,
        cate_id,
        cate_name,
        length,
        price,
        client_can_book,
      };

      // return formatted result
      return preview;
    } else {
      notifyReqError(json.message);
      console.log("Failed to fetch service preview, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
