import { useRequestError } from "./myProfile";

let REstore;

export default function notifyReqError(message) {
  if (!REstore) {
    REstore = useRequestError();
  }
  REstore.setMessage(message);
}
