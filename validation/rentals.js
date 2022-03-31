const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRentalInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.accomodationStatus = !isEmpty(data.accomodationStatus)
    ? data.accomodationStatus
    : "";
  data.rentRequestAmount = !isEmpty(data.rentRequestAmount)
    ? data.rentRequestAmount
    : "";
  data.monthlySalary = !isEmpty(data.monthlySalary) ? data.monthlySalary : "";
  data.monthlyPaymentPlan = !isEmpty(data.monthlyPaymentPlan)
    ? data.monthlyPaymentPlan
    : "";

  // Accomodation status checks
  if (Validator.isEmpty(data.accomodationStatus)) {
    errors.accomodationStatus = "Accomodation status field is required";
  }
  // Rent request checks
  if (Validator.isEmpty(data.rentRequestAmount)) {
    errors.rentRequestAmount = "Rent Request amount field is required";
  }
  // Monthly salary checks
  if (Validator.isEmpty(data.monthlySalary)) {
    errors.monthlySalary = "Monthly salary field is required";
  }
  // Monthly payment plan checks
  if (Validator.isEmpty(data.monthlyPaymentPlan)) {
    errors.monthlyPaymentPlan = "Monthly payment plan field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
