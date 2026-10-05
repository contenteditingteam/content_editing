"use client"

import ContributionSkyline from "@/components/ui/contribution-skyline"

export default function Demo() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[980px]">
        <ContributionSkyline unit="document" title="Documents edited in the last year (sample data)" palette="ocean" />
      </div>
    </div>
  )
}
