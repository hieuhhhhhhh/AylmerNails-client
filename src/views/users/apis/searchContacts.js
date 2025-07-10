import notifyReqError from "@/stores/notifyReqError";

export default async function searchContacts(query, limit) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/appointments/search_contacts`, {
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
      let contacts = [];

      // read json
      const table = json.contacts;

      for (let row of table) {
        const [phoneNum, , name, lastUsed, firstName, lastName] = row;
        const contact = { phoneNum, name, lastUsed, firstName, lastName };
        contacts.push(contact);
      }

      return contacts;
    } else {
      notifyReqError(json.message);
      console.log("Failed to search contacts, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
