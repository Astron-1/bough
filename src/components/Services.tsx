import sample from "../../public/sampleacc.png";
import ServiceCard from "./ServiceCard";

export default function BoughServices() {
  return (
    <div className="flex flex-col gap-20">
      <div className="self-end ">
        <ServiceCard image={sample} serviceType="Accounting" />
      </div>
      <div className="self-start">
        <ServiceCard image={sample} serviceType="Finance" />
      </div>
      <div className="self-end">
        <ServiceCard image={sample} serviceType="Legal" />
      </div>
      <div className="self-start">
        <ServiceCard image={sample} serviceType="Marketing" />
      </div>
      {/* Add more cards in zigzag like this */}
    </div>
  );
}
