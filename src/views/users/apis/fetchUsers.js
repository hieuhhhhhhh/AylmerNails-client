import notifyReqError from "@/stores/notifyReqError";

export default async function fetchUsers(limit) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/users/get_users/${limit}`, {
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
      // res holder
      const users = [];
      const lastTracked = json.last_tracked;

      // unpack
      const tables = json.users;
      for (let row of tables) {
        const [
          userId,
          phoneNumId,
          phoneNum,
          role,
          firstName,
          lastName,
          joinedOn,
          contactName,
        ] = row;

        const user = {
          userId,
          phoneNumId,
          phoneNum,
          role,
          firstName,
          lastName,
          joinedOn,
          contactName,
        };

        // append user
        users.push(user);
      }

      //  return results
      return { users, lastTracked };
    } else {
      notifyReqError(json.message);
      console.log("Failed to fetch users, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
