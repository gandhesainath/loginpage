import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { cn } from "./lib/utils";

const cities = ["Belgaum"];
const countries = [
  { code: "+91", name: "India" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
  { code: "+61", name: "Australia" } 
];

const generateCaptcha = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export default function SignUp() {
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState(countries[0].code);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [enteredCaptcha, setEnteredCaptcha] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [role, setRole] = useState("");

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setEnteredCaptcha("");
    setEmailError("");
    setCaptchaError("");
    setTermsError("");
  };

  const validateEmail = (email) => {
    if (!email.includes("@")) {
      return "Enter a valid email";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setCaptchaError("");
    setTermsError("");

    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    if (enteredCaptcha.toUpperCase() !== captcha) {
      setCaptchaError("CAPTCHA does not match");
      return;
    }

    if (!termsAccepted) {
      setTermsError("You must accept the terms and conditions");
      return;
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white p-4">
      <Card className="w-[90%] max-w-lg bg-gray-900 border-gray-700 border p-4">
        <CardContent className="p-2">
          <h2 className="text-xl font-extrabold mb-3 text-center tracking-wide">
            Sign Up
          </h2>

          <p className="mb-1 font-semibold text-xs">I am</p>
          <div className="flex gap-3 mb-3 text-xs">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="Buyer"
                onChange={() => setRole("Buyer")}
                className="w-3 h-3 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-200"
              />
              Buyer/Owner/Tenant
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="Agent"
                onChange={() => setRole("Agent")}
                className="w-3 h-3 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-200"
              />
              Agent
            </label>
          </div>

          <Input
            placeholder="Full Name"
            className="mb-2 text-xs"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              className={cn("mb-2 text-xs", emailError && "border-red-500")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 text-[10px] mb-1">{emailError}</p>
            )}

            <div className="flex gap-2 mb-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-1 py-0.5 text-[10px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                {countries.map((c, i) => (
                  <option key={i} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
              <Input
                placeholder="Phone Number"
                className="flex-1 text-xs"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="flex gap-2 mb-2">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-1 py-0.5 text-[10px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                <option value="">Select City</option>
                {cities.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Location"
                className="flex-1 text-xs"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-2 text-[10px]">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms" className="ml-1 cursor-pointer select-none">
                I agree to{" "}
                <a href="/terms" className="underline text-blue-400 hover:text-blue-500">
                  X7IT T&C
                </a>
              </label>
            </div>

            <div className="flex items-center gap-1 mb-2 text-xs">
              <div className="bg-white text-black px-2 py-0.5 font-bold rounded select-none text-[10px]">
                {captcha}
              </div>
              <Button variant="secondary" onClick={handleRefreshCaptcha} className="text-[10px] px-1 py-0.5">
                ↻
              </Button>
              <Input
                value={enteredCaptcha}
                onChange={(e) => setEnteredCaptcha(e.target.value)}
                placeholder="Enter CAPTCHA"
                className={cn(captchaError && "border-red-500", "text-xs")}
              />
            </div>
            {captchaError && (
              <p className="text-red-500 text-[10px] mb-2">{captchaError}</p>
            )}

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-sm" type="submit">
              Sign Up
            </Button>
            {termsError && (
              <p className="text-red-500 text-[10px] mb-2">{termsError}</p>
            )}
          </form>

          <p className="mt-2 text-center text-gray-400 text-[10px]">
            Already Registered?{" "}
            <a href="#" className="underline text-blue-400 hover:text-blue-500">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
