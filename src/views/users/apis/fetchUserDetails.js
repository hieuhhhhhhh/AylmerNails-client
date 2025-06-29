import notifyReqError from "@/stores/notifyReqError";

export default async function fetchUsers(userId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/users/get_user_details/${userId}`, {
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
      // unpack
      const [
        role,
        birth,
        phoneNum,
        firstName,
        lastName,
        notes,
        contactName,
        bannedOn,
      ] = json.info;

      // append
      const info = {
        role,
        birth,
        phoneNum,
        firstName,
        lastName,
        notes,
        contactName,
        bannedOn,
        userId,
      };

      // unpack
      const appos = [];
      const tables = json.appos;
      for (let row of tables) {
        const [
          appoId,
          empId,
          empAlias,
          color,
          serviceId,
          serviceName,
          category,
          date,
          start,
          end,
        ] = row;

        const appo = {
          appoId,
          empId,
          empAlias,
          color,
          serviceId,
          serviceName,
          category,
          date,
          start,
          end,
        };

        // append
        appos.push(appo);
      }

      return { info, appos };
    } else {
      notifyReqError(json.message);
      console.log("Failed to fetch users, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
