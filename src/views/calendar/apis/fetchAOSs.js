import notifyReqError from "@/stores/notifyReqError";

export default async function fetchAOSs(serviceId) {
  try {
    // get app path
    const baseURL = process.env.VUE_APP_BASE_URL;

    // start requesting server
    const res = await fetch(
      `${baseURL}/api/services/get_add_on_services/${serviceId}`,
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
      // read response
      const raw = json.add_on_services;

      // return formatted result
      return rawToQuestions(raw);
    } else {
      notifyReqError(json.message);
      console.log("Failed to fetch add-on services, message: ", json.message);
    }
  } catch (e) {
    console.error("Unexpected Error: ", e);
  }
}

function rawToQuestions(raw) {
  // result holder
  let questions = [];

  // iterate every element (row)
  let i = -1;
  let currentId = null;
  for (let row of raw) {
    // unpack
    const [optionId, optionText, optionOffset, questionId, questionText] = row;

    // read questionId, if same id do nothing, if new push new question
    if (currentId !== questionId) {
      // push new quesiton
      const question = { questionId, questionText, options: [] };
      questions.push(question);

      // increment index
      currentId = questionId;
      i++;
    }

    // push new option
    const option = { optionId, optionText, optionOffset };
    questions[i].options.push(option);
  }

  // return result
  return questions;
}
