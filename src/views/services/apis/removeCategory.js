import notifyReqError from "@/stores/notifyReqError";

export default async function removeCategory(cate_id) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/services/remove_category`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cate_id: cate_id,
      }),
    });

    // read status and process response
    if (res.ok) {
      return true;
    } else {
      // fetch json
      const json = await res.json();
      notifyReqError(json.message);
      console.log("Failed to add category, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
