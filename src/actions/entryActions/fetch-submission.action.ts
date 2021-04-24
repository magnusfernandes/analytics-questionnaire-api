import { BadRequestError } from "../../errors";
import { Entry, Response } from "../../models";

export const fetchSubmission = async (requestParams: any) => {
  _validateRequest(requestParams);

  let entry = await Entry.findOne({
    where: {
      user: requestParams.code,
    },
    include: [
      {
        model: Response,
        as: "responses",
      },
    ],
  });

  return Promise.resolve(entry);
};

const _validateRequest = (request: any) => {
  if (!request.code) {
    throw new BadRequestError("Missing code attribute");
  }
};
