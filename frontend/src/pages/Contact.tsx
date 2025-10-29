import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could integrate an API call to submit contact messages
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-green-600">Contact Us</h1>
      <p className="text-gray-700 mb-6 text-center max-w-xl">
        Have questions or feedback? Fill out the form below and we'll get back to you as soon as possible.
      </p>

      {submitted && (
        <p className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded">
          Your message has been sent successfully!
        </p>
      )}

      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Your Message"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
