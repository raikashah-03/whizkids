import FAQAccordion from "./FAQAccordion";
import Heading from "./Headding";
import TopBottomShapeSection2 from "./ui/top-bottom-shape-section-2";

const faqs = [
  {
    question: "What is the admission process?",
    answer:
      "Our admission process is designed to be simple and transparent. You can start by filling out an online inquiry form, followed by a school tour and a personal interaction session with our educators.",
  },
  {
    question: "What is the student-teacher ratio?",
    answer:
      "We maintain a low student-teacher ratio of 10:1 across all early education programs. This ensures personalized attention and allows our educators to cater to each child's individual learning needs.",
  },
  {
    question: "Are meals provided at the school?",
    answer:
      "Yes, we provide nutritious, balanced, and freshly prepared meals planned by pediatric nutritionists. We also accommodate specific dietary requirements and allergies.",
  },
  {
    question: "What safety measures are in place?",
    answer:
      "Your child's safety is our top priority. We have 24/7 CCTV surveillance, restricted access control, thoroughly background-checked staff, and stringent hygiene protocols in all areas.",
  },
  {
    question: "Do you offer transportation?",
    answer:
      "Yes, we offer safe and comfortable transportation services within a certain radius. Our buses are equipped with GPS tracking and trained attendants.",
  },
];

const FAQPage = (): React.JSX.Element => {
  return (
    <TopBottomShapeSection2>
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div
          className="absolute top-20 left-0 w-32 h-32 bg-peach-strong opacity-10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-20 right-0 w-40 h-40 bg-skyblue-strong opacity-10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="container relative z-10 max-w-4xl!">
          {/* ── Centered Heading ── */}
          <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16">
            <Heading
              headingText="Frequently Asked"
              spanText="Questions"
              className="justify-center!"
              beforeIcon="/icons/pencil.png"
              afterIcon="/icons/pencil.png"
            />
            <p className="max-w-2xl text-muted-foreground mid-text-1 leading-relaxed">
              Find answers to common questions about our curriculum, facilities, and admission process. We&apos;re here to help you make the best choice for your child.
            </p>
          </div>

          {/* ── FAQ Accordion ── */}
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </TopBottomShapeSection2>
  );
};

export default FAQPage;
