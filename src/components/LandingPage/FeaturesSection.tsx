import React, { useEffect } from "react";
import {
  CheckCircle,
  UserCheck,
  Shield,
  FileText,
  CircleDollarSign,
} from "lucide-react";

const FeaturesSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    document.querySelectorAll(".feature-animate").forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll(".feature-animate").forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section id="features" className="py-20 feature-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 feature-animate">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powering Your Financial Journey
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our comprehensive platform simplifies complex financial processes
            into seamless experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg card-highlight feature-animate">
            <div className="mb-6">
              <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <UserCheck className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Streamlined KYC Verification
              </h3>
              <p className="text-foreground/70">
                Our advanced verification system reduces the traditional KYC
                process from days to just minutes. Upload documents securely and
                get verified quickly.
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Secure document upload</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">AI-powered verification</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Real-time status updates</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-lg card-highlight feature-animate">
            <div className="mb-6">
              <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <FileText className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Hassle-free Loan Applications
              </h3>
              <p className="text-foreground/70">
                Apply for loans with minimal paperwork. Our system pre-fills
                information from your KYC, making the application process smooth
                and efficient.
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Pre-filled application forms</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Multiple loan options</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Quick processing time</span>
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-lg card-highlight feature-animate">
            <div className="mb-6">
              <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <CircleDollarSign className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Automated Mandate Management
              </h3>
              <p className="text-foreground/70">
                Set up automated payment mandates securely. Our system handles
                recurring payments seamlessly while maintaining compliance with
                regulations.
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Easy mandate setup</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Secure payment processing</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Modification flexibility</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
