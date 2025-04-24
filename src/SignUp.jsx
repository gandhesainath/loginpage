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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white p-6">
      <Card className="w-full max-w-lg bg-gray-900 border-gray-700 border p-8">
        <CardContent>
          <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide">
            Sign Up
          </h2>

          <p className="mb-3 font-semibold">I am</p>
          <div className="flex gap-6 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="Buyer"
                onChange={() => setRole("Buyer")}
                className="w-5 h-5 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-200"
              />
              Buyer/Owner/Tenant
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="Agent"
                onChange={() => setRole("Agent")}
                className="w-5 h-5 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-200"
              />
              Agent
            </label>
          </div>

          <Input
            placeholder="Full Name"
            className="mb-5"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              className={cn("mb-1", emailError && "border-red-500")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 text-sm mb-3">{emailError}</p>
            )}

            <div className="flex gap-3 mb-5">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                {countries.map((c, i) => (
                  <option key={i} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
              <Input
                placeholder="Phone Number"
                className="flex-1"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mb-5">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
                className="flex-1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-6">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
              <label htmlFor="terms" className="ml-3 cursor-pointer select-none">
                I agree to{" "}
                <a href="/terms" className="underline text-blue-400 hover:text-blue-500">
                  X7IT T&C
                </a>
              </label>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white text-black px-5 py-3 font-bold rounded select-none">
                {captcha}
              </div>
              <Button variant="secondary" onClick={handleRefreshCaptcha}>
                ↻
              </Button>
              <Input
                value={enteredCaptcha}
                onChange={(e) => setEnteredCaptcha(e.target.value)}
                placeholder="Enter CAPTCHA"
                className={cn(captchaError && "border-red-500")}
              />
            </div>
            {captchaError && (
              <p className="text-red-500 text-sm mb-3">{captchaError}</p>
            )}

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg" type="submit">
              Sign Up
            </Button>
            {termsError && (
              <p className="text-red-500 text-sm mb-3">{termsError}</p>
            )}
          </form>

          <p className="mt-6 text-center text-gray-400">
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
