
export default function validateForm(form) {
  const submitAttempt: Event = new Event('submitAttempt');
  form.dispatchEvent(submitAttempt);
  return form.checkValidity();
}
