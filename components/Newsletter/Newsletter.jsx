"use client";
import React, { useState } from "react";
import { post } from "@/api/api";
import { toast } from "react-toastify";
import Image from "next/image";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const changeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email?.includes("@")) {
      setError(true);
      toast.error("Mejl nije validan", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setError(false);
      await post("/newsletter", { email: email }).then((response) => {
        if (response?.code !== 200) {
          setEmail("");
          toast.error(response?.payload?.message || "Error 404", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setError(true);
        } else {
          setEmail("");
          setError(false);
          toast.success(response?.payload?.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }
  };

  return (
    <div
      className="sectionPaddingX marginBottomSection mt-20 md:mt-[100px]"
      data-aos="fade-up"
    >
      <div className="relative flex min-h-[450px] w-full items-center justify-center overflow-hidden rounded-[24px] lg:rounded-[30px] 2xl:rounded-[50px]">
        {/* Background image */}
        <Image
          src="/images/newsletter.jpg"
          alt="Newsletter background"
          fill
          className="h-full w-full object-cover"
          priority
        />
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-10 text-center">
        <h2 className="titleH2 mb-10 leading-snug text-center">
  Budite u toku sa<br />
  <span className="block md:inline">najnovijim informacijama...</span>
</h2>
          <form
            className="mx-auto flex w-full justify-center"
            onSubmit={onSubmit}
          >
            <div className="relative w-full max-w-[540px]">
              <input
                placeholder="Unesi svoj email"
                type="text"
                id="email"
                name="email"
                onChange={changeHandler}
                value={email}
                className={`w-full rounded-full bg-[#ada391] px-8 py-4 text-lg font-light text-white placeholder-white focus:outline-none ${error ? "border-2 border-red-500" : "border-none"}`}
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition"
                aria-label="Pošalji"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </form>
          <p className="mt-10 text-xl font-light">
            Uživajte u kupovini najnovijih proizvoda uz aktuelne popuste.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
