import notifyReqError from "@/stores/notifyReqError";

export default async function fetchBusinessLinks() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/business_links/get_all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      // unpack data
      const { phoneNum, address, instagram, email } = json;
      return {
        phoneNum: JSON.parse(phoneNum),
        address: JSON.parse(address),
        instagram: JSON.parse(instagram),
        email: JSON.parse(email),
      };
    } else {
      notifyReqError(json.message);
      console.log("Failed to fetch business links, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
