import { StaticImageData } from "next/image";
import cs1Image1 from "../../public/caseStudies/CS1/image1.png";
import cs1Image2 from "../../public/caseStudies/CS1/image2.png";
import cs1Image3 from "../../public/caseStudies/CS1/image3.png";
import cs1Image4 from "../../public/caseStudies/CS1/image4.png";
import cs2Image1 from "../../public/caseStudies/CS2/image1.png";
import cs2Image2 from "../../public/caseStudies/CS2/image2.png";
import cs2Image3 from "../../public/caseStudies/CS2/image3.png";
import cs3Image1 from "../../public/caseStudies/CS3/image1.png";
import cs4Image1 from "../../public/caseStudies/CS4/image1.png";
import cs4Image2 from "../../public/caseStudies/CS4/image2.png";
import cs5Image1 from "../../public/caseStudies/CS5/image1.png";
import cs6Image1 from "../../public/caseStudies/CS6/image1.png";
import cs6Image2 from "../../public/caseStudies/CS6/image2.png";
import cs6Image3 from "../../public/caseStudies/CS6/image3.png";
import cs7Image1 from "../../public/caseStudies/CS7/image1.png";

interface ImageProps {
  heading?: string;
  description?: string;
  src: string | StaticImageData;
}

interface CaseStudyContent {
  id: string;
  heading: string;
  at_a_glance: string;
  what_we_did: string[];
  case_story: {
    heading: string;
    description: {
      subHeading?: string;
      subDescription?: string[];
      image?: ImageProps;
    }[];
    images?: ImageProps[];
  }[];
  solution?: {
    heading?: string;
    description?: {
      subHeading: string;
      subDescription?: string[];
      image?: ImageProps;
    }[];
    images?: ImageProps[];
  }[];
  results: {
    heading?: string;
    description?: string[];
    image?: ImageProps;
  }[];
}

export const caseStudyContent: CaseStudyContent[] = [
  {
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
  {
    id: "RAR Implementation",
    heading: "Seeing a complex ERP implementation through  ",
    at_a_glance:
      "Bough steps in to revive a derailing ERP implementation project for a global technology company and steer the project to a successful go-live.",
    what_we_did: [
      "ERP implementation",
      "Change management and trainings",
      "Data optimization and governance",
      "Process standardization and optimization",
      "Revenue recognition automation",
      "Pre-migration readiness and post-migration balance sheet reconciliations",
    ],
    case_story: [
      {
        heading: "Background and challenge",
        description: [
          {
            subHeading:
              "A $3 billion global technology company was undergoing a major finance transformation effort, including implementation of an SAP RAR revenue automation tool and data management platforms, to cater to the new demands of ASC 606. As a rapidly growing and continually evolving company, they found themselves left with an incomplete ERP implementation. Complexity of its business, compounded by poor planning, management, and execution and by the previous Big 4 consulting firm, resulted not meeting the go-live deadline substantially risking the company’s investment and strategic goals of recording revenues using RAR to support their growth.",
          },
          {
            subHeading:
              "Disparate accounting practices followed within the company across various geographies, coupled with the intricacies of their business environment and transactions accentuated the issue and made it tougher for the company to manage their accounting and finance processes and often found themselves hard pressed to meet the additional regulatory requirements",
          },
          {
            subHeading:
              "In need of rapid assistance, Bough was engaged to evaluate the current state of the ERP, execute changes where necessary, build and deliver on the SAP RAR implementation mandate, and guide the accounting operations team to future deadline success.",
          },
        ],
      },
    ],
    solution: [
      {
        heading:
          "Our approach was founded on the principles of strategic alignment, prioritization, and collaboration – designed to deliver immediate value and set the stage for long term success",
        description: [
          {
            subHeading: "Need for better data governance",
            subDescription: [
              "At the very onset Bough realized, to ensure the success of transformation efforts, there was a need to review, standardize, enhance, and automate some of the existing mission critical F&A processes. Given, the more detailed and comprehensive disclosures of ASC 606, created new demands on data capturing and analysis processes. For instance, the introduction of performance obligations and contract balance movements reports meant that a new level of data had to be identified, compiled, integrated, or stored.",
              "To meet this sub-mandate, we extended the support in streamlining data entry and reporting across the business units – incorporating best practices and partnering with client stakeholders and other implementation vendors on the project. Our focus was to narrow down on all additional data that will be required and work with business IT to identify the data sources, provide the transformational logics, design the reporting capabilities and the IT infrastructure to meet the brief. ",
            ],
          },
          {
            subHeading: "ERP evaluation and execution",
            subDescription: [
              "With an ERP implementation left incomplete and an accounting department heavily understaffed, our team immediately stepped into the role to much provide the much-needed expertise to see the initiative to the finish line. We evaluated the critical business requirements, the current state and pain points, reporting gaps, change readiness, and communication plans. Gathering data and information where appropriate and making necessary changes to the system set-up while continuously trouble shooting system issues to deliver a functioning and correctly modified ERP",
            ],
          },
          {
            subHeading: "Pre-migration readiness",
            subDescription: [
              "This was the most critical phase of the project with project success heavily reliant on ensuring minimum data quality and performance of all pre-migration controls. Prior to our arrival, historical data validation and optimization were never successfully completed. We led a full reload of five years of historical data and completed the validation, cleansing and optimization of all key revenue data – including evaluation of legacy contract combinations, material and product master data, customer master data, project data and transactional revenue data. The pre migration controls revolved around completeness and accuracy of all this data flowing into RAR and making sure all known issues were appropriately flagged and addressed prior to cutover and there are no unknown surprises.",
              "As part of pre-migration readiness, we were also involved in reviewing the design of the SAP Project System (PS) modules. This entailed ensuring all projects migrating to RAR had standard project structures developed, project costs are appropriately reflecting, and WBS details are accurate and complete, and the calculated project percentage of completion is reasonable and consistently flowing into RAR for computation of professional services revenues.",
            ],
          },
          {
            subHeading: "Post-migration balance sheet reconciliations",
            subDescription: [
              "Given the differences on how the legacy revenue reporting tool and the new SAP RAR tool operated, we had expected differences between Legacy system positions vs New system (RAR) positions. We knew this would be no mean feat, and given our past experiences with system implementations, this is one of the most complex and time intensive exercise. Hence we deployed our A-team of 5-10 resources tackling individual business scenarios and working relentless to identify the root cause and reconcile the differences.",
              "Our team performed a deep-dive comparison of legacy GL balances with RAR balances and also were accountable to post the correction entries to ensure the opening balance to be loaded to new system was correct. Depending on the root cause and business scenario identified, we devised a mapping matrix logic, to map revenue arrangements to appropriate solution codes with their unique and appropriate accounting treatments; to ensure that future revenues/postings reflect correctly. ",
            ],
          },
          {
            subHeading: "Identifying the customer",
            subDescription: [
              "We identified significant weaknesses in how the company went about their contract combinations and modifications. Given, ‘Identifying the customer’ is the first step of the 5-step ASC 606 rev. rec. model, if we didn’t get this right, then all downstream impacted processes and eventual rev. rec. would also be incorrect. Our team deployed a dedicated data governance team and invested a significant amount of time to audit the upfront quoting and opportunity creation process and the contract combination rules and logics deployed in the front-end deals configurator system. We worked closely with sales and enterprise architecture teams to correct the logic issues, bridge the process gaps, and provide extensive training on combination rules and data entry to the sales and delivery team who enter the data.",
              "Given how contract combinations impact the timing and amount of revenues being recognized, the auditors were keenly interested to see what we have in place as a company to ensure comfort. To meet this request, we designed and implemented an automated review process that addresses the risk or under and over grouping of contracts to meet audit requirements. With this the company had a good sense of its contracts, deals, and nature of modification on them, if any and depending on the underlying business rules whether it merited a retrospective or a prospective accounting treatment ",
            ],
          },
        ],
        images: [
          {
            heading: "Planning and executing for success.",
            src: cs4Image1,
          },
        ],
      },
    ],
    results: [
      {
        heading:
          "Achieving project goals and creating efficiency and standardization.",
        description: [
          "Bough proficiently saw the project through to a very successful go-live of SAP RAR. The implementation of this new revenue recognition automation tool laid the foundations, both procedurally and technically, for future increases in efficiency in finance and accounting.",
          "Reduced the time spent on closing the quarter and reduce workload of the accounting teams.",
          "Cleaner data and well documented post migration reconciliations significantly reduced manual reconciliation work and has now largely automated gross postings and increased transparency in the finance department. To aid our reviews we created multiple reporting templates from the system to adhere to reporting demands and requirements. Our team also successfully created months of back logged reports to get the accounting department up to date on reporting requirements.",
          "Compared to the legacy revenue recognition engine, SAP RAR provided real time revenue accounting capabilities, synchronization of cost recognition with revenue recognition, and the availability of various new, compulsory disclosures (e.g., reports showing the disaggregation of revenues by different categories, contract balance movements and upcoming revenues expected for outstanding POBs) etc.; helping the company realize the true benefits of RAR.",
          "Transparent cost tracking for all project phases (from offer to order processing to completion phase) thanks to standard project structures. Bough’s combination of technical accounting, process improvement, and system implementation expertise shortened the month-end close by several days and reduced the number of resources involved in the deferred revenue calculation and recognition and monthly reporting processes.",
          "With Bough assistance, the Company was able to standardize finance & accounting processes throughout the organization. Our team provided technical accounting expertise and functional design best practices to streamline future state policies, procedures, and controls. We built tools to enhance training across all business units with detailed desktop manuals to be utilized by the Company in the future to maintain industry leading practices.",
        ],
        image: {
          src: cs4Image2,
        },
      },
    ],
  },
  {
    id: "DRBCP Case Study",
    heading: "Building resilience through better governance ",
    at_a_glance:
      "Bough helps a global media and entertainment company assess effectiveness of its Disaster Recovery / Business Continuity Program (‘DRBCP’)",
    what_we_did: [
      "Business Continuity and Disaster Recovery reviews",
      "Risk Assessment and Business Impact Analysis",
      "Plan testing and maintenance",
      "Benchmarking and recommending best practices",
      "Define DRBCP governance and execution strategy",
    ],
    case_story: [
      {
        heading: "Business realties forcing a shift in focus",
        description: [
          {
            subHeading:
              "Our client is a leading media company, headquartered in New York, with revenues of over $3 billion creating, managing, and delivering media content via its broadcast, cable, and digital networks and partnerships.",
          },
          {
            subHeading:
              "With offices located all over North America, the company is exposed to a wide variety of threats (both natural and man-made) which had brought the Company’s ability to deliver / broadcast seamless content and continue operations in the event of a disruption or disaster to the fore and under great scrutiny",
          },
        ],
      },
      {
        heading: "The show must go on",
        description: [
          {
            subHeading:
              "Business priorities for a media company are particularly focussed towards creating, managing, and delivering content to its audiences in a seamless manner. Therefore, it was imperative for our client to sufficiently prepare for the continuity of its business following a possible catastrophic event that could disable operations of its Television and Radio broadcast stations and transmission sites. ",
          },
          {
            subHeading:
              "The client had experienced past business disruptions (being off-air) that proved to be costly with many direct and indirect consequences – lost revenue, damage to corporate reputation and reduced customer satisfaction. Almost the entire revenue model for our client was dependent on playing out commercial content; and adequate measures needed to be implemented to protect its critical resources supporting the revenue stream to accommodate both short and long-term outages of is broadcast stations / transmission sites.",
          },
          {
            subHeading:
              "Therefore, management recognized the importance of conducting a DRBCP review, and called upon Bough to assess the Company’s preparedness in dealing with business disruptions and instituting an effective organization wide DRBCP governance strategy.",
          },
        ],
      },
    ],
    solution: [
      {
        heading:
          "Through our review procedures we evaluated the existence, adequacy, and appropriateness of the DRBCP documentation covering the planning, execution and maintenance process within the Company and assessed the organization’s ability to maintain, resume and recover operations after disruptions ranging from minor outages to full-scale disasters, both, at the enterprise and at the business segment level.",
        images: [
          {
            heading:
              "The Bough team managed the entire initiative and performed a review of the client’s DRBCP program focused towards.",
            src: cs5Image1,
          },
        ],
      },
      {
        heading: "Broadly, our review revolved around the following themes",
        description: [
          {
            subHeading:
              "Appropriateness of Business Continuity and Disaster Recovery Plans: ",
            subDescription: [
              "Review the existence and adequacy of enterprise-wide and business segment DRBCP plans and procedures",
            ],
          },
          {
            subHeading: "Oversight and Support: ",
            subDescription: [
              "Assess the quality of oversight provided by the Company’s executive leadership",
            ],
          },
          {
            subHeading:
              "DRBCP focused Risk Assessments and Business Impact Analysis (BIA):",
            subDescription: [
              "Determine whether adequate DRBCP focussed business impact analysis (BIA) and risk assessments have been completed",
            ],
          },
          {
            subHeading: "DRBCP Testing and Plan Maintenance: ",
            subDescription: [
              "Assess whether periodic testing / reviews are performed to ensure that business operations will be maintained, resumed and / or recovered as intended in the event of a disruption or disaster",
            ],
          },
          {
            subHeading: "Backup and Recovery",
            subDescription: [
              "Determine whether plans include appropriate hardware, data and application software backup and recovery plans / procedures",
            ],
          },
          {
            subHeading: "Security Procedures: ",
            subDescription: [
              "Determine whether plans include security procedures covering the existence and adequacy of information security, physical security and access controls over data backups, networks, systems, alternate sites, and facilities",
            ],
          },
          {
            subHeading:
              "Critical Outsourced Activities and Vendor Relationships",
            subDescription: [
              "Determine whether critical outsourced activities and vendor relationships are sufficiently covered, and SLAs defined to ensure adherence to defined standards and restoration timelines.",
            ],
          },
        ],
      },
    ],
    results: [
      {
        heading:
          "Through our meticulous panning and fieldwork Bough delivered a highly successful project, meeting all targets for delivery and budget. Not only did we identify improvement opportunities to enhance existing processes, but also encourage stronger and more effective collaboration across the organization. Highlights include:",
        description: [
          "Bough benchmarked the organization's current state of the program with respect to the ISO and NIST standards, identified opportunities for improvement and provided recommendations to enhance the effectiveness of the enterprise-wide DRBCP.",
          "We learned that the company lacked direct authority and management oversight over the program, which hindered the company’s ability to drive change and implement best practices across functions. To alleviate this problem, Bough worked with the client to set up a cross-functional DRBCP steering committee to allow for a top-down managed enterprise-wide DRBCP and provide the much-needed leadership for a centralized governance framework.",
          "Comprehensive, well-communicated, and regularly monitored procedures related to governance also helped the client to realize optimal levels of program engagement and coordination, and achieve clarity on employee roles, responsibilities, and reporting requirements; all contributing to an effective program implementation.",
          "By recommending the performance of a comprehensive business impact analysis (BIA) and risk assessment (RA), management was able to adopt a risk-based approach to drive prioritization of DRBCP efforts across the enterprise and efficiently utilize limited resources by focusing on the mission critical functions of the Company.",
        ],
      },
      {
        heading:
          "Through our reviews we learned that the client predominantly focused on events rather than on the results of those events. Through our recommendations we were able to shift the mindset of the senior leadership to focus on the outcome of an event (e.g., facilities destroyed, resources lost), rather than the type of event (e.g., flood, hurricane), to determine severity of the situation, ensuring effective monitoring and response to disruptions and contributing to better strategic decision making",
      },
    ],
  },
  {
    id: "FinOps Maury",
    heading:
      "Revitalizing financial operations for enhanced efficiency and compliance",
    at_a_glance:
      "Bough helps a leading radiofrequency company transform financial operations through strategic technology integration and process optimization",
    what_we_did: [
      "Interim Controllership support",
      "Technology integration",
      "Process automation",
      "Skill enhancement",
      "Data validation",
      "Financial reporting",
      "Compliance improvement",
    ],
    case_story: [
      {
        heading: "Overcoming acquisition challenges",
        description: [
          {
            subHeading:
              "Our client, a leader in advanced radiofrequency measurement and interconnect systems, faced substantial operational challenges after acquiring a new company. The controllership team was understaffed, and reliance on an outdated ERP system (AS400), led to inefficiencies, high error rates, and delayed financial reporting.",
          },
        ],
      },
      {
        heading: "Strategic intervention for sustainable growth",
        description: [
          {
            subHeading:
              "Recognizing the urgent need for change, our client sought a transformative solution that transcended conventional boundaries, encompassing people, processes, and technology. The goal? To streamline financial operations and harness the power of technology for sustained and scalable growth",
          },
        ],
        images: [
          {
            heading: "Challenges highlighted",
            src: cs6Image1,
          },
        ],
      },
      {
        heading: "Innovative financial revamp for lasting efficiency",
        description: [
          {
            subHeading:
              "Bough stepped in as the Interim Controller with a mission to stabilize and optimize the client's financial operations. Our strategy focused on four main pillars: technology integration, process streamlining, skill enhancement, and data accuracy",
            subDescription: [
              "Technology integration: Modernized the ERP system, conducting a thorough analysis to identify and address its shortcomings",
              "Process streamlining: Automated manual processes and standardized procedures to enhance efficiency and reduce errors",
              "Skill enhancement: Developed tailored training programs to bridge skill gaps and foster continuous professional development",
              "Data accuracy: Implemented data validation protocols and conducted meticulous reviews to ensure financial data integrity",
            ],
          },
        ],
        images: [
          {
            heading:
              "Recognizing these challenges as opportunities for improvement, Bough established a focused mindset to mitigate downside risks and capitalize on the opportunities at hand",
            src: cs6Image2,
          },
        ],
      },
    ],
    results: [
      {
        heading: "Focus on repeatable value",
        description: [
          "Through Bough's strategic interventions, the client experienced profound improvements across various facets of financial management:",
          "Through Bough's strategic and tech-focused interventions, our client witnessed a profound transformation in its financial operations. These initiatives were carefully designed to address key challenges and leverage technology to drive efficiency, accuracy, and compliance. The results demonstrate significant improvements across various facets of financial management",
        ],
      },
      {
        heading:
          "Transformational impact. Delivering efficiency and performance gains",
        description: [
          "Enhanced cash flow. Optimized accounts receivable management reduced outstanding balances and improved liquidity.",
          "Improved accuracy. Addressed system errors and discrepancies, enhancing financial reporting reliability.",
          "Operational efficiency. Automated processes and streamlined workflows led to significant time savings and increased productivity.",
          "Audit readiness. Enhanced internal controls and documentation ensured smooth audits and regulatory compliance.",
        ],
        image: {
          src: cs6Image3,
        },
      },
      {
        heading:
          "Bough's interventions not only stabilized the client's financial operations but also positioned them for scalable and sustainable growth",
      },
    ],
  },
  {
    id: "Wiley SOX",
    heading:
      "Bough helps a global leader in publishing education and research transform their SOX compliance program to achieve agility and cost-effectiveness",
    at_a_glance:
      "Bough helps a leading radiofrequency company transform financial operations through strategic technology integration and process optimization",
    what_we_did: [
      "Agile SOX delivery",
      "Control framework analysis",
      "Risk identification",
      "Diagnostic assessment",
      "Dynamic program design",
      "Continuous improvement",
    ],
    case_story: [
      {
        heading: "Navigating SOX compliance in a dynamic business environment",
        description: [
          {
            subHeading:
              "Our client, a renowned publishing education and research company with a rich legacy of over 200 years, faced the challenge of maintaining a robust SOX compliance program amid rapid growth and frequent acquisitions. With over $2 billion in revenues, the company needed a fresh perspective to ensure their compliance efforts kept pace with their evolving business landscape",
          },
        ],
      },
      {
        heading: "Transforming compliance for agility and efficiency",
        description: [
          {
            subHeading:
              "The client previously relied on a Big 4 firm to manage their SOX program but found traditional approaches lacking in agility and cost-effectiveness. Bough was engaged to take over the SOX program, bringing in fresh perspectives, tailored strategies, and efficient solutions to align with the client’s rapidly changing operational needs.",
          },
        ],
      },
      {
        heading: "Revitalizing the SOX program with an adaptive approach",
        description: [
          {
            subHeading:
              "Bough deployed an agile and cost-effective SOX solution designed to cater to the client's dynamic business needs and objectives.",
            subDescription: [
              "Agile SOX delivery: Developed a flexible SOX compliance program to adapt quickly to operational changes.",
              "Control framework analysis: Conducted a thorough review and update of process documentation, including process flows and narratives.",
              "Risk identification: Identified inherent and residual risks, ensuring accurate risk and control assignment.",
              "Diagnostic assessment: Performed an in-depth diagnostic assessment of the existing control framework, addressing gaps and areas of concern.",
              "Dynamic program design: Designed a streamlined SOX program strategy to enhance compliance efforts and reduce costs.",
              "Effective implementation: Seamlessly integrated new controls, updated processes, and aligned SOX compliance with the evolving operational landscape.",
            ],
          },
        ],
        images: [
          {
            heading:
              "Bough deployed an agile and a cost-effective SOX solution that catered to the client’s dynamic business needs and their objectives",
            src: cs7Image1,
          },
        ],
      },
      {
        heading: "Precision-driven SOX compliance solutions",
        description: [
          {
            subHeading:
              "In addition to managing the SOX program and ensuring compliance, Bough implemented targeted solutions to enhance the client’s SOX program, focusing on process optimization, risk management, and technological advancement. Our strategic approach ensured that the compliance framework was streamlined, efficient, and adaptable to future changes",
            subDescription: [
              "Solid baselining of process documentation: Updated process flows and narratives; cleansed the Risk and Control Matrix (RACM) to ensure current and accurate risk and control assignments.",
              "Enhanced reliance by external auditors: Designed comprehensive testing templates to facilitate smoother compliance evaluations and increase auditor reliance.",
              "Streamlined compliance and resource allocation: Reduced compliance burden and optimized resource allocation through an agile approach.",
              "Cost-effective service delivery: Utilized off-shore capabilities to maintain high-quality service at reduced costs.",
              "Control rationalization for operational efficiency: Eliminated redundant or duplicate controls to gain efficiencies.",
              "Adaptive control environment: Implemented a continuous improvement mechanism for proactive risk identification and mitigation.",
            ],
          },
        ],
      },
    ],
    results: [
      {
        heading: "Quantifiable impact and lasting benefits",
        description: [
          "Bough’s innovative strategies led to significant improvements in the client’s SOX compliance program. Our approach enhanced operational efficiency, reduced costs, and ensured a streamlined, reliable compliance process.",
        ],
      },
      {
        heading: "Impact of SOX Transformation",
        description: [
          "Operational efficiency: Agile SOX delivery and control rationalization led to increased productivity and reduced compliance burden.",
          "Audit readiness: Enhanced documentation and testing templates facilitated smoother audit processes and increased auditor reliance.",
          "Cost reduction: Achieved 57% reduction in annual compliance costs by rationalizing controls, increasing auditor reliance, freeing up client internal audit teams’ involvement, and leveraging offshore capabilities for optimal resource allocation.",
          "Adaptive compliance: Continuous improvement mechanisms allowed swift responses to operational changes and proactive risk management.",
        ],
      },
      {
        heading:
          "Bough's tailored solutions not only stabilized the client's SOX compliance program but also positioned them for agile and cost-efficient operations moving forward.",
        description: [
          "57% reduction in compliance costs.",
          "25% increase in auditor reliance on internal control testing",
        ],
      },
    ],
  },
];
