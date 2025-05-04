import Text, { Font } from "./Text";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";

export default function BottomSection() {
  return (
    <div className="bg-[url('/bottomImage.png')] bg-cover bg-center bg-no-repeat w-full h-[400px] md:h-[500px] flex items-center justify-center">
      {/* Centered responsive content */}
      <div className="flex flex-col justify-center items-center space-y-3 px-4 text-center">
        <Text className="text-white text-3xl md:text-5xl font-bold">
          Shape tomorrow,
        </Text>

        <Text
          type={Font.GARAMOND}
          className="text-white text-3xl md:text-5xl font-bold"
        >
          Starting today
        </Text>

        <Button href="/connect" className="outline-1 bg-transparent px-7 mt-10">
          <ShinyText text="Connect" speed={3} />
        </Button>
      </div>
    </div>
  );
}
