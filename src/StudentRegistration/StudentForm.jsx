import { useState } from "react";
import "./StudentForm.css";

function StudentRegistration() {
  const initialForm = {
    name: "",
    register_number: "",
    department: "",
    email: "",
    phone: "",
    event: "",
    event_date: "",
    participation: "",
    details: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSummary(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Enter student name.";
    }

    if (!form.register_number.trim()) {
      newErrors.register_number = "Enter register number.";
    }

    if (!form.department) {
      newErrors.department = "Select department.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Enter email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!form.event) {
      newErrors.event = "Select an event.";
    }

    if (!form.event_date) {
      newErrors.event_date = "Select event date.";
    }

    if (!form.participation) {
      newErrors.participation = "Select participation type.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSummary({ ...form });
    } else {
      setSummary(null);
    }
  }

  function handleReset() {
    setForm({ ...initialForm });
    setErrors({});
    setSummary(null);
  }

  return (
    <div className="registration-container">
      <h1>College Campus Events</h1>
      <h2>Student Registration Form</h2>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Student Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="registration-error">{errors.name}</p>
        )}

        <label htmlFor="register_number">Register Number:</label>
        <input
          id="register_number"
          name="register_number"
          type="text"
          value={form.register_number}
          onChange={handleChange}
        />
        {errors.register_number && (
          <p className="registration-error">
            {errors.register_number}
          </p>
        )}

        <label htmlFor="department">Department:</label>
        <select
          id="department"
          name="department"
          value={form.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">
            Information Technology
          </option>
          <option value="Electronics and Communication">
            Electronics and Communication
          </option>
          <option value="Mechanical Engineering">
            Mechanical Engineering
          </option>
        </select>
        {errors.department && (
          <p className="registration-error">{errors.department}</p>
        )}

        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="registration-error">{errors.email}</p>
        )}

        <label htmlFor="phone">Phone Number:</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          maxLength={10}
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <p className="registration-error">{errors.phone}</p>
        )}

        <label htmlFor="event">Select Event:</label>
        <select
          id="event"
          name="event"
          value={form.event}
          onChange={handleChange}
        >
          <option value="">Select Event</option>
          <option value="Technical Symposium">
            Technical Symposium
          </option>
          <option value="Paper Presentation">Paper Presentation</option>
          <option value="Quiz Competition">Quiz Competition</option>
          <option value="Sports Meet">Sports Meet</option>
        </select>
        {errors.event && (
          <p className="registration-error">{errors.event}</p>
        )}

        <label htmlFor="event_date">Event Date:</label>
        <input
          id="event_date"
          type="date"
          name="event_date"
          value={form.event_date}
          onChange={handleChange}
        />
        {errors.event_date && (
          <p className="registration-error">{errors.event_date}</p>
        )}

        <label>Participation Type:</label>
        <div className="registration-radio">
          <label>
            <input
              type="radio"
              name="participation"
              value="Individual"
              checked={form.participation === "Individual"}
              onChange={handleChange}
            />
            Individual
          </label>

          <label>
            <input
              type="radio"
              name="participation"
              value="Team"
              checked={form.participation === "Team"}
              onChange={handleChange}
            />
            Team
          </label>
        </div>
        {errors.participation && (
          <p className="registration-error">
            {errors.participation}
          </p>
        )}

        <label htmlFor="details">Additional Details:</label>
        <textarea
          id="details"
          name="details"
          rows={4}
          value={form.details}
          onChange={handleChange}
        />

        <div className="registration-buttons">
          <button type="submit">Register</button>
          <button type="button" onClick={handleReset}>
            Clear Form
          </button>
        </div>
      </form>

      {summary && (
        <div className="registration-summary">
          <h2>Registration Successful!</h2>

          {Object.entries(summary).map(([key, value]) => (
            <p key={key}>
              <strong>{key.replaceAll("_", " ")}:</strong>{" "}
              {value || "None"}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentRegistration;