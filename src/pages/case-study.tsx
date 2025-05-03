import { useRouter } from "next/router";
import { caseStudyContent } from "@app/lib/caseStudyContent";
import Header from "@app/components/Header";
import CaseStudyHeadings from "@app/components/case-study/CaseStudyHeadings";
import WhatWeDid from "@app/components/case-study/WhatWeDid";
import CaseStory from "@app/components/case-study/CaseStory";
import Solutions from "@app/components/case-study/Solutions";
import Result from "@app/components/case-study/Result";
import BackgroundPattern from "@app/components/BackgroundPattern";

export default function CaseStudy() {
  const router = useRouter();
  const { name } = router.query;

  const content = caseStudyContent.find((item) => item.id === name);

  if (!content) {
    return (
      <div className="container mx-auto px-6 py-12">Case study not found</div>
    );
  }

  return (
    <div className="text-black relative">
      <BackgroundPattern />
      <Header transparent={false} />
      <CaseStudyHeadings
        heading={content.id}
        description={content.at_a_glance}
      />
      <WhatWeDid whatWeDid={content.what_we_did} />
      <CaseStory caseStory={content.case_story} />
      <Solutions solutions={content.solution} />
      <Result results={content.results} />
    </div>
  );
}
