// Generate unique RFP ID
export const generateRfpId = (companyName, projectName) => {
  const timestamp = Date.now().toString(36);
  const companyPrefix = companyName.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();
  const projectPrefix = projectName.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();
  return `RFP-${companyPrefix}-${projectPrefix}-${timestamp}`;
};

// Export transform data to markdown format
export const generateTransformMarkdown = (transformItems, planPhases, project) => {
  if (!transformItems || transformItems.length === 0) {
    return '# No Transform Requirements Found';
  }

  const markdown = `# Transform Requirements Analysis
## RFP Details
RFP ID: ${generateRfpId(project.clientName || '', project.name)}

## Project Overview
- **Project Name:** ${project.name}
- **Project Type:** ${project.type}
- **Timeline:** ${project.startDate} to ${project.endDate}

### Scope
${project.scope}

### Objectives
${project.objectives || 'Not specified'}

### Deliverables
${project.deliverables || 'Not specified'}

## Overview
Total Requirements: ${transformItems.length}

## Requirements by Priority
${getPriorityBreakdown(transformItems)}

## Detailed Requirements

${transformItems.map(item => `
### ${item.requirementId}: ${item.title}
- **Area:** ${item.area}
- **Priority:** ${item.priority}
- **Status:** ${item.status}
- **Impact:** ${item.impact}
- **Recommendation:** ${item.recommendation}
`).join('\n')}

## Implementation Phases
${planPhases.map(phase => `
### ${phase.name}
**Timeline:** ${phase.startDate} to ${phase.endDate}
**Status:** ${phase.status}
**Progress:** ${phase.progress}%

#### Objectives:
${phase.objectives.map(obj => `- ${obj}`).join('\n')}

#### Deliverables:
${phase.deliverables.map(del => `- ${del}`).join('\n')}
`).join('\n')}
`;

  return markdown;
};

export const generateCrmRequirements = (transformItems, planPhases, project) => {
  const markdown = `# CRM System Requirements Analysis

## Project Overview
- **Project Name:** ${project.name}
- **Timeline:** ${project.startDate} to ${project.endDate}

## Current CRM Analysis
${transformItems.filter(item => item.area.includes('Current State')).map(item => `
### ${item.title}
- **Impact:** ${item.impact}
- **Recommendation:** ${item.recommendation}
`).join('\n')}

## Data Requirements
${transformItems.filter(item => item.area.includes('Data')).map(item => `
### ${item.title}
- **Current State:** ${item.impact}
- **Required State:** ${item.recommendation}
`).join('\n')}

## Process Requirements
${transformItems.filter(item => item.area.includes('Process')).map(item => `
### ${item.title}
- **Current Process:** ${item.impact}
- **Proposed Process:** ${item.recommendation}
`).join('\n')}

## Integration Requirements
${transformItems.filter(item => item.area.includes('Integration')).map(item => `
### ${item.title}
- **Current Integration:** ${item.impact}
- **Required Integration:** ${item.recommendation}
`).join('\n')}

## Implementation Phases
${planPhases.map(phase => `
### ${phase.name}
**Timeline:** ${phase.startDate} to ${phase.endDate}

#### Objectives:
${phase.objectives.map(obj => `- ${obj}`).join('\n')}

#### Deliverables:
${phase.deliverables.map(del => `- ${del}`).join('\n')}
`).join('\n')}

## Additional Considerations
- Data migration strategy
- User training requirements
- Security and compliance requirements
- Performance requirements
- Backup and disaster recovery
`;

  return markdown;
};

const getPriorityBreakdown = (items) => {
  const priorities = {
    high: items.filter(i => i.priority === 'high').length,
    medium: items.filter(i => i.priority === 'medium').length,
    low: items.filter(i => i.priority === 'low').length
  };

  return `- High Priority: ${priorities.high}
- Medium Priority: ${priorities.medium}
- Low Priority: ${priorities.low}`;
};