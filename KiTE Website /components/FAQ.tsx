import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "What makes KiTE protein bars different from other protein bars?",
      answer: "KiTE protein bars are handcrafted in our dedicated kitchen using premium organic ingredients. Each bar is made with care and contains high-quality protein sources, natural flavors, and no artificial preservatives. We focus on creating bars that taste great while providing optimal nutrition for active lifestyles."
    },
    {
      question: "How are the bars sweetened?",
      answer: "We add zero sugar. Sweetness comes from allulose and stevia, both FSSAI- and FDA-approved with virtually no calories and negligible glycaemic impact."
    },
    {
      question: "Are KiTE bars keto-friendly or low-carb?",
      answer: "Yes, each bar has as little as 3 g of net carbs, making KiTE a smart choice for keto and other low-carb lifestyles."
    },
    {
      question: "How many KiTE bars can I eat in a day?",
      answer: "Think of KiTE as a protein \"top-up.\" One or two bars daily is plenty alongside balanced meals. More than that may leave your stomach feeling less than stellar."
    },
    {
      question: "Why make protein a priority?",
      answer: "Protein keeps muscles and bones strong, helps you feel full so you can manage weight, and supports everything from skin elasticity to healthy hair and nails. In short, more protein means less body-fat creep, fewer injuries as you age, and better overall function."
    },
    {
      question: "Can I get KiTE on subscription?",
      answer: "Absolutely. Subscribe to any flavour carton, save 10 % every order, and never run out. Details live on our Subscription page (plus an extra FAQ section there)."
    },
    {
      question: "Where are KiTE bars produced?",
      answer: "Every bar is handcrafted in India under the highest Safe Quality Food standards, ensuring flawless taste, stellar nutrition, and uncompromising safety."
    },
    {
      question: "Is KiTE gluten-free?",
      answer: "Yes. We use zero gluten ingredients and swab our equipment before each run to confirm no cross-contact, so gluten-avoiders can snack with confidence."
    },
    {
      question: "I have food allergies, can I eat KiTE?",
      answer: "Our recipe contains milk and nuts and is 100 % vegetarian. Always check the ingredient list and, if you're unsure, talk to your healthcare professional first."
    },
    {
      question: "How long do the bars last and how should I store them?",
      answer: "KiTE stays fresh for up to 6 months at room temperature below 27°C, away from direct sunlight. Want an even longer shelf life or a firmer bite? Pop them in the fridge or freezer, just bring to room temp before eating."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="chewy-heading text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="figma-white-container p-6 sm:p-8">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-100 rounded-lg px-6 py-2 hover:bg-gray-50 transition-colors duration-200"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="text-base sm:text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="figma-original-blue-container p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our team is here to help! Reach out to us for personalized assistance with your protein bar needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:info@kiteprotein.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
              >
                Contact Support
              </a>
              <a 
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium"
              >
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}