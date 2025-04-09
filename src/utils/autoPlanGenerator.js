// Auto Plan Generator for RFPs

const generatePhases = (requirements) => {
  // Group requirements by area
  const groupedReqs = requirements.reduce((acc, req) => {
    const area = req.area || 'General';
    if (!acc[area]) acc[area] = [];
    acc[area].push(req);
    return acc;
  }, {});

  // Default phases template
  const phases = [
    {
      name: 'Discovery & Analysis',
      duration: '4-6 weeks',
      objectives: [
        'Document current state processes',
        'Identify pain points and opportunities',
        'Define success criteria'
      ],
      deliverables: [
        'Current State Analysis Document',
        'Gap Analysis Report',
        'Success Metrics Definition'
      ]
    },
    {
      name: 'Design & Architecture',
      duration: '6-8 weeks',
      objectives: [
        'Design target state architecture',
        'Create detailed technical specifications',
        'Define integration points'
      ],
      deliverables: [
        'Solution Architecture Document',
        'Technical Specifications',
        'Integration Design'
      ]
    },
    {
      name: 'Development & Integration',
      duration: '12-16 weeks',
      objectives: [
        'Implement core functionality',
        'Develop integrations',
        'Conduct unit testing'
      ],
      deliverables: [
        'Working Software Components',
        'Integration Points',
        'Test Reports'
      ]
    },
    {
      name: 'Testing & Quality Assurance',
      duration: '4-6 weeks',
      objectives: [
        'Perform system testing',
        'Conduct user acceptance testing',
        'Document test results'
      ],
      deliverables: [
        'Test Cases and Results',
        'UAT Sign-off',
        'Issue Resolution Report'
      ]
    },
    {
      name: 'Deployment & Training',
      duration: '4-6 weeks',
      objectives: [
        'Deploy to production',
        'Conduct user training',
        'Establish support processes'
      ],
      deliverables: [
        'Production Deployment',
        'Training Materials',
        'Support Documentation'
      ]
    }
  ];

  // Customize phases based on requirements
  return phases.map(phase => {
    const customPhase = { ...phase };
    
    // Add area-specific objectives and deliverables
    Object.entries(groupedReqs).forEach(([area, reqs]) => {
      switch (phase.name) {
        case 'Discovery & Analysis':
          customPhase.objectives.push(`Analyze ${area.toLowerCase()} requirements`);
          customPhase.deliverables.push(`${area} Analysis Report`);
          break;
        case 'Design & Architecture':
          if (reqs.some(r => r.priority === 'high')) {
            customPhase.objectives.push(`Design ${area.toLowerCase()} components`);
            customPhase.deliverables.push(`${area} Design Specifications`);
          }
          break;
        case 'Development & Integration':
          const criticalReqs = reqs.filter(r => r.priority === 'critical' || r.priority === 'high');
          if (criticalReqs.length > 0) {
            customPhase.objectives.push(`Implement ${area.toLowerCase()} features`);
            customPhase.deliverables.push(`${area} Implementation`);
          }
          break;
      }
    });

    return customPhase;
  });
};

export const generateAutoPlan = (requirements, project) => {
  const phases = generatePhases(requirements);
  
  // Calculate rough timeline
  let startDate = new Date(project.startDate);
  phases.forEach(phase => {
    const [minWeeks] = phase.duration.split('-').map(n => parseInt(n));
    phase.startDate = startDate.toISOString().split('T')[0];
    
    // Add weeks to startDate
    startDate = new Date(startDate.setDate(startDate.getDate() + (minWeeks * 7)));
    phase.endDate = startDate.toISOString().split('T')[0];
  });

  return {
    title: `Implementation Plan for ${project.name}`,
    description: `Auto-generated implementation plan based on ${requirements.length} requirements`,
    phases,
    estimatedDuration: phases.reduce((total, phase) => {
      const [min, max] = phase.duration.split('-').map(n => parseInt(n));
      return total + ((min + max) / 2);
    }, 0),
    criticalPaths: requirements
      .filter(r => r.priority === 'critical')
      .map(r => ({
        requirement: r.requirementId,
        title: r.title,
        impact: r.impact
      }))
  };
};