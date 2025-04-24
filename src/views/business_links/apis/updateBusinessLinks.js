import notifyReqError from "@/stores/notifyReqError";

export default async function updateBusinessLinks(
  PNvisible,
  phoneNum,
  ADvisible,
  address,
  addressURL,
  instaVisible,
  instaId,
  instaURL,
  EMvisible,
  email
) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/business_links/update_business_links`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNum: { visible: PNvisible, value: phoneNum },
          address: { visible: ADvisible, value: address, url: addressURL },
          instagram: { visible: instaVisible, value: instaId, url: instaURL },
          email: { visible: EMvisible, value: email },
        }),
      }
    );

    // read status and process response
    if (res.ok) {
      return true;
    } else {
      // fetch json
      const json = await res.json();

      notifyReqError(json.message);
      console.log("Failed to update business links, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
