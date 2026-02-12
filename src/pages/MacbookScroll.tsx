import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function MacbookScrollPage() {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <MacbookScroll
        title={
									<span>
									Your vision, our expertise, exceptional results. <br />
									Software solutions that drive success.
							</span>
        }
        src={`/programming.avif`}
        showGradient={false}
      />
    </div>
  );
}
