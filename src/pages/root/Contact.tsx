import React from "react"
import Footer from "../../components/shared/Footer"
import Navbar from "../../components/shared/Navbar"


const Contact: React.FC = () => {
  return (
    <div className="">
    <Navbar />
    <div data-aos='fade-left'>
        {/* Header Section */}
        <header className="bg-rose-600 text-white py-6">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold">Contact Us</h1>
            </div>
        </header>

        {/* Contact Information Section */}
        <section className="bg-gray-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                    We’d love to hear from you! Whether you have a question about your booking, need assistance, or just want to give us feedback,
                    feel free to reach out to us through any of the methods below.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        {/* Phone Contact */}
                        <div className="flex items-center">
                            <div className="bg-white p-4 rounded-lg shadow-md w-full">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
                                <p className="text-lg text-gray-600">
                                    Call us at: <a href="tel+8801951896476" className="text-rose-600">+880 1951896476</a>
                                </p>
                                <p className="text-lg text-gray-600">We’re available 24/7 to assist you.</p>
                            </div>
                        </div>

                        {/* Email Contact */}
                        <div className="flex items-center">
                            <div className="bg-white p-4 rounded-lg shadow-md w-full">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                                <p className="text-lg text-gray-600">
                                    Send us an email at: <a href="mailto:mirnoman12@gmail.com" className="text-rose-600">mirnoman12@gmail.com</a>
                                </p>
                                <p className="text-lg text-gray-600">We’ll get back to you as soon as possible.</p>
                            </div>
                        </div>

                        {/* Physical Address */}
                        <div className="flex items-center">
                            <div className="bg-white p-4 rounded-lg shadow-md w-full">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Us</h3>
                                <p className="text-lg text-gray-600">
                                    123/7, Notun bazar, Dhaka, Bangladesh
                                </p>
                                <p className="text-lg text-gray-600">Office hours: Mon-Fri, 9 AM - 6 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="flex items-center ">
                        <div className="bg-white p-4 py-8 rounded-lg shadow-md w-full">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Contact Form</h3>
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                                />
                                <textarea
                                    placeholder="Your Message"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:border-transparent"
                                    rows={4}
                                />
                                <button
                                    type="button"
                                    className="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition duration-200"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Map Section */}
        <section className="bg-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Location</h2>
                <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md">
                    {/* Replace with actual map embed code or image */}
                    <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14375.22845120466!2d89.27522699056138!3d25.743891577437427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e32de6fca6019b%3A0x9fa496e687f818c8!2sRangpur!5e0!3m2!1sen!2sbd!4v1725338239792!5m2!1sen!2sbd" allowFullScreen={undefined} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>
    </div>
    <Footer />
</div>
  )
}

export default Contact