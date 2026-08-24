import config from '../config/env.js';

export function successResponse(res, message, data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
}

export function errorResponse(res, message, statusCode = 400, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString()
  });
}

export function generateRegistrationSlip(admission) {
  const regId = admission.registrationNumber || `ITH-${Math.floor(100000 + Math.random() * 900000)}`;
  return {
    organization: config.orgName,
    instituteName: "IT HUNT Institute of Computer Technology & Software Solutions",
    location: config.orgLocation,
    registrationNumber: regId,
    candidateName: admission.fullName || admission.name || "Candidate",
    fatherName: admission.fatherName || "N/A",
    courseSelected: admission.course || admission.program || "MERN Stack Web Development",
    internshipTrack: admission.track || "Full Stack Software Engineering (6 Months)",
    contactNumber: admission.phone || admission.mobile || "N/A",
    emailAddress: admission.email || "N/A",
    admittedStatus: admission.status || "PROVISIONALLY ADMITTED",
    reportingTime: "09:30 AM Onboarding & Workstation Allotment",
    reportingLocation: "IT HUNT Holagarh Campus, Prayagraj, UP",
    issuedAt: admission.createdAt || new Date().toISOString(),
    signatory: config.orgLead,
    signatoryTitle: "Director & Founder, IT HUNT | MCA"
  };
}
