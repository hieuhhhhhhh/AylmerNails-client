import notifyReqError from "@/stores/notifyReqError";

export default async function deleteEmployee(empId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/employees/delete_employee`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp_id: empId,
      }),
    });

    // fetch json

    // read status and process response
    if (res.ok) {
      return true;
    } else {
      const json = await res.json();
      notifyReqError(json.message);
      console.log("Failed to delete employee, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
