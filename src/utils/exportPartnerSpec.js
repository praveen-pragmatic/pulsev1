export const generatePartnerSpec = (transformItems, planPhases, engagement) => {
  const spec = `# Project Specification for Partner Estimation

## Project Overview
${engagement ? `
- **Project Name:** ${engagement.data.projectName}
- **Client Name:** ${engagement.data.clientName}
- **Project Type:** ${engagement.data.engagementTypes.join(', ')}
- **Start Date:** ${engagement.data.startDate}
- **End Date:** ${engagement.data.endDate}
` : ''}

## Business Context
${engagement ? `
### Scope Description
${engagement.data.scopeDescription}

### Key Deliverables
${engagement.data.keyDeliverables}

### Project Objectives
${engagement.data.projectObjectives || 'Not specified'}
` : ''}

## Requirements Breakdown

### Functional Requirements
${transformItems.filter(item => !item.area.includes('Technical')).map(item => `
#### ${item.requirementId}: ${item.title}
- **Priority:** ${item.priority}
- **Area:** ${item.area}
- **Current State:** ${item.impact}
- **Required State:** ${item.recommendation}
`).join('\n')}

### Technical Requirements
${transformItems.filter(item => item.area.includes('Technical')).map(item => `
#### ${item.requirementId}: ${item.title}
- **Priority:** ${item.priority}
- **Area:** ${item.area}
- **Current State:** ${item.impact}
- **Required State:** ${item.recommendation}
`).join('\n')}

## Implementation Phases
${planPhases.map(phase => `
### ${phase.name}
- **Timeline:** ${phase.startDate} to ${phase.endDate}
- **Status:** ${phase.status}

#### Objectives:
${phase.objectives.map(obj => `- ${obj}`).join('\n')}

#### Deliverables:
${phase.deliverables.map(del => `- ${del}`).join('\n')}
`).join('\n')}

## Estimation Requirements

Please provide estimates for:

1. Development effort (in person-days)
2. Timeline breakdown by phase
3. Team composition and roles needed
4. Technology stack recommendations
5. Risk assessment and mitigation strategies
6. Cost breakdown by:
   - Development
   - Testing
   - Project Management
   - Support & Maintenance
   - Additional Infrastructure/Tools

## Additional Notes
- All estimates should include buffer for potential requirement refinements
- Consider security and compliance requirements throughout
- Include assumptions made during estimation
- Highlight any dependencies or prerequisites
- Specify any third-party tools or services needed

## Response Format
Please provide your estimation in a structured format including:

1. Executive Summary
2. Detailed Breakdown
3. Assumptions & Dependencies
4. Risk Assessment
5. Cost Summary
6. Team Structure
7. Implementation Timeline
8. Value Additions/Recommendations`;

  return spec;
};