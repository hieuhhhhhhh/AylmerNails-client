import { useMyProfile } from "@/stores/myProfile";

export default async function logOut() {
  // get app path
  const baseURL = process.env.VUE_APP_BASE_URL;

  // start requesting server
  const res = await fetch(`${baseURL}/api/authentication/log_out`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const MPstore = useMyProfile();
    MPstore.clearMyProfile();
  }
}
