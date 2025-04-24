import notifyReqError from "@/stores/notifyReqError";

export default async function banUnbanPhoneNum(phoneNum, boolean) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/users/ban_unban_phone_number`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_num: phoneNum, boolean }),
    });

    // read status and process response
    if (res.ok) {
      return true;
    } else {
      // fetch json
      const json = await res.json();

      notifyReqError(json.message);
      console.log("Failed to ban/unban phone number, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
