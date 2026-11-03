
import { useState } from "react";
import { useEvents } from "../context/EventContext";
import "./StudentForm.css";

function StudentRegistration() {
  const { state, dispatch } = useEvents();
  const { events, registered } = state;

  const initialForm = {
    name: "",
    email: "",
    department: "",
    year: "",
    password: "",
    attendance: "",
    event: "",
    accessibility: false,
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSummary(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.department) {
      newErrors.department = "Please select your department.";
    }

    if (!form.year) {
      newErrors.year = "Please select your year of study.";
    }

    if (!form.attendance) {
      newErrors.attendance = "Please select an attendance mode.";
    }

    if (!form.event) {
      newErrors.event = "Please select an event.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSummary(null);
      return;
    }

    const selectedEvent = events.find(
      (event) => String(event.id) === form.event
    );

    if (selectedEvent && !registered.includes(selectedEvent.id)) {
      dispatch({
        type: "REGISTER_EVENT",
        payload: { id: selectedEvent.id },
      });
    }

    setSummary({
      ...form,
      eventTitle: selectedEvent?.title || "Selected Event",
    });
  }

  function handleReset() {
    setForm({ ...initialForm });
    setErrors({});
    setSummary(null);
  }

  return (
    <section className="registration-page">
      <div className="registration-container">
        <div className="registration-heading">
          <p className="registration-eyebrow">SAVE YOUR SEAT</p>
            <h1>Student Event Registration</h1>
          <p>Complete the required fields to register for a campus event.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="registration-grid">
            <div className="registration-field">
              <label htmlFor="student-name">Student Name</label>
              <input
                id="student-name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <small>{errors.name}</small>}
            </div>

            <div className="registration-field">
              <label htmlFor="student-email">Email Address</label>
              <input
                id="student-email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <small>{errors.email}</small>}
            </div>

            <div className="registration-field">
              <label htmlFor="student-department">Department</label>
              <select
                id="student-department"
                name="department"
                value={form.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Computer Science and Business Systems">
                  Computer Science and Business Systems
                </option>
                <option value="Electronics and Communication">
                  Electronics and Communication
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Other">Other</option>
              </select>
              {errors.department && <small>{errors.department}</small>}
            </div>

            <div className="registration-field">
              <label htmlFor="student-year">Year of Study</label>
              <input
                id="student-year"
                name="year"
                type="number"
                min="1"
                max="4"
                placeholder="Example: 2"
                value={form.year}
                onChange={handleChange}
              />
              {errors.year && <small>{errors.year}</small>}
            </div>

            <div className="registration-field">
              <label htmlFor="student-password">
                Password <span>(Optional demo field)</span>
              </label>
              <input
                id="student-password"
                name="password"
                type="password"
                placeholder="Enter a password"
                value={form.password}
                onChange={handleChange}
              />
              <small className="field-hint">
                This is a teaching example only; no password is saved or sent.
              </small>
            </div>

            <fieldset className="registration-field">
              <legend>Attendance Mode</legend>

              <div className="attendance-options">
                <label>
                  <input
                    type="radio"
                    name="attendance"
                    value="In person"
                    checked={form.attendance === "In person"}
                    onChange={handleChange}
                  />
                  In person
                </label>

                <label>
                  <input
                    type="radio"
                    name="attendance"
                    value="Online"
                    checked={form.attendance === "Online"}
                    onChange={handleChange}
                  />
                  Online
                </label>
              </div>

              {errors.attendance && <small>{errors.attendance}</small>}
            </fieldset>

            <div className="registration-field">
              <label htmlFor="student-event">Select Event</label>
              <select
                id="student-event"
                name="event"
                value={form.event}
                onChange={handleChange}
              >
                <option value="">Choose an event</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
              {errors.event && <small>{errors.event}</small>}
            </div>

          </div>
          <br></br>
          <div className="registration-field">
              <label className="accessibility-option">
                <input
                  type="checkbox"
                  name="accessibility"
                  checked={form.accessibility}
                  onChange={handleChange}
                />
                I would like the team to contact me about accessibility support.
              </label>
          </div>
          <br></br>
          <div className="registration-field">
              <label htmlFor="student-message">
                Additional Message <span>(Optional)</span>
              </label>
              <textarea
                id="student-message"
                name="message"
                rows="2"
                placeholder="Any questions or notes for the event team?"
                value={form.message}
                onChange={handleChange}
              />
            </div>


          <div className="registration-buttons">
            <button type="submit" className="submit-registration">
              Submit Registration
            </button>

            <button
              type="button"
              className="reset-registration"
              onClick={handleReset}
            >
              Reset Form
            </button>
          </div>
        </form>

        {summary && (
          <div className="registration-summary">
            <h2>Registration Successful!</h2>
            <p>Your event registration has been submitted successfully.</p>
            <p><strong>Name:</strong> {summary.name}</p>
            <p><strong>Email:</strong> {summary.email}</p>
            <p><strong>Event:</strong> {summary.eventTitle}</p>
            <p><strong>Attendance:</strong> {summary.attendance}</p>
            <p><strong>Department:</strong> {summary.department}</p>
            <p><strong>Year:</strong> {summary.year}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default StudentRegistration;
