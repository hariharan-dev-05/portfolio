"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formResponse, setFormResponse] = useState("");

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "36766442-1460-4ee3-a6a1-acd5c6cf79b1",
        name: userInput.name,
        email: userInput.email,
        message: userInput.message,
      }),
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
      setFormResponse(result.message);
    } else {
      setFormResponse("Something went wrong");
    }
    setUserInput({
      name: "",
      email: "",
      message: "",
    });
    setTimeout(() => {
      setFormResponse("");
    }, 5000);
  };

  return (
    <>
      <div>
        <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
          Contact with me
        </p>
        <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
          <p className="text-sm text-[#d3d8e8]">
            {
              "If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."
            }
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-base">Your Name: </label>
              <input
                name="name"
                className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
                type="text"
                maxLength="100"
                required={true}
                onChange={(e) =>
                  setUserInput({ ...userInput, name: e.target.value })
                }
                onBlur={checkRequired}
                value={userInput.name}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base">Your Email: </label>
              <input
                name="email"
                className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
                type="email"
                maxLength="100"
                required={true}
                value={userInput.email}
                onChange={(e) =>
                  setUserInput({ ...userInput, email: e.target.value })
                }
                onBlur={() => {
                  checkRequired();
                  setError({ ...error, email: !isValidEmail(userInput.email) });
                }}
              />
              {error.email && (
                <p className="text-sm text-red-400">
                  Please provide a valid email!
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base">Your Message: </label>
              <textarea
                className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
                maxLength="500"
                name="message"
                required={true}
                onChange={(e) =>
                  setUserInput({ ...userInput, message: e.target.value })
                }
                onBlur={checkRequired}
                rows="4"
                value={userInput.message}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              {error.required && (
                <p className="text-sm text-red-400">All fiels are required!</p>
              )}
              <button
                className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
                role="button"
                onClick={handleSendMail}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Sending Message...</span>
                ) : (
                  <span className="flex items-center gap-1">
                    Send Message
                    <TbMailForward size={20} />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {formResponse && (
        <Toast formResponse={formResponse} setFormResponse={setFormResponse} />
      )}
    </>
  );
}

export default ContactForm;

const Toast = ({ formResponse, setFormResponse }) => {
  return (
    <div className="fixed bottom-5 left-5 w-72 p-4 rounded-lg bg-[#16f2b3] z-[999] shadow-lg flex items-center space-x-3">
      <div className="flex-1">{formResponse}</div>
      <button onClick={() => setFormResponse("")} className="text-white">
        ✖
      </button>
    </div>
  );
};
