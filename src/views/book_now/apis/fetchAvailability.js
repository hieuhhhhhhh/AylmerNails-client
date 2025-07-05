import notifyReqError from "@/stores/notifyReqError";

export default async function fetchAvailability(date, services) {
  try {
    console.log("services", services);

    // parse input to payload
    const DELAs_requests = Object.values(services).map(
      ({ empIds, serviceId, AOSOs }) => ({
        employee_ids: empIds,
        service_id: serviceId,
        selected_AOSO: AOSOs,
        date: date,
      })
    );

    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/appointments/get_availability_list`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          DELAs_requests: DELAs_requests,
        }),
      }
    );

    // fetch json
    const json = await res.json();

    // read status and process response
    if (res.ok) {
      console.log("json.DELAs_list: ", json.DELAs_list);

      const serviceSlots = getServiceSlots(json.DELAs_list);
      console.log("serviceSlots: ", serviceSlots);

      const chains = getChains(serviceSlots, services);
      console.log("chains: ", chains);

      const validChains = removeShortChains(chains, DELAs_requests.length);
      return validChains;
    } else {
      notifyReqError(json.message);
      console.log("Failed to fetch availabilities, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}

function getServiceSlots(DELAs_list) {
  console.log("DELAs_list: ", DELAs_list);
  // parent container
  let serviceSlots = [];

  DELAs_list.forEach((DELAs) => {
    // containers
    const grouped = { serviceId: null, slots: [] };
    const slotsMap = new Map();

    // unpack
    const { service_id, values } = DELAs;
    grouped.serviceId = service_id;

    // iterate every employee
    values.forEach((DELA) => {
      // unpack
      const { employee_id, length, slots } = DELA;

      // iterate slots
      slots.forEach((slot) => {
        const start = slot;

        const end = start + length;

        // generate key if need
        if (!slotsMap.has(start)) {
          slotsMap.set(start, new Map()); // Initialize a new Map if start doesn't exist
        }
        if (!slotsMap.get(start).has(end)) {
          const slot = {
            start,
            end,
            empIds: [],
          };
          slotsMap.get(start).set(end, slot);
        }

        // append empId
        slotsMap.get(start).get(end).empIds.push(employee_id);
      });
    });

    // load from Map to slot array
    slotsMap.forEach((childMap) => {
      childMap.forEach((slot) => {
        grouped.slots.push(slot);
      });
    });

    // append
    serviceSlots.push(grouped);
  });

  // return res
  return serviceSlots;
}

function getChains(serviceSlots, services) {
  // container
  let chains = [];

  if (serviceSlots.length > 1) {
    // iterate every service
    serviceSlots.forEach((e, index) => {
      // unpack
      const { serviceId, slots } = e;

      // add serviceId and AOSOs to them
      slots.forEach((slot) => {
        slot.serviceId = serviceId;
        slot.AOSOs = services[serviceId].AOSOs;
        slot.serviceName = services[serviceId].serviceName;
        slot.empAliases = services[serviceId].empAliases;
      });

      // create sub array excluding current element
      const others = [
        ...serviceSlots.slice(0, index),
        ...serviceSlots.slice(index + 1),
      ];

      // fetch chains from recursion
      let childChains = getChains(others, services);

      // append the child with current slots
      childChains = chainsAppend(childChains, slots);
      // merge main slots with child slots
      chains = chains.concat(childChains);
    });

    return chains;
  }

  const last = serviceSlots[0];
  const { serviceId, slots } = last;

  slots.forEach((e) => {
    e.serviceId = serviceId;
    e.AOSOs = services[serviceId].AOSOs;
    e.serviceName = services[serviceId].serviceName;
    e.empAliases = services[serviceId].empAliases;

    // create new chain
    let chain = {
      chainStart: e.start,
      chainEnd: e.end,
      minEnd: e.end,
      slots: [e],
    };
    chains.push(chain);
  });

  return chains;
}

function chainsAppend(chains, slots) {
  for (const chain of chains) {
    for (const slot of slots) {
      const min = chain.chainEnd;
      // const max = chain.chainEnd + 15 * 60;
      if (slot.start === min) {
        chain.slots.push(slot);
        chain.chainEnd = slot.end;
        chain.minEnd += slot.end - slot.start;
        break;
      }
    }
  }
  return chains;
}

function removeShortChains(chains, slotCount) {
  // container
  let newChains = [];

  chains.forEach((chain) => {
    if (chain.slots.length === slotCount) {
      newChains.push(chain);
    }
  });

  return newChains;
}
