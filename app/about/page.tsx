"use client";

import React from "react";

function AboutPage() {
  return (
    <section className="text-center py-16 px-4">
      <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl">
        Welcome to
        <span className="bg-primary py-2 px-4 rounded-lg tracking-widest text-white">
          HwRoyals
        </span>
      </h1>
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">
        At <strong>HwRoyals</strong>, fashion is more than clothing — it&apos;s
        a statement. We&apos;re your go-to destination for curated, trendy, and
        affordable fashion pieces that elevate your everyday style. Whether
        you&apos;re dressing up for an event or refreshing your wardrobe, our
        collections are designed to make you feel confident, stylish, and truly
        royal.
      </p>
      <p className="mt-4 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">
        Discover the latest in fashion for men and women, handpicked for
        quality, comfort, and elegance. At HwRoyals, we don&apos;t just sell
        fashion — we deliver a premium shopping experience.
      </p>

      {/* Contact Info */}
      <div className="mt-10 text-base text-muted-foreground">
        <p>
          <strong>Contact:</strong> 08141898380
        </p>
        <p>
          <strong>Office:</strong> Ajoke Mall, Ibadan, Oyo State
        </p>
      </div>
    </section>
  );
}

export default AboutPage;
