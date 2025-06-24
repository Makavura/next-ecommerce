"use client";

import React, { useRef, useEffect, useState } from "react";

import { anonymousPro } from "@/lib/fonts";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const stepIndicators = [1, 2, 3];
  const stepRefs = useRef<(HTMLDivElement | null | undefined)[]>([]);

  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, stepIndicators.length - 1));

  const handlePrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    stepRefs.current.forEach((el, index) => {
      if (!el) return;
      el.classList.remove("bg-slate-50", "bg-slate-900", "bg-gray-200");
      if (index === currentStep) el.classList.add("bg-green-500");
      else if (index < currentStep)
        el.classList.add("bg-slate-900", "text-white", "shadow-2xl");
      else el.classList.add("bg-gray-200");
    });
  }, [currentStep]);

  const handleCompletePurchase = () => {
    console.log("Complete");
  };

  return (
    <div className="container mx-auto pt-5">
      <div className="flex gap-2 mb-4 w-full justify-between">
        {stepIndicators.map((step, index) => (
          <div
            key={index}
            // @ts-expect-error ref type mapping conflict
            ref={(el) => (stepRefs.current[index] = el)}
            className={`${anonymousPro.className} w-8 h-8 text-sm font-medium rounded-full transition-colors text-center bg-gray-100 text-slate-950`}
          >
            <p className="m-auto pt-1">{step}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 w-full justify-between bg-white shadow-2xl p-5 border-[0.5px] border-slate-500">
        <button
          className={`${anonymousPro.className} mt-3 bg-gray-800 text-white px-5 py-2 rounded-none shadow-md hover:bg-gray-700 transition duration-300 transform hover:-translate-y-0.5`}
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        {currentStep < stepIndicators.length - 1 ? (
          <button
            className={`${anonymousPro.className} mt-3 bg-gray-800 text-white px-5 py-2 rounded-none shadow-md hover:bg-gray-700 transition duration-300 transform hover:-translate-y-0.5`}
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className={`${anonymousPro.className} mt-3 bg-gray-800 text-white px-5 py-2 rounded-none shadow-md hover:bg-gray-700 transition duration-300 transform hover:-translate-y-0.5`}
            onClick={handleCompletePurchase}
          >
            Complete purchase
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
