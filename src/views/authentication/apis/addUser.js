import { parsePhoneNumberFromString } from "libphonenumber-js";

export default async function addUser(phoneNum, password, firstName, lastName) {
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
    const res = await fetch(`${baseURL}/api/authentication/create_user`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_num: phoneNum,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
    });

    // fetch json return message
    const json = await res.json();
    const userId = json.user_id;
    const message = json.message;

    // return results
    return { userId, message };
  } catch (e) {
    console.error("Unexpected Error: ", e);
    return { message: "Unexpected Error" };
  }
}
