export default function formatPhone(rawPhone) {
  if (!rawPhone) return;
  let formatted = "";

  rawPhone = rawPhone.slice(2);

  if (rawPhone.length <= 3) {
    formatted = rawPhone;
  } else if (rawPhone.length <= 6) {
    formatted = `${rawPhone.slice(0, 3)} ${rawPhone.slice(3)}`;
  } else {
    formatted = `${rawPhone.slice(0, 3)} ${rawPhone.slice(
      3,
      6
    )} ${rawPhone.slice(6)}`;
  }

  // return result
  return formatted;
}
