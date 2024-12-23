export default function formatPhone(phone) {
  // Remove non-numeric characters
  let cleanedPhone = phone.replace(/\D/g, "");

  // Format the phone number (XXX XXX XXXX)
  if (cleanedPhone.length <= 3) {
    return cleanedPhone;
  } else if (cleanedPhone.length <= 6) {
    return `${cleanedPhone.slice(0, 3)} ${cleanedPhone.slice(3)}`;
  } else {
    return `${cleanedPhone.slice(0, 3)} ${cleanedPhone.slice(
      3,
      6
    )} ${cleanedPhone.slice(6, 10)}`;
  }
}
