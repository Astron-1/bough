import React from "react";
import { Lightbulb, Handshake, Rocket } from "lucide-react";
import Text, { Font } from "./Text";
import { motion } from "framer-motion";
import IconWithHover from "./common/IconWithHover";
import SpotlightCard from "./common/SpotlightCard";
import ScrollReveal from "./common/ScrollReveal";

export default function HomeInsights() {
  const cards = [
    {
      icon: Handshake,
      category: "Shared success commitment",
      title: "Strategic partnership over prescriptive advice",
      description:
        "We focus on building long-term partnerships that prioritize your success rather than offering one-size-fits-all solutions.",
    },
    {
      icon: Lightbulb,
      category: "Build for longevity",
      title: "Empowering your workforce for sustainable change",
      description:
        "We believe in building capabilities, not dependencies. Our approach centers on empowering your teams with the skills, tools, and confidence needed to drive continuous improvement.",
    },
    {
      icon: Rocket,
      category: "Expertise you can trust",
      title: "Technology that enhances, not replaces",
      description:
        "Our technology solutions are designed to augment human capabilities, making your team more effective while preserving the human expertise that makes your organization unique.",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Text type={Font.GARAMOND}>
            <ScrollReveal
              Component="h2"
              containerClassName="mb-6"
              textClassName="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-garamond"
            >
              Leveraging leading technologies to maximize impact
            </ScrollReveal>
          </Text>

          <ScrollReveal
            Component="div"
            containerClassName="max-w-4xl mx-auto"
            textClassName="text-lg md:text-xl text-slate-600 leading-relaxed"
            baseRotation={15}
            blurStrength={10}
          >
            At Bough, we understand that solving complex challenges goes beyond
            expertise&mdash;it requires collaboration. That&apos;s why we
            continuously enhance our capabilities and forge strong strategic
            partnerships with leading technology providers and industry experts.
          </ScrollReveal>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SpotlightCard className="group/card min-h-full rounded-2xl bg-white border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 transform origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-300"></div>

                <div className="flex flex-col items-center pt-12 px-8">
                  <IconWithHover
                    icon={React.createElement(card.icon, { size: 40 })}
                    className="mb-8"
                  />
                  <p className="text-cyan-600 font-medium text-sm tracking-wider uppercase">
                    {card.category}
                  </p>
                  <Text className="text-xl font-semibold text-center text-slate-900 mt-3 mb-4">
                    {card.title}
                  </Text>
                </div>

                <div className="text-center px-8 pb-12">
                  <p className="text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
