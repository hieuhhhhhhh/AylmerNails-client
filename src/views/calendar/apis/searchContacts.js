import notifyReqError from "@/stores/notifyReqError";

export default async function searchContacts(query) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;
    const endpoint = query ? `/${query}` : "";

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/search_contacts${endpoint}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      // res holder
      let contacts = [];

      // read json
      const table = json.contacts;

      for (let row of table) {
        const [phoneNum, , name, lastUsed] = row;
        const contact = { phoneNum, name, lastUsed };
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
