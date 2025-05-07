import { StaticImageData } from "next/image";
import cs1Image1 from "../../public/caseStudies/CS1/image1.png";
import cs1Image2 from "../../public/caseStudies/CS1/image2.png";
import cs1Image3 from "../../public/caseStudies/CS1/image3.png";
import cs1Image4 from "../../public/caseStudies/CS1/image4.png";
import cs2Image1 from "../../public/caseStudies/CS2/image1.png";
import cs2Image2 from "../../public/caseStudies/CS2/image2.png";
import cs2Image3 from "../../public/caseStudies/CS2/image3.png";
import cs3Image1 from "../../public/caseStudies/CS3/image1.png";

interface ImageProps {
  heading?: string;
  description?: string;
  src: string | StaticImageData;
}

interface CaseStudyContent {
  route: string;
  image: string;
  id: string;
  heading: string;
  at_a_glance: string;
  what_we_did: string[];
  case_story: {
    heading: string;
    description: {
      subHeading: string;
      subDescription?: string[];
      image?: ImageProps;
    }[];
    images?: ImageProps[];
  }[];
  solution?: {
    heading: string;
    description: {
      subHeading: string;
      subDescription?: string[];
      image?: ImageProps;
    }[];
  }[];
  results: {
    heading: string;
    description?: string[];
    image?: ImageProps;
  }[];
}

export const caseStudyContent: CaseStudyContent[] = [
  {
    image: "/wavy.avif",
    route: "CASE%20STUDY%201%20–%20Data%20optimization%20and%20governance",
    id: "Data optimization and governance",
    heading: "Delivering better insights with better data.",
    at_a_glance:
      "Bough helps a global technology company implement an effective data governance program to support data migration for SAP RAR implementation and ongoing business operations",
    what_we_did: [
      "Revenue data management",
      "Drive data literacy and accountability",
      "Review pain-points and determine root cause of data quality issues",
      "Implement data controls",
      "Automated data stewardship platform implementation",
    ],
    case_story: [
      {
        heading: "Treading unchartered waters",
        description: [
          {
            subHeading:
              "Operating in over 60 countries and supported by 9,000 employees, this leading technology and communications company hadn’t prioritized Data Quality and Master Data Management as part of its business information management strategy. As a result, its data quality had degraded over time, resulting in a variety of issues.",
          },
          {
            subHeading:
              "For example, inconsistent product categorization adversely impacted accuracy of revenue recognition treatment, while challenges with customer data resulted in manual accounting rework. Additionally, obsolete data in its systems required extensive labor to monitor, maintain, and action.",
          },
        ],
      },
      {
        heading: "Background and challenge",
        description: [
          {
            subHeading:
              "The company was looking to implement SAP RAR, an automated revenue recognition and accounting solution. Yet, significant data challenges, both known and unknown, emerged as the primary obstacle. As a result, the company needed immediate help in identifying and addressing their data quality issues.",
          },
          {
            subHeading:
              "To combat inaccurate, inconsistent, and out-of-date data, the client needed to overhaul how it defined, measured, and maintained data quality within its various revenue data impacting systems. There was a need to: drive data accountability, document data definitions, standards and metrics to measure data quality; review existing pain-points and determine the root cause of data quality issues; and assist business teams in troubleshooting accounting issues caused due to bad data",
          },
        ],
      },
    ],
    solution: [
      {
        heading:
          "To make standardizing and optimizing data fields in the global revenue platform manageable, we prioritized small number of data fields based on their degree of impact and importance to business priorities. We compiled data and process maps to help data producers and owners fix data and prevent errors going forward.",
        description: [
          {
            subHeading: "STAGE 1 - Pre-migration data optimization",
            subDescription: [
              "Analyzed the entire migration data dump",
              "Evaluated quality and stability of the data being moved",
              "Defined various inclusion / exclusion criteria based on SAP RAR data quality requirements",
              "Evaluated and categorized each line item per the devised data categorization criteria",
              "Identified and corrected issues",
            ],
            image: {
              heading:
                "Filtering out the noise through a tiered process to focus on the key data fields.",
              src: cs1Image1,
            },
          },
          {
            subHeading: "STAGE 2 – Migration data readiness",
            subDescription: [
              "Determined what data to move, and the quality of that data before and after the move",
              "Enabled a solid migration baselining and stakeholder confidence on the go-live",
              "Optimized 99% data to increase precision of SAP RAR results",
              "Reconciled balances between legacy and new reporting systems. Investigated underlying causes for differences identified and suggested appropriate accounting treatment",
            ],
          },
          {
            subHeading: "STAGE 3 – Ongoing data governance",
            subDescription: [
              "Established a strong data quality rules management and monitoring process",
              "Structured root cause analysis to identify and address underlying causes of a problem and prevent future bad data",
              "Built new processes and controls to achieve compliance and provide assurance over data flowing into SAP RAR",
              "Deployed Alteryx and RPA managed solutions to monitor data quality (next to real time data governance)",
            ],
            image: {
              heading:
                "Illustrative workflow data quality rules to assess data from its point of creation and appropriately categorize it for governance purposes.",
              src: cs1Image2,
            },
          },
        ],
      },
    ],
    results: [
      {
        heading:
          "Data optimization efforts resulted in 99% of SAP records being analyzed and optimized for either transitioning to SAP RAR in an accurate and consistent manner or management through an alternate solution.",
        image: {
          heading: "Data optimization results.",
          src: cs1Image3,
        },
      },
      {
        heading:
          "Not only was the client successful in alleviating their data quality pain points to meet their SAP RAR migration objectives, but also in establishing a strong foundation to perform more advanced data governance practices:",
        description: [
          "Improved data quality for SAP RAR migration",
          "Deployed an automated tool to direct revenue data to its appropriate accounting solution",
          "Developed business acumen in staff to ensure data input quality",
          "Implemented a data stewardship platform to provide real-time insights on data quality",
        ],
        image: {
          heading:
            "Providing adequate assurance through continuous monitoring and regular audits.",
          src: cs1Image4,
        },
      },
    ],
  },
  {
    image: "/manhattan.avif",
    route:
      "CASE%20STUDY%202%20–%20ASC%20606%20Reporting%20Solution%20(Plan%20B)",
    id: "ASC 606 Reporting Solution (Plan B)",
    heading: "Delivering change at the speed of light.",
    at_a_glance:
      "Bough helps develop an agile and adaptive accounting solution for a global technology company to meet the ASC 606 revenue reporting requirements",
    what_we_did: [
      "Conceptualize and implement the end-to-end revenue accounting solution",
      "Target operating model design",
      "Design new processes and institute controls",
      "Change management",
    ],
    case_story: [
      {
        heading: "Trouble on all fronts",
        description: [
          {
            subHeading:
              "Our client is a global technology company with revenues of over $3 billion and is a leading provider of contact center, unified communications and networking products and services.",
          },
          {
            subHeading:
              "Our client was required to adopt the new revenue recognition standard (ASC 606) and as a result, needed to transform its accounting and financial reporting process to meet the new requirements. With uncertainty around implementation of their initial plan, Bough was called upon, one month before the ‘go-live’ date of the initial solution, to implement an alternate solution to meet the Q1 fiscal deadline.",
          },
        ],
      },
      {
        heading: "Partnering for success",
        description: [
          {
            subHeading:
              "In view of the client’s existing data and time limitations, Bough was entrusted in delivering the following:",
            subDescription: [
              "Conceptualize the end-to-end revenue accounting solution",
              "Complete build, UAT and deployment for the accounting solution",
              "Design and finalize new processes and controls",
              "Project Management Support",
              "Manage change, conduct trainings, and build organizational awareness",
              "Operationalize and manage the new process",
              "Achieve audit readiness for the Q1 close",
            ],
          },
          {
            subHeading:
              "Bough offered the technical expertise, guidance, and systematic breakdown of expectations / requirements to enable IT to effectively use their knowledge of enterprise systems, technology, processes, and data to achieve the end goal.",
          },
        ],
      },
      {
        heading: "Capitalizing on existing and newly developed synergies.",
        description: [
          {
            subHeading:
              "Bough owned the overall process and engaged with stakeholders to identify pain points and opportunities. We worked closely with business IT to deliver the technology functionality and provide integration capabilities that included: developing a data warehouse; integrating critical systems; and creating a single source of truth.",
          },
        ],
        images: [
          {
            heading: "Cross functional stakeholder engagement and leadership",
            description:
              "Bough's project leadership included engaging cross-functional stakeholders to understand their needs, identifying quick wins, and implementing a 'strawman' strategy for precise execution of the new accounting solution.",
            src: cs2Image1,
          },
          {
            heading: "Establishing a single version of data",
            description:
              "Ensuring all key data in one place, i.e., the data warehouse that stored ~80% of all enterprise revenue transactions (transactions not covered were the non- ASC 606 impacting e.g., recurring revenues), enabled us to pull in the requisite information efficiently into our accounting solution to calculate revenues and post journal entries",
            src: cs2Image2,
          },
        ],
      },
    ],
    results: [
      {
        heading:
          "With Bough’s assistance, the client was able to establish an ASC 606 revenue recognition model to meet its accounting and financial reporting needs. ",
      },
      {
        heading: "Value delivered:",
        description: [
          "Effectively built the solution, enabling Bough to transform the ASC 606 book close process within 3 months of deployment: effectively meeting SEC reporting requirements",
          "Delivered capabilities for ‘Data and Information Management’ to support journal entries, project reviews, reporting, financial analysis etc.",
          "Designed internal controls and finalized revenue recognition review checklists",
          "Operationalized the process successfully, reducing Bough involvement in managing the reviews from 12 to 4 resources",
          "Achieved audit readiness of the new process, managed audit requests and achieved SOX compliance",
          "Reduction of time spent on data gathering by 25%",
          "Conducted trainings to increase awareness levels of the organization on ASC 606 book close and the new revenue accounting & reporting solution",
        ],
        image: {
          heading: "Benefit realization",
          src: cs2Image3,
        },
      },
    ],
  },
  {
    image: "/lightroom.avif",
    route:
      "CASE%20STUDY%203%20–%20Revenue%20Assurance%20and%20audit%20readiness",
    id: "Revenue Assurance and audit readiness",
    heading: "Developing a robust revenue assurance function.",
    at_a_glance:
      "Bough helps a global technology company implement an effective and a cost-effective revenue assurance program to ensure regulatory compliance and meet audit requirements",
    what_we_did: [
      "Revenue Assurance",
      "Accounting process optimization",
      "Financial audit readiness and support",
      "Process and controls implementation",
      "Accounting policies and procedures",
      "Technical accounting staff augmentation",
    ],
    case_story: [
      {
        heading: "Background and challenge",
        description: [
          {
            subHeading:
              "The client was confronted by the continuous challenge of keeping pace with the increasing complexity of financial reporting and disclosure requirements. In addition, prevalent stringent regulatory environment had put the organization’s accounting practices under the spotlight with greater amount of scrutiny by the stakeholders",
          },
          {
            subHeading:
              "Disparate accounting practices followed within the company across various geographies, coupled with the intricacies of their business environment and transactions accentuated the issue and made it tougher for the company to manage their accounting and finance processes and often found themselves hard pressed to meet the additional regulatory requirements",
          },
          {
            subHeading:
              "The client engaged Bough as their accounting advisors to work alongside their internal teams and provide the depth of knowledge and experience necessary to address these eclectic accounting issues faced by the company.",
          },
        ],
      },
    ],
    solution: [
      {
        heading:
          "Strategic intervention by Bough to navigate complexity with expertise.",
        description: [
          {
            subHeading:
              "Bough leveraged their subject matter expertise and assessed the client’s accounting and finance processes and controls, primarily focusing on the timeliness and accuracy of the financial and management reporting",
          },
          {
            subHeading:
              "Reviewed client’s business transactions across various geographies including North America, Latin America, Europe, Middle East and Africa and the Asia-Pacific regions",
          },
          {
            subHeading:
              "Applied our in-depth understanding of the client’s business and nature of revenue arrangements to: ",
            subDescription: [
              "Identify underlying risks",
              "Assess adequacy of existing controls and procedures around revenue recognition",
              "Highlight areas of concern due to inefficient/loosely implemented processes and controls",
            ],
          },
          {
            subHeading:
              "Worked closely with the management and external audit team to:",
            subDescription: [
              "Validate components of financial data",
              "Perform cut-off procedures",
              "Execute key SOX controls involving revenue recognition related to software license provisioning and resolve issues",
              "Review auditor’s exceptions listing from revenue testing procedures performed in prior periods to devise remediation plans",
              "Proposed process & control enhancements to prevent future issues",
            ],
          },
          {
            subHeading:
              "Acted as a liaison between the Company and the audit team to ensure that the audit is completed timely and efficiently",
            subDescription: [
              "Prepared technical accounting calculations, policies, and memos, as required",
              "Reconciled balance sheets, as appropriate for each audit period",
              "Deployed a full-time augmented staff that played a role within the company’s operational accounting function and proactively planned/executed necessary daily, weekly, monthly, and quarterly accounting activities as required",
            ],
            image: {
              heading: "Example of high-level audit response process workflow.",
              src: cs3Image1,
            },
          },
        ],
      },
    ],
    results: [
      {
        heading: "Enhancing audit effectiveness and quality",
        description: [
          "With Bough’s assistance, the client was able to address and resolve the critical accounting issues and make informed business decisions on their financial reporting procedures.",
          "As there is a need to be answerable to the stakeholders, management relied on Bough as trusted advisors to equip them with relevant information around the current accounting practices within the organization and implications of the various accounting issues on their business.",
          "Established detailed technical accounting memos, policies and thought leadership material pertaining to key processes and controls around revenue reporting and documented accounting procedures to retain critical knowledge and train new employees. These efforts resulted in streamlining the accounting practices within the company and enabled accurate and timely financial reporting for the client.",
          "Enhanced cost-effectiveness achieved by reducing effort in transaction testing through process automation and technology utilization, resulting in improved efficiency.",
          "Synergy exhibited by the Bough team working out of the US and the India offices throughout the project, provided the client with a virtual 24-hour workday facilitating a quicker turnaround of the deliverables and expedited engagement delivery.",
        ],
      },
    ],
  },
];
