import RootLayout from "./layout";
import Text from "./Text";

export default function HeroText() {
  return (
    <RootLayout className="text-center">
      <Text className="text-lg md:text-2xl -mt-32 md:px-[15%]">
        We help companies become more resilient and future-ready by effectively
        managing their operational challenges, emergent accounting & regulatory
        complexities, and transformational intricacies
      </Text>
    </RootLayout>
  );
}
