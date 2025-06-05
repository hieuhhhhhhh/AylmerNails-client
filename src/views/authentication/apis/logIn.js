import { useMyProfile } from "@/stores/myProfile";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export default async function logIn(phoneNum, password) {
  try {
    try {
      // parse phone number to E.164
      phoneNum = parsePhoneNumberFromString(phoneNum, "CA").number; // E.164 format
      console.log("phoneNum: ", phoneNum);
    } catch (e) {
      throw new Error("Invalid Phone Number");
    }

    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/authentication/log_in`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_num: phoneNum,
        password,
      }),
    });

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      // update pinia states
      const store = useMyProfile();

      store.setMyProfile({
        token: json.token,
        role: json.user_role,
      });

      return true;
    } else {
      console.log("Failed to log in, message: ", json.message);
      return { message: json.message };
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
    return { message: e.message };
  }
}
