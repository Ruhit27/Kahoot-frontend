import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-black relative">
      {/* Back link in the top-left corner */}
      <Link
        href={"/"}
        className="absolute top-4 left-4 px-6 py-2 hover:underline bg-transparent border-2 border-[#0020dd] text-black rounded-md hover:bg-[#0020dd] hover:text-white transition duration-300 hover:scale-125"
      >
        Back
      </Link>

      <NeonGradientCard className="w-[350px] h-[290px] flex flex-col justify-center items-center">
        <p className="text-center">
          I am an aspiring web developer and I built This Project to improve my
          skills
        </p>
      </NeonGradientCard>
    </div>
  );
}
