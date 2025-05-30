import logIn from "@/views/book_now/comps/welcome_modal/apis/logIn";

export default async function signUp(codeId, code, phoneNum, password) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/authentication/sign_up`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code_id: codeId, code, password }),
    });

    // read status and process response
    if (res.ok) {
      // if sign up succesful, log in
      await logIn(phoneNum, password);
    } else {
      // fetch json
      const json = await res.json();
      console.log("Failed to sign up, message: ", json.message);

      // return the message upon failure
      return json.message;
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
    return e.message;
  }
}
