"use client";

import React from "react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function AboutPage() {
  return (
    <section className="px-6 py-20 max-w-4xl mx-auto text-center space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          Welcome to{" "}
          <span className="inline-block bg-primary text-white px-4 py-2 rounded-lg shadow">
            HwRoyals
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          At <strong>HwRoyals</strong>, fashion is more than clothing — it’s a
          statement. We're your go-to destination for curated, trendy, and
          affordable fashion pieces that elevate your everyday style. Whether
          you're dressing up for an event or refreshing your wardrobe, our
          collections are designed to make you feel confident, stylish, and
          truly royal.
        </p>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Discover the latest in fashion for men and women, handpicked for
          quality, comfort, and elegance. At HwRoyals, we don’t just sell
          fashion — we deliver a premium shopping experience.
        </p>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center text-left mt-12">
        <div className="flex items-start gap-4 bg-muted p-6 rounded-lg shadow-md">
          <FaPhone className="text-primary text-xl mt-1" />
          <div>
            <h3 className="text-lg font-semibold">Contact Phone</h3>
            <p className="text-muted-foreground">+234 814 189 8380</p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-muted p-6 rounded-lg shadow-md">
          <FaMapMarkerAlt className="text-primary text-xl mt-1" />
          <div>
            <h3 className="text-lg font-semibold">Office Address</h3>
            <p className="text-muted-foreground">
              Ajoke Mall, Challenge, Ibadan, Oyo State, Nigeria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
