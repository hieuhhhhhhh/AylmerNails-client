export default async function fetchEmployees() {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/employees/get_colors`, {
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
      const newColors = [];

      // refactor data and return result
      const raw = json.colors;
      for (const row of raw) {
        const [colorId, name, code] = row;
        const newColor = { colorId, name, code };
        newColors.push(newColor);
      }

      return newColors;
    } else {
      console.log("Failed to fetch color list, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
