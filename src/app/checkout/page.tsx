"use client";

import * as Yup from "yup";
import { useRouter } from "next/navigation";
import React, { useRef, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useCart } from "@/context/CartContext";
import { anonymousPro, robotoMono } from "@/lib/fonts";

const Checkout = () => {
  const router = useRouter();
  const { getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);

  const totalPrice = getTotalPrice();
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
    clearCart();
    router.push("/");
  };

  interface ICheckoutFormValues {
    city: string;
    phone: string;
    address: string;
    fullName: string;
    deliveryInstructions: string;
    cvv: string;
    expDate: string;
    cardName: string;
    cardNumber: string;
  }

  const initialValues: ICheckoutFormValues = {
    city: "",
    phone: "",
    address: "",
    fullName: "",
    deliveryInstructions: "",
    cvv: "",
    expDate: "",
    cardName: "",
    cardNumber: "",
  };

  const shippingSchema = Yup.object({
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^\+?[0-9]{7,15}$/, "Enter a valid phone number"),
    address: Yup.string().required("Address is required"),
    fullName: Yup.string().required("Full name is required"),
    deliveryInstructions: Yup.string(),
  });

  const paymentSchema = Yup.object({
    cardNumber: Yup.string()
      .required("Card number is required")
      .matches(/^\d{16}$/, "Card number must be exactly 16 digits"),
    cardName: Yup.string().required("Cardholder name is required"),
    expDate: Yup.string()
      .required("Expiry date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
        "Expiry date must be in MM/YY format"
      ),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  });

  const ShippingForm = () => {
    return (
      <>
        <p className={`text-2xl ${anonymousPro.className} my-3 text-slate-950`}>
          Secure checkout:
        </p>

        <div className={`w-full md:w-2/3 lg:w-1/2 ${robotoMono.className}`}>
          <label htmlFor="fullName" className="mt-3 text-slate-950">
            Full Name
          </label>
          <Field
            name="fullName"
            className="appearance-none my-3 block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
            placeholder="John Doe"
          />
          <ErrorMessage
            name="fullName"
            component="div"
            className="text-red-500 text-sm my-1"
          />

          <label htmlFor="address" className="mt-3 text-slate-950">
            Address
          </label>
          <Field
            name="address"
            className="appearance-none my-3 block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
            placeholder=""
          />
          <ErrorMessage
            name="address"
            component="div"
            className="text-red-500 text-sm my-1"
          />

          <label htmlFor="phone" className="mt-3 text-slate-950">
            Phone number
          </label>
          <Field
            name="phone"
            className="appearance-none my-3 block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
            placeholder="+254 700 00 00"
          />
          <ErrorMessage
            name="phone"
            component="div"
            className="text-red-500 text-sm my-1"
          />

          <label htmlFor="deliveryInstructions" className="mt-3 text-slate-950">
            Delivery instructions
          </label>
          <Field
            rows={3}
            as="textarea"
            name="deliveryInstructions"
            className="appearance-none my-3 block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
            placeholder=""
          />
          <ErrorMessage
            name="deliveryInstructions"
            component="div"
            className="text-red-500 text-sm my-1"
          />
        </div>
      </>
    );
  };

  const PaymentForm = () => {
    return (
      <>
        <div className={`w-full md:w-2/3 lg:w-1/2 ${robotoMono.className}`}>
          <label htmlFor="cardNumber" className="mt-3 text-slate-950">
            Card Number
          </label>
          <Field
            name="cardNumber"
            className="appearance-none my-3 block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
            placeholder="**** **** **** ****"
          />
          <ErrorMessage
            name="cardNumber"
            component="p"
            className="text-red-500 text-sm my-1"
          />

          <div className="flex flex-row justify-between">
            <div>
              <label htmlFor="expirationDate" className="mt-3 text-slate-950">
                Expiration Date (MM/YY)
              </label>
              <Field
                name="expirationDate"
                className="appearance-none my-3 block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
                placeholder="MM/YY"
              />
              <ErrorMessage
                name="expirationDate"
                component="p"
                className="text-red-500 text-sm my-1"
              />
            </div>

            <div>
              <label htmlFor="cvv" className="mt-3 text-slate-950">
                CVV
              </label>
              <Field
                name="cvv"
                className="appearance-none my-3 block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
                placeholder="123"
              />
              <ErrorMessage
                name="cvv"
                component="span"
                className="text-red-500 text-sm my-1"
              />
            </div>
          </div>
          <label htmlFor="cardName" className="mt-3 text-slate-950">
            Card Holder Name
          </label>
          <Field
            name="cardName"
            className="appearance-none my-3 block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
            placeholder="John Doe"
          />
          <ErrorMessage
            name="cardName"
            component="p"
            className="text-red-500 text-sm my-1"
          />
        </div>
      </>
    );
  };

  const Summary = ({ values }: { values: ICheckoutFormValues }) => {
    return (
      <div className="text-slate-950">
        <p className={`${robotoMono.className} text-3xl`}>Purchase summary</p>

        <ul
          className={`text-gray-700 text-base ${robotoMono.className} w-full my-5`}
        >
          <li className={`flex items-start`}>Deliver to: {values.fullName}</li>
          <li className={`flex items-start`}>
            Contact details: {values.phone}
          </li>

          <li className={`flex items-start my-3`}>
            <p className="mr-2">Additional instructions:</p>
            {values.deliveryInstructions}
          </li>
          <span className="text-green-500">Is this correct?</span>
        </ul>

        <p className={`${robotoMono.className} mt-5`}>
          Total cost: ${totalPrice}.00
        </p>
      </div>
    );
  };

  return (
    <div className="container mx-auto pt-5">
      <div className="flex gap-2 mb-4 w-full justify-between">
        {stepIndicators.map((step, index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null) => {
              stepRefs.current[index] = el;
            }}
            className={`${anonymousPro.className} w-8 h-8 text-sm font-medium rounded-full transition-colors text-center bg-gray-100 text-slate-950`}
          >
            <p className="m-auto pt-1">{step}</p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-2xl p-5 border-[0.5px] border-slate-500">
        <Formik
          initialValues={initialValues}
          validationSchema={
            currentStep === 0
              ? shippingSchema
              : currentStep === 1
              ? paymentSchema
              : null
          }
          onSubmit={(values, { setSubmitting }) => {
            if (currentStep < stepIndicators.length - 1) {
              setCurrentStep((prev) => prev + 1);
            } else {
              if (currentStep > 2) {
                handleCompletePurchase();
              }
            }
            setSubmitting(false);
          }}
        >
          {({ values, isValid, dirty }) => (
            <Form className="space-y-6 w-full">
              {currentStep === 0 && <ShippingForm />}
              {currentStep === 1 && <PaymentForm />}
              {currentStep === 2 && <Summary values={values} />}

              <div className="flex gap-2 w-full justify-between">
                <button
                  className={`${anonymousPro.className} mt-3 bg-gray-800 text-white px-5 py-2 rounded-none shadow-md hover:bg-gray-700 transition duration-300 transform hover:-translate-y-0.5`}
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Previous
                </button>
                {currentStep < stepIndicators.length - 1 ? (
                  <button
                    type="submit"
                    disabled={!isValid && !dirty}
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Checkout;
