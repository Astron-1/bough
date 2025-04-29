import sample from "../../public/sampleacc.png";
import ServiceCard from "./ServiceCard";

export default function BoughServices() {
  return (
    <div className="flex flex-col items-center gap-20 px-4">
      <div className="w-full md:w-[1000px] md:self-end">
        <ServiceCard image={sample} serviceType="Accounting" />
      </div>
      <div className="w-full md:w-[1000px] md:self-start">
        <ServiceCard image={sample} serviceType="Finance" />
      </div>
      <div className="w-full md:w-[1000px] md:self-end">
        <ServiceCard image={sample} serviceType="Legal" />
      </div>
      <div className="w-full md:w-[1000px] md:self-start">
        <ServiceCard image={sample} serviceType="Marketing" />
      </div>
    </div>
  );
}
