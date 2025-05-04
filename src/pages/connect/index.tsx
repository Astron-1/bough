import React, { useState } from "react";
import Header from "@app/components/Header";
import Text, { Font } from "@app/components/Text";
import Link from "next/link";

type FormData = {
  name: string;
  email: string;
  city: string;
  country: string;
  phone: string;
  company: string;
  message: string;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

export default function ConnectPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    city: "",
    country: "",
    phone: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  // CSS keyframes for animations
  const animationStyles = `
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes slideUp {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    @keyframes checkmarkAppear {
      0% { transform: scale(0); opacity: 0; }
      60% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes pulsing {
      0% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.1); opacity: 0.3; }
      100% { transform: scale(1.2); opacity: 0; }
    }
  `;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user types
    if (errors[id as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
      isValid = false;
    }

    // Phone validation (optional field but validate format if provided)
    if (formData.phone.trim()) {
      const phoneRegex =
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          city: "",
          country: "",
          phone: "",
          company: "",
          message: "",
        });

        // Add a slight delay for a smoother transition to success state
        setTimeout(() => {
          setSubmitStatus({
            success: true,
            message: data.message || "Thank you for your message!",
          });
        }, 300);
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f7ff] overflow-x-hidden relative w-full">
      {/* Add style tag with keyframes */}
      <style jsx>{animationStyles}</style>

      {/* Header */}
      <div className="relative z-50">
        <Header transparent={false} />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Background Gradients */}
        <div className="w-[496px] h-[594px] left-[-197px] top-[192px] absolute bg-[rgba(0,116,255,0.30)] shadow-[624px_624px_624px] rounded-full blur-[312px] opacity-70 md:opacity-100"></div>
        <div className="w-[493px] h-[590px] right-[-100px] top-[157px] absolute bg-[rgba(0,116,255,0.30)] shadow-[624px_624px_624px] rounded-full blur-[312px] opacity-70 md:opacity-100"></div>

        {/* Hero Section - 100vh height */}
        <div className="min-h-[calc(100vh-80px)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center py-12 md:py-0">
          <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Column - Headline */}
            <div className="lg:w-[45%] flex flex-col justify-center text-center lg:text-left mb-8 lg:mb-0">
              <Text
                type={Font.GARAMOND}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-black mb-6 lg:mb-8"
              >
                Let&apos;s work together to solve your next big challenge.
              </Text>

              <div className="text-xl md:text-2xl flex items-center justify-center lg:justify-start mt-4 lg:mt-6">
                <Text type={Font.SOURCE_SANS} className="mr-4 text-black">
                  Connect with us on
                </Text>
                <Link
                  href="https://www.linkedin.com"
                  aria-label="LinkedIn"
                  className="inline-block"
                >
                  <svg
                    className="text-[#0A66C2] w-7 h-7 md:w-8 md:h-8"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M27.2655 27.2659H22.5241V19.8405C22.5241 18.0699 22.4925 15.7905 20.0581 15.7905C17.5886 15.7905 17.2108 17.7198 17.2108 19.7116V27.2654H12.4695V11.9959H17.0211V14.0826H17.0849C17.5404 13.3038 18.1987 12.6631 18.9895 12.2287C19.7804 11.7944 20.6742 11.5826 21.5759 11.616C26.3815 11.616 27.2675 14.777 27.2675 18.8893L27.2655 27.2659ZM7.1195 9.90877C5.59988 9.90902 4.36775 8.67727 4.3675 7.15764C4.36725 5.63802 5.59888 4.40589 7.1185 4.40564C8.63812 4.40527 9.87025 5.63702 9.8705 7.15664C9.87063 7.8864 9.58087 8.58632 9.06497 9.10244C8.54906 9.61856 7.84925 9.9086 7.1195 9.90877ZM9.49025 27.266H4.74388V11.9959H9.49012L9.49025 27.266ZM29.6293 0.00226795H2.36137C1.07262 -0.012232 0.01575 1.02014 0 2.30889V29.6905C0.01525 30.9799 1.072 32.0133 2.36125 31.9998H29.6293C30.9213 32.0158 31.9821 30.9824 32 29.6905V2.30677C31.9816 1.01552 30.9206 -0.0167321 29.6293 0.000142951" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:w-[55%] flex justify-center w-full">
              <div className="w-full lg:w-[550px] relative bg-white rounded-[10px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.05)] overflow-hidden p-4 sm:p-6 md:p-8">
                {submitStatus.success ? (
                  <div className="py-12 transition-all duration-500 ease-out">
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-20 h-20 flex items-center justify-center mb-6">
                        {/* Pulsing circles */}
                        <div
                          className="absolute inset-0 rounded-full bg-[rgba(0,82,255,0.15)]"
                          style={{
                            animation: "pulsing 3.5s ease-out infinite",
                          }}
                        ></div>
                        <div
                          className="absolute inset-0 rounded-full bg-[rgba(0,82,255,0.15)]"
                          style={{
                            animation: "pulsing 3.5s ease-out infinite 1.2s",
                          }}
                        ></div>
                        <div
                          className="absolute inset-0 rounded-full bg-[rgba(0,82,255,0.15)]"
                          style={{
                            animation: "pulsing 3.5s ease-out infinite 2.3s",
                          }}
                        ></div>

                        {/* Checkmark container */}
                        <div
                          className="relative z-10 w-16 h-16 bg-[rgba(0,82,255,0.15)] rounded-full flex items-center justify-center"
                          style={{
                            animation:
                              "checkmarkAppear 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-[#0052ff]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>

                      <div
                        style={{
                          animation: "slideUp 0.6s ease-out 0.4s forwards",
                          opacity: 0,
                          transform: "translateY(20px)",
                        }}
                      >
                        <Text
                          type={Font.GARAMOND}
                          className="text-2xl font-semibold text-center mb-4 text-black"
                        >
                          Thank You!
                        </Text>
                      </div>
                      <div
                        style={{
                          animation: "slideUp 0.6s ease-out 0.6s forwards",
                          opacity: 0,
                          transform: "translateY(20px)",
                        }}
                      >
                        <Text
                          type={Font.SOURCE_SANS}
                          className="text-lg text-center text-black/80"
                        >
                          {submitStatus.message}
                        </Text>
                      </div>
                      <div
                        style={{
                          animation: "slideUp 0.6s ease-out 0.8s forwards",
                          opacity: 0,
                          transform: "translateY(20px)",
                        }}
                      >
                        <Text
                          type={Font.SOURCE_SANS}
                          className="text-sm text-center text-black/60 mt-8"
                        >
                          We&apos;ll get back to you shortly.
                        </Text>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {submitStatus.message && !submitStatus.success && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                        {submitStatus.message}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                      {/* Name Field */}
                      <div className="relative">
                        <Text
                          type={Font.SOURCE_SANS}
                          className="block text-black text-lg sm:text-xl font-semibold mb-2"
                        >
                          Name*
                        </Text>
                        <div
                          className={`w-full h-12 bg-[rgba(200,224,253,0.30)] rounded-md relative ${
                            errors.name ? "border-2 border-red-500" : ""
                          }`}
                        >
                          <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full h-full px-4 bg-transparent text-black placeholder:text-black/50 text-sm font-light focus:outline-none"
                            required
                          />
                        </div>
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <Text
                          type={Font.SOURCE_SANS}
                          className="block text-black text-lg sm:text-xl font-semibold mb-2"
                        >
                          Email*
                        </Text>
                        <div
                          className={`w-full h-12 bg-[rgba(200,224,253,0.30)] rounded-md relative ${
                            errors.email ? "border-2 border-red-500" : ""
                          }`}
                        >
                          <input
                            type="email"
                            id="email"
                            placeholder="Enter your company email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full h-full px-4 bg-transparent text-black placeholder:text-black/50 text-sm font-light focus:outline-none"
                            required
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* City Field */}
                      <div className="relative">
                        <Text
                          type={Font.SOURCE_SANS}
                          className="block text-black text-lg sm:text-xl font-semibold mb-2"
                        >
                          City
                        </Text>
                        <div
                          className={`w-full h-12 bg-[rgba(200,224,253,0.30)] rounded-md relative ${
                            errors.city ? "border-2 border-red-500" : ""
                          }`}
                        >
                          <input
                            type="text"
                            id="city"
                            placeholder="Enter your city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full h-full px-4 bg-transparent text-black placeholder:text-black/50 text-sm font-light focus:outline-none"
                          />
                        </div>
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      {/* Country Field */}
                      <div className="relative">
                        <Text
                          type={Font.SOURCE_SANS}
                          className="block text-black text-lg sm:text-xl font-semibold mb-2"
                        >
                          Country
                        </Text>
                        <div
                          className={`w-full h-12 bg-[rgba(200,224,253,0.30)] rounded-md relative ${
                            errors.country ? "border-2 border-red-500" : ""
                          }`}
                        >
                          <input
                            type="text"
                            id="country"
                            placeholder="Enter your country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full h-full px-4 bg-transparent text-black placeholder:text-black/50 text-sm font-light focus:outline-none"
                          />
                        </div>
                        {errors.country && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.country}
                          </p>
                        )}
                      </div>

                      {/* Phone Field */}
                      <div className="relative">
                        <Text
                          type={Font.SOURCE_SANS}
                          className="block text-black text-lg sm:text-xl font-semibold mb-2"
                        >
                          Phone
                        </Text>
                        <div
                          className={`w-full h-12 bg-[rgba(200,224,253,0.30)] rounded-md relative ${
                            errors.phone ? "border-2 border-red-500" : ""
                          }`}
                        >
                          <input
                            type="tel"
                            id="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full h-full px-4 bg-transparent text-black placeholder:text-black/50 text-sm font-light focus:outline-none"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Company Field */}
                      <div className="relative">
                        <Text
                          type={Font.SOURCE_SANS}
                          className="block text-black text-lg sm:text-xl font-semibold mb-2"
                        >
                          Company*
                        </Text>
                        <div
                          className={`w-full h-12 bg-[rgba(200,224,253,0.30)] rounded-md relative ${
                            errors.company ? "border-2 border-red-500" : ""
                          }`}
                        >
                          <input
                            type="text"
                            id="company"
                            placeholder="Enter your company name"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full h-full px-4 bg-transparent text-black placeholder:text-black/50 text-sm font-light focus:outline-none"
                            required
                          />
                        </div>
                        {errors.company && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.company}
                          </p>
                        )}
                      </div>

                      {/* Message Field - Full Width */}
                      <div className="col-span-1 sm:col-span-2 relative mt-2">
                        <Text
                          type={Font.SOURCE_SANS}
                          className="block text-black text-lg sm:text-xl font-semibold mb-2"
                        >
                          Message
                        </Text>
                        <div
                          className={`w-full h-20 bg-[rgba(200,224,253,0.30)] rounded-md relative ${
                            errors.message ? "border-2 border-red-500" : ""
                          }`}
                        >
                          <textarea
                            id="message"
                            placeholder="Enter details about your project"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full h-full p-4 bg-transparent text-black placeholder:text-black/50 text-sm font-light focus:outline-none resize-none"
                          ></textarea>
                        </div>
                        {errors.message && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 md:mt-8 flex justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full sm:w-[200px] h-[45px] bg-[#0052ff] text-white font-semibold text-lg rounded-full transition-colors flex items-center justify-center ${
                          isSubmitting
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:bg-blue-600"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Connect"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Locations Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <Text
            type={Font.GARAMOND}
            className="text-3xl md:text-4xl font-semibold mb-8 md:mb-12 text-black text-center md:text-left"
          >
            Locations
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {/* United States Location */}
            <div>
              <div className="flex items-center mb-4 justify-center md:justify-start">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-4"
                >
                  <g clipPath="url(#clip0_239_19161)">
                    <path
                      d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                      fill="#F0F0F0"
                    />
                    <path
                      d="M19.1301 20H39.9996C39.9996 18.1949 39.759 16.4461 39.3107 14.7826H19.1301V20Z"
                      fill="#D80027"
                    />
                    <path
                      d="M19.1301 9.56422H37.0642C35.8399 7.56641 34.2745 5.80055 32.4493 4.3468H19.1301V9.56422Z"
                      fill="#D80027"
                    />
                    <path
                      d="M19.9997 40C24.7067 40 29.033 38.3732 32.4494 35.6522H7.55005C10.9665 38.3732 15.2928 40 19.9997 40Z"
                      fill="#D80027"
                    />
                    <path
                      d="M2.93521 30.4332H37.0643C38.0472 28.8293 38.8094 27.0762 39.3108 25.2158H0.688721C1.19005 27.0762 1.95231 28.8293 2.93521 30.4332Z"
                      fill="#D80027"
                    />
                    <path
                      d="M9.26437 3.12328H11.087L9.39164 4.35492L10.0392 6.34781L8.34398 5.11617L6.64875 6.34781L7.20813 4.62617C5.71547 5.86953 4.40719 7.32625 3.32906 8.94938H3.91305L2.83391 9.73336C2.66578 10.0138 2.50453 10.2987 2.35 10.5879L2.86531 12.1739L1.90391 11.4754C1.66492 11.9817 1.44633 12.4995 1.24984 13.028L1.81758 14.7755H3.91305L2.21773 16.0071L2.86531 18L1.17008 16.7684L0.154609 17.5062C0.0529687 18.3232 0 19.1554 0 20H20C20 8.95437 20 7.65219 20 0C16.0491 0 12.366 1.14609 9.26437 3.12328ZM10.0392 18L8.34398 16.7684L6.64875 18L7.29633 16.0071L5.60102 14.7755H7.69648L8.34398 12.7826L8.99148 14.7755H11.087L9.39164 16.0071L10.0392 18ZM9.39164 10.181L10.0392 12.1739L8.34398 10.9423L6.64875 12.1739L7.29633 10.181L5.60102 8.94938H7.69648L8.34398 6.95648L8.99148 8.94938H11.087L9.39164 10.181ZM17.2131 18L15.5179 16.7684L13.8227 18L14.4702 16.0071L12.7749 14.7755H14.8704L15.5179 12.7826L16.1654 14.7755H18.2609L16.5655 16.0071L17.2131 18ZM16.5655 10.181L17.2131 12.1739L15.5179 10.9423L13.8227 12.1739L14.4702 10.181L12.7749 8.94938H14.8704L15.5179 6.95648L16.1654 8.94938H18.2609L16.5655 10.181ZM16.5655 4.35492L17.2131 6.34781L15.5179 5.11617L13.8227 6.34781L14.4702 4.35492L12.7749 3.12328H14.8704L15.5179 1.13039L16.1654 3.12328H18.2609L16.5655 4.35492Z"
                      fill="#0052B4"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_239_19161">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <Text
                  type={Font.GARAMOND}
                  className="text-2xl md:text-3xl font-semibold text-black"
                >
                  United States
                </Text>
              </div>
              <Text
                type={Font.SOURCE_SANS}
                className="text-lg md:text-xl leading-relaxed pl-2 text-black text-center md:text-left"
              >
                231 Portside Dr, Edgewater, NJ 07020, United States
              </Text>
            </div>

            {/* India Location */}
            <div>
              <div className="flex items-center mb-4 justify-center md:justify-start">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-4"
                >
                  <g clipPath="url(#clip0_239_19211)">
                    <path
                      d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                      fill="white"
                    />
                    <path
                      d="M20.0001 -0.00158691C12.0709 -0.00158691 5.21962 4.61287 1.98462 11.3028H38.0155C34.7806 4.61287 27.9292 -0.00158691 20.0001 -0.00158691Z"
                      fill="#FF9811"
                    />
                    <path
                      d="M20.0001 39.9994C27.9292 39.9994 34.7806 35.385 38.0156 28.6951H1.98462C5.21962 35.385 12.0709 39.9994 20.0001 39.9994Z"
                      fill="#6DA544"
                    />
                    <path
                      d="M20.0007 26.9553C23.8426 26.9553 26.9572 23.8408 26.9572 19.9988C26.9572 16.1569 23.8426 13.0424 20.0007 13.0424C16.1587 13.0424 13.0442 16.1569 13.0442 19.9988C13.0442 23.8408 16.1587 26.9553 20.0007 26.9553Z"
                      fill="#0052B4"
                    />
                    <path
                      d="M20.0001 24.3467C22.4014 24.3467 24.348 22.4002 24.348 19.9989C24.348 17.5977 22.4014 15.6511 20.0001 15.6511C17.5989 15.6511 15.6523 17.5977 15.6523 19.9989C15.6523 22.4002 17.5989 24.3467 20.0001 24.3467Z"
                      fill="white"
                    />
                    <path
                      d="M20.0006 14.6348L21.3419 17.6769L24.6469 17.3174L22.6832 20L24.6469 22.6826L21.3419 22.3231L20.0006 25.3651L18.6593 22.3231L15.3542 22.6825L17.318 20L15.3542 17.3174L18.6593 17.6769L20.0006 14.6348Z"
                      fill="#0052B4"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_239_19211">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <Text
                  type={Font.GARAMOND}
                  className="text-2xl md:text-3xl font-semibold text-black"
                >
                  India
                </Text>
              </div>
              <Text
                type={Font.SOURCE_SANS}
                className="text-lg md:text-xl leading-relaxed pl-2 text-black text-center md:text-left"
              >
                04-120, Blue 1 Square, Phase IV, Udyog Vihar, Sector 18,
                Gurugram, Haryana 122016
                <br className="hidden md:block" />
                <br className="hidden md:block" />
                R-13 & 14, LGF, Ansal Chamber - II, 6, Bhikaji Cama Place, New
                Delhi – 110066
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </main>
  );
}
