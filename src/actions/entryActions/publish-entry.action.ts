import { BadRequestError } from "../../errors";
import { Entry, EntryModel, Response } from "../../models";

export const publishEntry = async (requestBody: any) => {
  validateRequest(requestBody);

  const { id, test, version, data } = requestBody;

  console.log("Found ID", id);
  let entry = await Entry.findOne({
    where: {
      user: id,
    },
  });

  if (entry) {
    console.log("Entry found", entry.id);
    await loadResponse(entry, data);
  } else {
    entry = await Entry.create({
      user: id,
      test,
      version,
    });
    await loadResponse(entry, data);
  }

  return Promise.resolve("Success");
};

async function loadResponse(entry: EntryModel, data: any[]) {
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let response = await Response.findOne({
      where: {
        question: item.question,
        entryId: entry.id,
      },
    });
    if (response) {
      response.response = item.response;
      response.time = item.time;
      await response.save();
    } else {
      response = await entry.createResponse({
        question: item.question,
        time: item.time,
        response: item.response,
      });
    }
  }
}

function validateRequest(request: any) {
  if (!request.test) {
    throw new BadRequestError("Missing test parameter");
  }
  if (!request.version) {
    throw new BadRequestError("Missing version parameter");
  }
  if (!request.id) {
    throw new BadRequestError("Missing ID parameter");
  }
  if (request.data.length < 1) {
    throw new BadRequestError("Missing data");
  }
}
