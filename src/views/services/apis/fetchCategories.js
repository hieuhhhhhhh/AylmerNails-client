import notifyReqError from "@/stores/notifyReqError";

export default async function fetchCategories() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/services/get_categories`, {
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
      // refactor data and return result
      const raw = json.categories;
      const cates = [];
      raw.forEach((e) => {
        // unpack properties and create new category
        const [cate_id, name] = e;
        const category = { cate_id, name };

        cates.push(category);
      });

      // return result
      return cates;
    } else {
      notifyReqError(json.message);
      console.log("Failed to fetch categories list, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
