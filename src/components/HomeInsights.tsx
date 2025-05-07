import { Clock, PuzzleIcon, Link } from "lucide-react";
import Text, { Font } from "./Text";

export default function HomeInsights() {
  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Text
            type={Font.GARAMOND}
            className="text-4xl md:text-5xl font-bold text-[#0d2240] tracking-tight mb-6"
          >
            Leveraging leading technologies to maximize impact
          </Text>
          <Text className="max-w-4xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
            {
              "At Bough, we understand that solving complex challenges goes beyond expertise—it requires collaboration. That's why we continuously enhance our capabilities and forge strong strategic partnerships with leading technology providers and industry experts."
            }
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Custom Card 1 */}
          <div className="rounded-xl z-10 border border-gray-100 bg-[#f8f9ff] hover:shadow-lg transition-all overflow-hidden hover:-translate-y-1">
            <div className="flex flex-col items-center pt-10 px-6">
              <div className="w-16 h-16 mb-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Clock className="w-24 h-24" strokeWidth={1.75} />
              </div>
              <p className="text-blue-600 font-medium text-sm tracking-wider uppercase">
                Shared success commitment
              </p>
              <Text className="text-xl font-semibold text-center text-[#0d2240] mt-3 mb-4">
                Strategic partnership over prescriptive advice
              </Text>
            </div>
            <div className="text-center px-6 pb-10">
              <p className="text-gray-600 leading-relaxed">
                We focus on building long-term partnerships that prioritize your
                success rather than offering one-size-fits-all solutions.
              </p>
            </div>
          </div>

          {/* Custom Card 2 */}
          <div className="rounded-xl border border-gray-100 bg-[#f8f9ff] hover:shadow-lg transition-all overflow-hidden hover:-translate-y-1">
            <div className="flex flex-col items-center pt-10 px-6">
              <div className="w-16 h-16 mb-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <PuzzleIcon className="w-24 h-24" strokeWidth={1.75} />
              </div>
              <p className="text-blue-600 font-medium text-sm tracking-wider uppercase">
                Build for longevity
              </p>
              <Text className="text-xl font-semibold text-center text-[#0d2240] mt-3 mb-4">
                Empowering your workforce for sustainable change
              </Text>
            </div>
            <div className="text-center px-6 pb-10">
              <p className="text-gray-600 leading-relaxed">
                We believe in building capabilities, not dependencies. Our
                approach centers on empowering your teams with the skills,
                tools, and confidence needed to drive continuous improvement.
              </p>
            </div>
          </div>

          {/* Custom Card 3 */}
          <div className="rounded-xl border border-gray-100 bg-[#f8f9ff] hover:shadow-lg transition-all overflow-hidden hover:-translate-y-1">
            <div className="flex flex-col items-center pt-10 px-6">
              <div className="w-16 h-16 mb-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Link className="w-24 h-24" strokeWidth={1.75} />
              </div>
              <p className="text-blue-600 font-medium text-sm tracking-wider uppercase">
                Expertise you can trust
              </p>
              <Text className="text-xl font-semibold text-center text-[#0d2240] mt-3 mb-4">
                Technology that enhances, not replaces
              </Text>
            </div>
            <div className="text-center px-6 pb-10">
              <p className="text-gray-600 leading-relaxed">
                Our technology solutions are designed to augment human
                capabilities, making your team more effective while preserving
                the human expertise that makes your organization unique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
