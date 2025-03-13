"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { SwiperClass } from "swiper/react";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";
import LottieAnimation from "@/components/lottie-animation/lottie-animation";
import SwipperText from "@/components/swiper-text/swiper-text";
import Header from "@/components/header/header";
import Input from "@/components/input/input";
import { useFormik } from "formik";
import * as yup from "yup";

// Validation Schema
const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function Dashboard() {
  const [showSwiper, setShowSwiper] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showInput, setShowInput] = useState<
    "firstName" | "email" | "result" | ""
  >("");

  const formik = useFormik({
    initialValues: { firstName: "", email: "" },
    validationSchema,
    onSubmit: () => setShowInput("result"),
  });

  useEffect(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // Animasi ketika masuk ke Swiper
  const startSwiper = () => {
    gsap.to(".lottie-animation", {
      scale: 0.5,
      y: "-20%",
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(".lottie-animation p", {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
    setShowSwiper(true);
  };

  // Fungsi untuk melanjutkan ke input berikutnya
  const nextInputStep = () => {
    if (
      showInput === "firstName" &&
      !formik.errors.firstName &&
      formik.values.firstName.trim() !== ""
    ) {
      setShowInput("email");
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (showInput === "email") {
      formik.handleSubmit();
    }
  };

  const handleContinue = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      if (swiper.activeIndex === swiper.slides.length - 1) {
        setIsLastSlide(true);
      } else {
        swiper.slideNext();
      }
    }
  };

  // Fungsi untuk menangani tombol Back
  const handleBack = () => {
    if (showInput === "email") {
      setShowInput("firstName");
    } else if (showInput === "firstName") {
      setShowInput("");
      setShowSwiper(true);
      gsap.to(".lottie-animation", {
        scale: 0.5,
        y: "-20%",
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(".lottie-animation p", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    } else if (showInput === "result") {
      setShowInput("email");
    } else if (swiperRef.current && showSwiper) {
      const swiper = swiperRef.current;
      if (swiper.activeIndex === 0) {
        setShowSwiper(false);
        gsap.to(".lottie-animation", {
          scale: 1,
          y: "0%",
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(".lottie-animation p", {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        swiper.slidePrev();
      }
    } else {
      router.back();
    }
  };

  // Fungsi untuk memulai input pertama
  const handleGetStarted = () => {
    gsap.to(".lottie-animation", {
      scale: 0.2,
      y: "-40%",
      duration: 1,
      ease: "power2.out",
    });
    gsap.to([".hero-text", ".swiper-container", ".header"], {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        setShowInput("firstName");
        setTimeout(() => inputRef.current?.focus(), 100);
      },
    });
  };

  // Fungsi untuk mendapatkan teks deskripsi input
  const getDescription = () => {
    switch (showInput) {
      case "firstName":
        return "Let’s start with the basics. Type in your first name.";
      case "email":
        return "How should we contact you? Type in your email address.";
      case "result":
        return `Thanks, ${formik.values.firstName}! Now, it's time to get a reality check.\n\nThis will take 2-3 minutes.`;
      default:
        return "";
    }
  };

  return (
    <div className="overflow-hidden flex flex-col justify-between h-full">
      <div>
        <Header goBack={handleBack} showGoBack={!!showInput || !!showSwiper} />

        <LottieAnimation
          showDescription={showInput !== ""}
          description={getDescription()}
        />
      </div>

      {showInput === "firstName" && (
        <Input
          onClick={nextInputStep}
          placeholder="Enter your first name"
          value={formik.values.firstName}
          onChange={formik.handleChange("firstName")}
          error={formik.touched.firstName ? formik.errors.firstName : ""}
        />
      )}
      {showInput === "email" && (
        <Input
          onClick={nextInputStep}
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          error={formik.touched.email ? formik.errors.email : ""}
        />
      )}
      {showInput === "result" && (
        <Button fullwidth intent="white">
          Continue
        </Button>
      )}

      {!showInput && (
        <>
          <div
            className={`swiper-container ${showSwiper ? "block" : "hidden"}`}
          >
            <SwipperText
              onSlideChange={(swiper) =>
                setIsLastSlide(swiper.activeIndex === swiper.slides.length - 1)
              }
              onSwipper={(swiper) => (swiperRef.current = swiper)}
            />
          </div>
          <p
            className={`text-center text-2xl mt-4 hero-text text-home ${
              showSwiper ? "hidden" : "block"
            }`}
          >
            Compare your thoughts on{" "}
            <span className="font-bold gradient-color">technology</span> with
            current industry opinions.
          </p>
          <Button
            intent={
              isLastSlide ? "white" : showSwiper ? "primaryOutlined" : "primary"
            }
            fullwidth
            onClick={
              isLastSlide
                ? handleGetStarted
                : showSwiper
                ? handleContinue
                : startSwiper
            }
          >
            {isLastSlide
              ? "Get Started"
              : showSwiper
              ? "Continue"
              : "Get a reality check"}
          </Button>
        </>
      )}
    </div>
  );
}
