import RootLayout from "./layout";
import Text from "./Text";
import TextRevealWrapper from "./common/TextRevealWrapper";

export default function HeroText() {
  return (
    <RootLayout className="text-center w-full relative z-10 mt-0 md:mt-0">
      <TextRevealWrapper className="text-sm px-5 md:text-2xl md:px-[15%] w-full">
        <Text>
          We help companies become more resilient and future-ready by effectively
          managing their operational challenges, emergent accounting & regulatory
          complexities, and transformational intricacies
        </Text>
      </TextRevealWrapper>
    </RootLayout>
  );
}
