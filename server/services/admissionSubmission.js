const ADMISSION_FIELDS = [
  'fatherName',
  'motherName',
  'dob',
  'gender',
  'course',
  'track',
  'qualification',
  'district',
  'address',
  'utrNo',
  'paymentMode',
  'amountPaid'
];

export function buildPendingAdmissionRecord(body, {
  registrationNo,
  candidateName,
  email,
  phone,
  mobile,
  date,
  time,
  createdAt
}) {
  const submittedFields = Object.fromEntries(
    ADMISSION_FIELDS
      .filter(field => body[field] !== undefined)
      .map(field => [field, body[field]])
  );

  return {
    ...submittedFields,
    id: registrationNo,
    registrationNo,
    registrationNumber: registrationNo,
    candidateName,
    fullName: candidateName,
    email,
    phone,
    mobile,
    course: body.course || body.track || "NIELIT 'A' Level Diploma",
    status: 'Pending Verification',
    feeStatus: 'Pending Verification',
    admissionConfirmed: false,
    amountPaid: body.amountPaid || '₹0',
    date,
    time,
    createdAt
  };
}
