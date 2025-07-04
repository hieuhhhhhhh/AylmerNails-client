import { parsePhoneNumberFromString } from "libphonenumber-js";

export default async function requestOTP(phoneNum) {
  try {
    try {
      // parse phone number to E.164
      phoneNum = parsePhoneNumberFromString(phoneNum, "CA").number; // E.164 format
    } catch (e) {
      return { message: "Invalid phone number" };
    }

    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/authentication/request_otp`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_num: phoneNum,
      }),
    });

    // fetch json return message
    const json = await res.json();
    const codeId = json.code_id;
    const message = json.message;
    const waitTime = json.wait_time;

    // return results
    return { codeId, message, waitTime };
  } catch (e) {
    console.error("Unexpected Error: ", e);
    return { message: "Unexpected Error" };
  }
}
