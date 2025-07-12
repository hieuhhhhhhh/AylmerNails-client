import notifyReqError from "@/stores/notifyReqError";

export default async function fetchMyProfile() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/users/get_my_profile`, {
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
      // read info
      const [role, birth, phoneNum, firstName, lastName, notes, contactName] =
        json.info;
      const userInfo = {
        role,
        birth,
        phoneNum,
        firstName,
        lastName,
        notes,
        contactName,
      };

      // read user's appointments
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
        appos.push(appo);
      }

      // return 2 results
      return { userInfo, appos };
    } else {
      notifyReqError(json.message);
      console.log("Failed to fetch my profile, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
