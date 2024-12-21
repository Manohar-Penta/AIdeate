import { NavComponent } from "@/components/NavComponent";
import React from "react";

export default function Page() {
  return (
    <div>
      <div className="p-2 border-4 border-border m-2 rounded-lg max-w-2xl mx-auto">
        <h1 className="text-4xl italic font-semibold text-center text-primary">
          About Our Blog
        </h1>
        <br />
        <p className="text-xl border-4 border-border p-3 rounded-md">
          Welcome to our blogging platform, where creativity meets technology!
          Here, we empower writers, creators, and enthusiasts to craft engaging,
          impactful, and visually stunning blogs effortlessly. Our platform
          integrates seamlessly with the <b>Unsplash API</b>, giving you access
          to a vast library of high-quality images that breathe life into your
          words. Whether you’re narrating a story, sharing a tutorial, or
          expressing your thoughts, finding the perfect image is just a click
          away. To elevate your writing experience, we’ve harnessed the power of{" "}
          <b>Gemini</b>, an advanced AI writing assistant. From generating ideas
          to refining drafts, Gemini supports you at every stage of the writing
          process. Whether you need inspiration, suggestions, or fine-tuning,
          Gemini is your creative partner, ensuring your content stands out.
        </p>
      </div>
      <br />
      <div className="p-2 border-4 border-border m-2 rounded-lg max-w-2xl mx-auto">
        <h1 className="text-4xl italic font-semibold text-center text-primary">
          About Me
        </h1>
        <br />
        <p className="text-xl border-4 border-border p-3 rounded-md">
          I’m Manohar, a passionate full-stack web developer with a love for
          building innovative and user-friendly websites. With a knack for
          problem-solving and an eye for detail, I strive to create platforms
          that combine functionality with aesthetic appeal. This blog platform
          is a reflection of my dedication to technology and creativity, aiming
          to provide a seamless experience for writers and readers alike. Thank
          you for being a part of this journey. Let’s create something
          extraordinary together!
        </p>
      </div>
    </div>
  );
}
