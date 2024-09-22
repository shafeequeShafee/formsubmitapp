const feedbackFormValidation = (formValues) => {
  const errors = {};

  if (!formValues.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formValues.contactNumber.trim()) {
    errors.contactNumber = "Contact number is required";
  } else if (!/^\d{10}$/.test(formValues.contactNumber)) {
    errors.contactNumber = "Contact number should be 10 digits";
  }

  if (!formValues.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
    errors.email = "A valid email address is required";
  }

  if (formValues.satisfactionLevel <1) {
    errors.satisfactionLevel = "Please rate your experience";
  }

  if (!formValues.feedback.trim()) {
    errors.feedback = "Feedback is required";
  }

  return errors;
};

export { feedbackFormValidation };
