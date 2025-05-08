import RootLayout from "./layout";
import Text from "./Text";

export default function HeroText() {
  return (
    <RootLayout className="text-center w-full">
      <Text className="text-sm px-10 md:text-2xl -mt-32 md:px-[15%] w-full">
        We help companies become more resilient and future-ready by effectively
        managing their operational challenges, emergent accounting & regulatory
        complexities, and transformational intricacies
      </Text>
    </RootLayout>
  );
}
