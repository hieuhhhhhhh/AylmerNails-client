export default async function updateProfile(firstName, lastName) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/users/update_my_profile`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
      }),
    });

    // read status and process response
    if (res.ok) {
      return true;
    } else {
      // fetch json
      const json = await res.json();
      console.log("Failed to update my profile, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
