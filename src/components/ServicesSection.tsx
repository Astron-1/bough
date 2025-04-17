"use client";

import React from 'react';
import ServiceCard from './ServiceCard';

interface ServicesSectionProps {
  className?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ className = '' }) => {
  // Example data for services
  const serviceTabs = [
    { id: 'accounting', label: 'Accounting' },
    { id: 'risk', label: 'Risk' },
    { id: 'transformation', label: 'Transformation' },
    { id: 'esg', label: 'Esg' }
  ];

  const serviceContents = [
    {
      id: 'accounting',
      title: 'Record, recognize, and report, confidently',
      description: 'Modern accounting challenges demand agility, precision, and strategic foresight. Our Accounting Advisory services integrate finance and accounting operations, navigate complex regulatory landscapes, and implement best practices that drive financial clarity and operational excellence.',
      imageSrc: '/services/accounting.jpg',
      learnMoreUrl: '/services/accounting'
    },
    {
      id: 'risk',
      title: 'Identify, mitigate, and manage risk effectively',
      description: 'In today&apos;s rapidly evolving business environment, risk management is more critical than ever. Our comprehensive risk assessment and management services help you identify potential threats, implement mitigation strategies, and establish robust governance frameworks to protect your organization.',
      imageSrc: '/services/risk.jpg',
      learnMoreUrl: '/services/risk'
    },
    {
      id: 'transformation',
      title: 'Navigate change with confidence and clarity',
      description: 'Business transformation requires both vision and execution. Our transformation services guide you through strategic changes, operational improvements, and digital initiatives with a focus on sustainable results and organizational alignment.',
      imageSrc: '/services/transformation.jpg',
      learnMoreUrl: '/services/transformation'
    },
    {
      id: 'esg',
      title: 'Build sustainable value for all stakeholders',
      description: 'Environmental, Social, and Governance (ESG) considerations are now central to business strategy. Our ESG services help you develop and implement meaningful sustainability initiatives, meet reporting requirements, and create long-term value for all stakeholders.',
      imageSrc: '/services/esg.jpg',
      learnMoreUrl: '/services/esg'
    }
  ];

  return (
    <section className={`py-24 relative flex justify-center ${className}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <ServiceCard 
          tabs={serviceTabs}
          contents={serviceContents}
          defaultActiveTab="accounting"
        />
      </div>
    </section>
  );
};

export default ServicesSection; 