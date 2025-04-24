import notifyReqError from "@/stores/notifyReqError";

export default async function searchUsers(query, limit) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/users/search_users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query.replace(/\s+/g, ""),
        limit,
      }),
    });
    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      // res holder
      const users = [];

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
      return users;
    } else {
      notifyReqError(json.message);
      console.log("Failed to search users, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
