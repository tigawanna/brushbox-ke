interface BookingSectionFormProps {

}

export function BookingSectionForm({}:BookingSectionFormProps){
return (
  <div className="bg-base-200/30 p-8 rounded-lg border border-primary /20">
    <h3 className="text-2xl font-serif font-semibold mb-6">Request an Appointment</h3>

    <form className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 /70">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 bg-base-200 border border-primary /30 rounded-md focus:outline-hidden focus:border-primary  "
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1 /70">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-4 py-2 bg-base-200 border border-primary /30 rounded-md focus:outline-hidden focus:border-primary  "
            placeholder="Your phone"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1 /70">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 bg-base-200 border border-primary /30 rounded-md focus:outline-hidden focus:border-primary  "
          placeholder="Your email"
          required
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium mb-1 /70">
          Service Requested
        </label>
        <select
          id="service"
          className="w-full px-4 py-2 bg-base-200 border border-primary /30 rounded-md focus:outline-hidden focus:border-primary  "
          required>
          <option value="">Select a service</option>
          <option value="hair">Hair Styling</option>
          <option value="nails">Nail Care</option>
          <option value="facial">Facial Treatment</option>
          <option value="massage">Massage Therapy</option>
          <option value="wax">Waxing</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1 /70">
            Preferred Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full px-4 py-2 bg-base-200 border border-primary /30 rounded-md focus:outline-hidden focus:border-primary  "
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium mb-1 /70">
            Preferred Time
          </label>
          <input
            type="time"
            id="time"
            className="w-full px-4 py-2 bg-base-200 border border-primary /30 rounded-md focus:outline-hidden focus:border-primary  "
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1 /70">
          Special Requests
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full px-4 py-2 bg-base-200 border border-primary /30 rounded-md focus:outline-hidden focus:border-primary   resize-none"
          placeholder="Any special requests or questions?"></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-primary  text-black font-medium py-3 rounded-md transition-colors hover:bg-primary -dark">
        Book Appointment
      </button>
    </form>
  </div>
);
}
