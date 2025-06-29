import { useMyProfile } from "@/stores/myProfile";

export default async function logOut() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/authentication/log_out_everywhere`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      const MPstore = useMyProfile();
      MPstore.clearMyProfile();
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
