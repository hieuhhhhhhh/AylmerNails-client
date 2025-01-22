export default async function submitNewServiceLength(
  serviceId,
  date,
  variations,
  defaultLength
) {
  try {
    const lengthInSec = defaultLength * 60;
    const SLVs = [];
    variations.forEach((variation) => {
      SLVs.push(variation.employee_id);

      const lis = (variation.length - defaultLength) * 60;
      SLVs.push(lis);
    });

    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(`${baseURL}/api/services/add_service_length`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        effective_from: date,
        length: lengthInSec,
        SLVs: SLVs,
      }),
    });
    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      // return result
      return json.added_service_length_id;
    } else {
      console.log(
        "Failed to submit new service length, message: ",
        json.message
      );
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}
