import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiArrowLeft, FiDownload, FiCopy } from 'react-icons/fi';

const GeneratedSpecification = ({ formData, onBack }) => {
  const [copied, setCopied] = useState(false);
  
  const generateMarkdown = () => {
    return `# Project Specification Document

## Executive Summary
This document outlines the requirements and specifications for a project in the ${formData.industry || '[Industry]'} sector, aiming to ${formData.businessObjective || 'achieve the business objectives'}.

## 1. Business Context

### 1.1 Industry/Sector
${formData.industry || 'Not specified'}

### 1.2 Business Objective/Mission
${formData.businessObjective || 'Not specified'}

### 1.3 Operational Scale
${formData.operationalScale || 'Not specified'}

## 2. Target Users & Stakeholders

### 2.1 Primary User Groups and Roles
${formData.primaryUsers || 'Not specified'}

### 2.2 Key Stakeholders and Decision Makers
${formData.keyStakeholders || 'Not specified'}

### 2.3 User Pain Points and Needs
${formData.userPainPoints || 'Not specified'}

## 3. Problem Statement

### 3.1 Specific Challenges to Address
${formData.challenges || 'Not specified'}

### 3.2 Current Workflow/Process Limitations
${formData.limitations || 'Not specified'}

### 3.3 Business Impact of These Problems
${formData.businessImpact || 'Not specified'}

## 4. Project Requirements

### 4.1 Must-have Features and Capabilities
${formData.features || 'Not specified'}

### 4.2 Technical Constraints or Preferences
${formData.technicalConstraints || 'Not specified'}

### 4.3 Integration Requirements with Existing Systems
${formData.integrationRequirements || 'Not specified'}

### 4.4 Security/Compliance Considerations
${formData.securityCompliance || 'Not specified'}

### 4.5 Performance Expectations
${formData.performanceExpectations || 'Not specified'}

## 5. Success Criteria

### 5.1 Desired Business Outcomes
${formData.desiredOutcomes || 'Not specified'}

### 5.2 Measurable Goals and Metrics
${formData.measurableGoals || 'Not specified'}

### 5.3 Timeline Expectations
${formData.timeline || 'Not specified'}

### 5.4 Budget Constraints
${formData.budget || 'Not specified'}

## 6. Recommended Implementation Approach

### 6.1 Project Phases
1. **Discovery & Requirements Refinement** - Detailed analysis of requirements, user research, and technical planning
2. **Design Phase** - Creation of UX/UI designs, architecture plans, and data models
3. **Development Phase** - Iterative development of features with regular stakeholder feedback
4. **Testing & QA** - Comprehensive testing including functional, security, and performance testing
5. **Deployment & Launch** - Phased rollout strategy with monitoring and support
6. **Post-Launch Optimization** - Analysis of user feedback and performance metrics for improvements

### 6.2 Risk Assessment
* **Potential Risks**
  * Scope creep due to evolving requirements
  * Integration challenges with existing systems
  * User adoption barriers
  * Timeline delays due to technical complexities

* **Mitigation Strategies**
  * Regular stakeholder alignment meetings
  * Early proof-of-concept for critical integrations
  * User-centered design approach with user testing
  * Agile development methodology with buffer time

### 6.3 Technical Recommendations
Based on the requirements provided, we recommend:
* A scalable, cloud-based architecture to support growth
* Modern frontend frameworks for responsive, cross-platform UI
* API-first design for flexibility and future extensibility
* Comprehensive analytics implementation for measuring success metrics
* Automated testing framework to ensure quality and compliance

## 7. Next Steps
1. Review and finalize this specification document
2. Stakeholder sign-off on requirements and success criteria
3. Resource allocation and team assembly
4. Project kickoff and detailed planning
5. Begin implementation following the recommended approach

---

*This specification was generated based on information provided. Further refinement may be necessary through stakeholder discussions and technical discovery.*
`;
  };
  
  const markdownContent = generateMarkdown();
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(markdownContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const handleDownloadClick = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-specification.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Project Specification</h2>
        <p className="text-gray-600">
          Here's your generated project specification based on the information you provided.
        </p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex justify-end p-4 border-b border-gray-200">
          <button
            onClick={handleCopyClick}
            className="btn btn-secondary flex items-center space-x-2 mr-2"
          >
            <FiCopy />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          
          <button
            onClick={handleDownloadClick}
            className="btn btn-primary flex items-center space-x-2"
          >
            <FiDownload />
            <span>Download</span>
          </button>
        </div>
        
        <div className="p-6 markdown-content overflow-auto max-h-[60vh] prose prose-sm md:prose lg:prose-lg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdownContent}
          </ReactMarkdown>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-10">
        <button
          onClick={onBack}
          className="btn btn-secondary flex items-center space-x-2"
        >
          <FiArrowLeft />
          <span>Edit Information</span>
        </button>
        
        <div className="text-right">
          <p className="text-green-600 font-medium mb-1">Specification Generated Successfully!</p>
          <p className="text-sm text-gray-600">You can copy, download, or edit your information</p>
        </div>
      </div>
    </div>
  );
};

export default GeneratedSpecification;