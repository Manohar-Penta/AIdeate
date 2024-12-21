import { NavComponent } from "@/components/NavComponent";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="p-4 border-4 border-border m-2 rounded-lg max-w-4xl mx-auto mt-10 shadow-md">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Terms and Conditions
        </h1>
        <p className="text-secondary-foreground mb-4">
          Welcome to our blogging platform! By using our website, you agree to
          comply with the following terms and conditions. Please read them
          carefully. If you do not agree with these terms, please refrain from
          using our services.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">
          1. Use of the Platform
        </h2>
        <ul className="list-disc list-inside text-secondary-foreground space-y-2">
          <li>
            <strong>Eligibility:</strong> You must be at least 13 years old to
            use this platform. If you are under 18, you must have parental or
            guardian consent.
          </li>
          <li>
            <strong>Account Security:</strong> You are responsible for
            maintaining the confidentiality of your account credentials. Notify
            us immediately if you suspect unauthorized access.
          </li>
          <li>
            <strong>Content Ownership:</strong> All content you create and post
            remains your intellectual property. However, by posting content on
            the platform, you grant us a non-exclusive, royalty-free license to
            display and distribute it as part of our services.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">
          2. Prohibited Activities
        </h2>
        <p className="text-secondary-foreground mb-2">You agree not to:</p>
        <ul className="list-disc list-inside text-secondary-foreground space-y-2">
          <li>
            Post content that is illegal, defamatory, or violates intellectual
            property rights.
          </li>
          <li>
            Use the platform for spam, phishing, or fraudulent activities.
          </li>
          <li>
            Attempt to compromise the website’s security or interfere with its
            functionality.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">
          3. Image Usage via Unsplash API
        </h2>
        <p className="text-secondary-foreground mb-4">
          Our platform integrates with the Unsplash API to provide images for
          your blogs. By using these images, you agree to comply with Unsplash’s
          licensing terms. We are not responsible for any misuse of these
          images.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">
          4. AI Writing Support with Gemini
        </h2>
        <p className="text-secondary-foreground mb-4">
          Our platform includes AI-powered writing tools via Gemini to enhance
          your writing experience. While we strive for accuracy and creativity,
          we do not guarantee the factual correctness or originality of
          AI-generated content. Users are responsible for reviewing and ensuring
          the integrity of their content.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">
          5. Privacy and Data Protection
        </h2>
        <p className="text-secondary-foreground mb-4">
          We value your privacy. Any personal information you provide will be
          handled in accordance with our Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">
          6. Limitation of Liability
        </h2>
        <p className="text-secondary-foreground mb-4">
          We do our best to provide uninterrupted and error-free services, but
          we cannot guarantee this. We are not liable for any direct, indirect,
          incidental, or consequential damages arising from the use of our
          platform.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">
          7. Termination
        </h2>
        <p className="text-secondary-foreground mb-4">
          We reserve the right to suspend or terminate your account at any time,
          without notice, for any violation of these terms or if we believe your
          actions harm the community or the platform.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">
          8. Changes to Terms
        </h2>
        <p className="text-secondary-foreground mb-4">
          We may update these terms from time to time. Any changes will be
          effective immediately upon posting. Your continued use of the platform
          signifies your acceptance of the revised terms.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-6 mb-4">
          9. Contact Us
        </h2>
        <p className="text-secondary-foreground">
          {
            "If you have any questions or concerns about these terms, feel free to reach out to us via email at "
          }
          <Link
            href="mailto:manoharpenta456@gmail.com"
            className="text-blue-600 hover:underline"
          >
            support@AIdeate.com
          </Link>
          .
        </p>

        <p className="text-secondary-foreground mt-6">
          By accessing and using our platform, you acknowledge that you have
          read, understood, and agree to these terms and conditions. Thank you
          for being a part of our community!
        </p>
      </div>
    </div>
  );
}
