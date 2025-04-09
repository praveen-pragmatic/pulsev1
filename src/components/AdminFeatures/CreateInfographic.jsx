import React, { useState } from 'react';
import { FiZap, FiBox, FiCompass, FiAward, FiStar, FiTarget, FiShare2, FiCopy, FiDownload, FiCheck, FiGlobe } from 'react-icons/fi';
import html2canvas from 'html2canvas';
import { nanoid } from 'nanoid';

const CreateInfographic = () => {
  const [content, setContent] = useState('');
  const [showInfographic, setShowInfographic] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [infographicData, setInfographicData] = useState(null);
  const [shareUrl, setShareUrl] = useState('');
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  
  const defaultTemplate = `Digital Transformation KPI Dashboard

[Card: 94% System Uptime]
[Card: ₹12.5M Revenue Growth]
[Card: 40% Cost Reduction]

Key Performance Indicators:

Business Metrics:
- Monthly Recurring Revenue (MRR): ₹12.5M ↑ (+15% YoY)
- Customer Acquisition Cost: ₹85K ↓ (-10%)
- Customer Lifetime Value: ₹2.8Cr ↑ (+25%)
- Client Retention Rate: 94% ↑ (Industry: 85%)
- Lead Conversion Rate: 12.5% ↑ (Industry: 10%)

Operational Metrics:
- System Uptime: 99.9% ↑ (SLA: 99.5%)
- Process Automation Rate: 85% ↑ (Industry: 60%)
- Average Response Time: 2.5s ↓ (Target: 3s)
- First Contact Resolution: 78% ↑ (Industry: 65%)
- Compliance Score: 98% ↑ (Regulatory: 95%)

Risk & Security:
- Security Incident Rate: 0.1% ↓ (Industry: 1%)
- Risk Assessment Coverage: 95% ↑ (Target: 90%)
- Audit Compliance Rate: 100% ↑ (Required: 100%)
- Data Backup Success Rate: 99.99% ↑ (SLA: 99.9%)

Innovation & Growth:
- New Feature Adoption: 75% ↑ (Target: 65%)
- Digital Channel Usage: 85% ↑ (Industry: 70%)
- API Integration Success: 99.5% ↑ (SLA: 99%)
- Mobile Platform Usage: 65% ↑ (Industry: 55%)`;

  React.useEffect(() => {
    // Set default template when component mounts
    if (!content) {
      setContent(defaultTemplate);
    }
  }, []);

  const generateShareableUrl = async () => {
    // Store infographic data in localStorage with a unique ID
    const shareId = nanoid(10);
    localStorage.setItem(`infographic_${shareId}`, JSON.stringify(infographicData));
    
    // Generate shareable URL
    const url = `${window.location.origin}?infographic=${shareId}`;
    setShareUrl(url);
    
    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to copy share link:', error);
    }
  };

  const getRandomIcon = () => {
    const icons = [
      { icon: FiCompass, label: 'Analysis' },
      { icon: FiBox, label: 'Product' },
      { icon: FiTarget, label: 'Goals' },
      { icon: FiGlobe, label: 'Market' },
      { icon: FiAward, label: 'Achievement' },
      { icon: FiStar, label: 'Quality' }
    ];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const analyzeContent = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const keyPoints = [];
    const cardContents = [];
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;
      
      // Check for card content syntax [Card: content] or [card : content]
      const cardMatch = trimmedLine.match(/\[(Card|card)\s*:\s*(.+?)\]/);
      if (cardMatch) {
        cardContents.push(cardMatch[2].trim());
      } else {
        keyPoints.push(trimmedLine);
      }
    });

    const metrics = cardContents.length > 0 ? 
      cardContents.map(content => ({
        displayValue: content,
        description: 'Transformation Metric',
        icon: getRandomIcon()
      })) :
      keyPoints.slice(0, 3).map(line => ({
        displayValue: line,
        description: 'Key Metric',
        icon: getRandomIcon()
      }));
    
    // Generate color scheme
    const colors = [
      'rgb(99, 102, 241)', // primary-600
      'rgb(34, 197, 94)', // green-500
      'rgb(249, 115, 22)', // orange-500
      'rgb(168, 85, 247)', // purple-500
      'rgb(14, 165, 233)', // sky-500
    ];

    return {
      title: keyPoints[0] || 'Business Insights',
      points: keyPoints.slice(1),
      metrics: metrics,
      colors
    };
  };

  const handleCreate = async () => {
    if (!content.trim()) return;
    
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data = analyzeContent(content);
      setInfographicData(data);
      setShowInfographic(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderInfographic = () => {
    if (!infographicData) return null;

    const { title, points, metrics, colors } = infographicData;
    
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Title Section */}
        <div className="text-center relative">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mb-6" />
        </div>

        {/* Share and Download Buttons */}
        <div className="flex justify-end space-x-2 mb-6">
            <button
              onClick={generateShareableUrl}
              className="btn btn-secondary text-sm flex items-center"
              title="Share Infographic"
            >
              <FiShare2 className="h-4 w-4 mr-1" />
              Share
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('infographic-content');
                if (element) {
                  html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: null,
                    onclone: (clonedDoc) => {
                      const clonedElement = clonedDoc.getElementById('infographic-content');
                      if (clonedElement) {
                        // Set explicit background color
                        clonedElement.style.backgroundColor = '#ffffff';
                        
                        // Ensure all text has strong contrast
                        const textElements = clonedElement.querySelectorAll('h2, h3, p, div');
                        textElements.forEach(el => {
                          el.style.color = '#1f2937'; // Force dark text
                        });
                        
                        // Make metric cards stand out
                        const cards = clonedElement.querySelectorAll('.bg-gray-50');
                        cards.forEach(card => {
                          card.style.backgroundColor = '#f8fafc'; // bg-slate-50
                          card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                        });
                        
                        // Enhance metric numbers
                        const metrics = clonedElement.querySelectorAll('.text-3xl');
                        metrics.forEach(metric => {
                          metric.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.1)';
                        });
                      }
                    }
                  }).then(canvas => {
                    try {
                      const link = document.createElement('a');
                      link.download = 'infographic.png';
                      link.href = canvas.toDataURL('image/png');
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    } catch (error) {
                      console.error('Failed to download infographic:', error);
                    }
                  }).catch(error => {
                    console.error('Failed to generate infographic image:', error);
                  });
                }
              }}
              className="btn btn-secondary text-sm flex items-center"
              title="Download as Image"
            >
              <FiDownload className="h-4 w-4 mr-1" />
              Download
            </button>
          </div>

        {showShareSuccess && (
          <div className="fixed top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg animate-fade-in flex items-center">
            <FiCheck className="mr-2" /> 
            <span>Share link copied to clipboard!</span>
            {shareUrl && (
              <button
                onClick={() => window.open(shareUrl, '_blank')}
                className="ml-2 underline text-primary-600 hover:text-primary-800"
              >
                Open
              </button>
            )}
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {metrics.slice(0, 3).map((metric, i) => (
            <div 
              key={i}
              className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md relative overflow-hidden min-h-[160px]"
              style={{ borderLeft: `4px solid ${colors[i % colors.length]}` }}
            >
              <div 
                className="absolute -right-4 -top-4 w-24 h-24 opacity-5 transform rotate-12"
                style={{ color: colors[i % colors.length] }}
              >
                {metric.icon.icon({ className: 'w-full h-full' })}
              </div>
              <div className="flex items-center mb-2">
                {metric.icon.icon({ 
                  className: `h-6 w-6`,
                  style: { color: colors[i % colors.length] }
                })}
              </div>
              <div className="text-lg font-medium text-gray-800 mt-2">
                {metric.displayValue && (
                  <p className="mb-1">{metric.displayValue}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Key Points */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.slice(3).map((point, i) => (
              <div 
                key={i}
                className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div 
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transform rotate-3"
                  style={{ backgroundColor: `${colors[i % colors.length]}15` }}
                >
                  {[FiCompass, FiBox, FiTarget, FiGlobe, FiAward, FiStar][i % 6]({ 
                    style: { color: colors[i % colors.length] },
                    className: 'w-5 h-5'
                  })}
                </div>
                <p className="ml-3 text-sm text-gray-600">{point}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Infographic Generator</h2>
            <p className="text-gray-600">Paste your content and let AI create a beautiful, animated infographic</p>
          </div>
        </div>

        {!showInfographic ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Content for Visualization
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input-field min-h-[300px] font-mono"
                placeholder={defaultTemplate}
              />
            </div>

            <button
              onClick={handleCreate}
              disabled={isGenerating || !content.trim()}
              className="btn btn-primary w-full flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Generating Infographic...
                </>
              ) : (
                <>
                  <FiZap className="mr-2" />
                  Create Infographic
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div id="infographic-content" className="bg-white p-4 md:p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#ffffff', minHeight: '600px' }}>
              {renderInfographic()}
            </div>
            
            <button
              onClick={() => {
                setShowInfographic(false);
                setContent('');
              }}
              className="btn btn-secondary w-full"
            >
              Create Another Infographic
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateInfographic;