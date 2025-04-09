import React, { useState } from 'react';
import { FiList, FiLoader, FiAlertCircle, FiCheck, FiUsers, FiCpu, FiArrowRight } from 'react-icons/fi';
import { DndContext, closestCenter, DragOverlay, pointerWithin } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { Task } from './Task';

const CreateTaskList = () => {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState({
    insights: [],
    optimize: [],
    transform: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [agentTaskCounts, setAgentTaskCounts] = useState({});

  const agents = [
    { id: 'ai1', name: 'AI Agent 1', type: 'ai' },
    { id: 'ai2', name: 'AI Agent 2', type: 'ai' },
    { id: 'selva', name: 'Selva', type: 'human' },
    { id: 'shuba', name: 'Shuba', type: 'human' },
    { id: 'arun', name: 'Arun', type: 'human' },
    { id: 'pragmatic', name: 'Pragmatic', type: 'human' }
  ];

  const handlePaste = (e) => {
    const text = e.clipboardData?.getData('text') || '';
    setInputText(text);
  };

  const generateTasks = () => {
    if (!inputText.trim()) {
      setError('Please enter some content');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Parse input text into tasks
      const lines = inputText.split('\n').filter(line => line.trim());
      const newTasks = lines.map((line, index) => ({
        id: `task-${index}`,
        content: line.trim(),
        status: 'insights'
      }));

      setTasks({
        insights: newTasks,
        optimize: [],
        transform: []
      });
    } catch (err) {
      setError('Failed to parse tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);

    const sourceColumn = Object.keys(tasks).find(column => 
      tasks[column].find(task => task.id === active.id)
    );

    if (sourceColumn) {
      setActiveTask(tasks[sourceColumn].find(task => task.id === active.id));
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) {
      setActiveId(null);
      setActiveTask(null);
      return;
    }

    const taskId = active.id;
    const sourceColumn = Object.keys(tasks).find(column =>
      tasks[column].find(task => task.id === taskId)
    );
    const targetColumn = over.id;

    if (sourceColumn && targetColumn && sourceColumn !== targetColumn) {
      setTasks(prev => {
        const task = prev[sourceColumn].find(t => t.id === taskId);
        return {
          ...prev,
          [sourceColumn]: prev[sourceColumn].filter(t => t.id !== taskId),
          [targetColumn]: [...prev[targetColumn], { ...task, status: targetColumn }]
        };
      });
    }

    setActiveId(null);
    setActiveTask(null);
  };

  return (
    <div className="space-y-6">
      {showWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">AI Agents & Humans Workflow</h3>
              <button 
                onClick={() => setShowWorkflow(false)} 
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold absolute top-4 right-4"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-8">
              {tasks.transform.map((task, index) => (
                <div key={task.id} 
                  className={`p-4 rounded-lg border transition-all duration-300 transform ${
                    currentAssignment?.taskId === task.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  } ${currentAssignment?.taskId === task.id ? 'scale-105' : ''}`}
                >
                  <p className="text-sm text-gray-800">{task.content}</p>
                  {currentAssignment?.taskId === task.id && (
                    <div className="mt-2 flex items-center text-sm text-primary-600 animate-pulse">
                      <FiArrowRight className="mr-1" />
                      Assigning to {currentAssignment.agent.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FiCpu className="mr-2" /> AI Agents
                </h4>
                <div className="space-y-3">
                  {agents.filter(a => a.type === 'ai').map(agent => (
                    <div key={agent.id} 
                      className={`p-3 rounded-lg flex items-center transition-all duration-300 ${
                        currentAssignment?.agent.id === agent.id ? 'bg-primary-100 scale-105 shadow-md' : 'bg-gray-50'
                      }`}
                    >
                      <FiCpu className="mr-2 text-primary-600" />
                      <span>{agent.name}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({agentTaskCounts[agent.id] || 0} tasks)
                      </span>
                      {currentAssignment?.agent.id === agent.id && (
                        <div className="ml-auto flex items-center text-primary-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-ping mr-2"></div>
                          <span className="text-sm">Processing</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FiUsers className="mr-2" /> Human Experts
                </h4>
                <div className="space-y-3">
                  {agents.filter(a => a.type === 'human').map(agent => (
                    <div key={agent.id} 
                      className={`p-3 rounded-lg flex items-center transition-all duration-300 ${
                        currentAssignment?.agent.id === agent.id ? 'bg-primary-100 scale-105 shadow-md' : 'bg-gray-50'
                      }`}
                    >
                      <FiUsers className="mr-2 text-primary-600" />
                      <span>{agent.name}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({agentTaskCounts[agent.id] || 0} tasks)
                      </span>
                      {currentAssignment?.agent.id === agent.id && (
                        <div className="ml-auto flex items-center text-primary-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full animate-ping mr-2"></div>
                          <span className="text-sm">Reviewing</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Processing {tasks.transform.length} tasks...
                </div>
                <button
                  onClick={() => setShowWorkflow(false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create Task List</h2>
            <p className="text-gray-600">Generate a Kanban board from text</p>
          </div>
          <button
            onClick={() => {
              if (tasks.transform.length > 0) {
                setShowWorkflow(true);
                // Start animation
                let taskIndex = 0;
                let agentIndex = 0;
                
                const animate = () => {
                  if (taskIndex >= tasks.transform.length) {
                    setTimeout(() => setCurrentAssignment(null), 2000);
                    // Calculate final task counts
                    const counts = agents.reduce((acc, agent, idx) => {
                      const assignedTasks = tasks.transform.filter((_, i) => i % agents.length === idx);
                      acc[agent.id] = assignedTasks.length;
                      return acc;
                    }, {});
                    setAgentTaskCounts(counts);
                    return;
                  }
                  
                  setCurrentAssignment({
                    taskId: tasks.transform[taskIndex].id,
                    agent: agents[agentIndex % agents.length]
                  });
                  
                  taskIndex++;
                  agentIndex++;
                  setTimeout(animate, 3000);
                };
                
                animate();
              }
            }}
            disabled={tasks.transform.length === 0}
            className="btn btn-primary flex items-center"
          >
            <FiUsers className="mr-2" />
            Invoke AI Agents & Humans
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tasks Content
            </label>
            <textarea
              className="input-field min-h-[200px]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onPaste={handlePaste}
              placeholder="Paste your tasks here (one per line)..."
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-lg flex items-center">
              <FiAlertCircle className="mr-2" />
              {error}
            </div>
          )}

          <button
            onClick={generateTasks}
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Generating Tasks...
              </>
            ) : (
              <>
                <FiList className="mr-2" />
                Generate Tasks
              </>
            )}
          </button>
        </div>

        {Object.keys(tasks).some(column => tasks[column].length > 0) && (
          <div className="mt-8">
            <DndContext 
              collisionDetection={pointerWithin}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={() => {
                setActiveId(null);
                setActiveTask(null);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                {Object.entries(tasks).map(([status, items]) => (
                  <KanbanColumn
                    key={status}
                    id={status}
                    title={status.charAt(0).toUpperCase() + status.slice(1)}
                    tasks={items}
                    columnType={status}
                  />
                ))}
                <DragOverlay>
                  {activeTask ? <Task task={activeTask} isDragging /> : null}
                </DragOverlay>
              </div>
            </DndContext>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTaskList;