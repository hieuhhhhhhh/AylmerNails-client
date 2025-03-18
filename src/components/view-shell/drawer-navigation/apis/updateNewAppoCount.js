import { useMyProfile, useNewAppoCount } from "@/stores/myProfile";

const validRoles = ["developer", "admin"];

export default async function updateNewAppoCount() {
  // pinia store
  let store = useMyProfile();

  // get role from the store
  const role = store.role;

  if (!validRoles.includes(role)) return;

  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/appointments/get_new_appo_count`, {
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
      // update the count into the store
      store = useNewAppoCount();
      store.setNewAppoCount(json.count);
    } else {
      console.log("Failed to fetch new appo count, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
