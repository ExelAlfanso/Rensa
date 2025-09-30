import Link from "next/link";
import Logo from "../icons/Logo";
import { footerData } from "@/app/datas/footerDatas";
import Text from "../Text";

const Footer = () => {
  return (
    <footer className="w-full text-white bg-primary z-20 p-10 md:p-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Left column */}
          <div className="flex flex-col justify-between md:w-1/2 lg:w-2/5 xl:w-1/3">
            <div className="flex flex-col gap-1">
              <Logo size={"m"} color="white" className="text-white-200" />
              <h1 className="text-[16px] lg:text-[18px] font-forum">
                Where Every Picture Tells Its Recipe.
              </h1>
            </div>
            <p className="mt-6 text-black-200 text-[10px] md:text-[16px] font-figtree hidden md:block">
              Rensa 2025. All Rights Reserved
            </p>
          </div>

          <div className="flex flex-col justify-between md:w-1/2 lg:w-2/5 xl:w-1/3">
            {/* Navigation grid */}
            <div className="grid grid-cols-2 gap-y-4 text-[14px] lg:text-[18px]">
              {footerData.map((navigation, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    navigation.column === 1 ? "" : "ml-[2vw]"
                  }`}
                >
                  <Link href={navigation.href}>
                    <Text size="m">{navigation.label}</Text>
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex gap-8 md:gap-12 lg:gap-28 xl:gap-41 mt-6 text-black-200 text-[10px] md:text-[16px] font-figtree">
              <p className="text-black-200 text-[10px] md:text-[16px] font-figtree block md:hidden">
                Rensa 2025. All Rights Reserved
              </p>
              <Link href="">
                <p className="font-figtree">Privacy Policy</p>
              </Link>
              <Link href="">
                <p className="font-figtree">Terms</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
