import React, { FC, useEffect, useMemo, useState } from "react";
import { POPULAR_COUNTRIES } from "@/app/countries";

const LOCAL_STORAGE_KEY_PHONE = "wa-helper:last-phone";

function sanitizePhoneNumber(input: string): string {
  const digitsOnly = (input || "").replace(/\D+/g, "");
  return digitsOnly;
}

function buildWaUrl(digits: string): string {
  if (!digits) return "";
  const base = `https://wa.me/${digits}`;
  return base;
}

const Home: FC = () => {
  const [phoneInput, setPhoneInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [countryDial, setCountryDial] = useState("62");
  const sanitizedDigits = useMemo(() => sanitizePhoneNumber(phoneInput), [phoneInput]);

  const isValid = useMemo(() => {
    if (!sanitizedDigits) return false;
    if (sanitizedDigits.length < 8) return false;
    if (sanitizedDigits.length > 15) return false;
    return true;
  }, [sanitizedDigits]);

  const fullNumber = useMemo(() => `${countryDial}${sanitizedDigits}`, [countryDial, sanitizedDigits]);
  const waUrl = useMemo(() => buildWaUrl(fullNumber), [fullNumber]);

  useEffect(() => {
    const lastPhone = localStorage.getItem(LOCAL_STORAGE_KEY_PHONE) || "";
    const lastCountry = localStorage.getItem("wa-helper:last-country") || "62";
    if (lastPhone) setPhoneInput(lastPhone);
    setCountryDial(lastCountry);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PHONE, phoneInput);
  }, [phoneInput]);

  useEffect(() => {
    localStorage.setItem("wa-helper:last-country", countryDial);
  }, [countryDial]);

  

  async function handleCopy() {
    if (!waUrl) return;
    await navigator.clipboard.writeText(waUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    if (!waUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: "WhatsApp Helper", url: waUrl });
      } catch {}
    } else {
      await navigator.clipboard.writeText(waUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleOpen() {
    if (!waUrl) return;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  function onPasteNumber(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text");
    if (!text) return;
    e.preventDefault();
    const cleaned = sanitizePhoneNumber(text);
    setPhoneInput(cleaned);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-4">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            WhatsApp Helper
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
            Start a WhatsApp chat with any number instantly. No need to save contacts first.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="max-w-xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-5 py-3">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Generate WhatsApp Link
              </h2>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Country Code Select */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Country</label>
                <div className="relative">
                  <select
                    className="block w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg py-2 pl-3 pr-8 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={countryDial}
                    onChange={(e) => setCountryDial(e.target.value)}
                  >
                    {POPULAR_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.dialCode}>
                        {c.flag} {c.name} (+{c.dialCode})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-500">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 01.832.445l5 7a1 1 0 01-1.664 1.11L10 5.882 5.832 11.555A1 1 0 014.168 10.445l5-7A1 1 0 0110 3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Phone Number Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Phone Number (without country code)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    placeholder="e.g. 81234567890"
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    onPaste={onPasteNumber}
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Number only, no leading 0</p>
              </div>

              {/* Generated Link Display */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Generated Link
                </label>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  {sanitizedDigits.length === 0 ? (
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">Enter a valid phone number to generate link</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg className={`w-5 h-5 flex-shrink-0 ${isValid ? "text-green-500 dark:text-green-400" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414l3 3a2 2 0 012.828 0 2 2 0 001.414-1.414l1-1a1 1 0 00-1.414-1.414l-1 1a2 2 0 01-2.828 0l-3-3a2 2 0 010-2.828l3-3a2 2 0 012.828 0l1 1z" clipRule="evenodd" />
                      </svg>
                      {isValid ? (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-mono text-xs break-all"
                        >
                          {waUrl}
                        </a>
                      ) : (
                        <span className="text-gray-400 font-mono text-xs break-all cursor-not-allowed" title="Enter 8–15 digits">
                          {`https://wa.me/${fullNumber}`}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  onClick={handleOpen} 
                  disabled={!isValid}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Open WhatsApp</span>
                </button>
                
                <button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  onClick={handleCopy} 
                  disabled={!isValid}
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
                
                <button 
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  onClick={handleShare} 
                  disabled={!isValid}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
