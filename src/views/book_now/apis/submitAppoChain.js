export default async function submitAppoChain(chain) {
  try {
    // count of presentation of every employee in the chain
    const newSlots = chainToNewSlots(chain);
    console.log("new slots:", newSlots);

    // // call api with newSlots

    // console.log("new slots: ", newSlots);
    // // get app path
    // const baseURL = process.env.VUE_APP_BASE_URL;

    // // start requesting server
    // const res = await fetch(`${baseURL}/api/`, {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     slots: newSlots,
    //   }),
    // });

    // // fetch json
    // const json = await res.json();

    // // read status and process response
    // if (res.ok) {
    //   return true;
    // } else {
    //   console.log(
    //     "Failed to add appointments by chain, message: ",
    //     json.message
    //   );
    // }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}

function chainToNewSlots(chain) {
  // count of presentation of every employee in the chain
  const empCount = {};

  // start counting
  const { slots } = chain;
  for (const slot of slots) {
    const { empIds } = slot;
    for (const empId of empIds) {
      if (!empCount[empId]) {
        empCount[empId] = 0;
      }
      empCount[empId]++;
    }
  }

  // create new array of slots
  const newSlots = [];
  for (const slot of slots) {
    const { start, end, empIds, serviceId } = slot;

    empIds.sort((a, b) => -(empCount[a] - empCount[b]));

    // filter employee ids that have most count
    const max = empIds[0];
    let topEmpIds = empIds; // by default take all values
    for (let i = 0; i < empIds.length; i++) {
      const id = empIds[i];

      if (empCount[id] < max) {
        const j = i - 1;
        topEmpIds = empIds.sliced(0, j);
        break;
      }
    }
    console.log("topEmpIds: ", topEmpIds);

    // get a random emp from the filtered
    const random = Math.floor(Math.random() * topEmpIds.length);

    // create new slot
    const newSlot = { start, end, empId: topEmpIds[random], serviceId };

    newSlots.push(newSlot);
  }

  return newSlots;
}
