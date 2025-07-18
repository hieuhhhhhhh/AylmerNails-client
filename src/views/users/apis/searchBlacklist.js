export default async function searchBlacklist(query, limit) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/users/search_blacklist`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query.trim(),
        limit,
      }),
    });
    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      // res holder
      const appos = [];

      // unpack
      const tables = json.appos;

      for (let row of tables) {
        const [phoneNum, bannedOn, firstName, lastName, contactName] = row;

        const appo = {
          phoneNum,
          bannedOn,
          firstName,
          lastName,
          contactName,
        };
        appos.push(appo);
      }

      //  return results
      return appos;
    } else {
      console.log("Failed to search on blacklist, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
