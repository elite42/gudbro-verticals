'use client';

import { Plus, Trash } from '@phosphor-icons/react';
import { AboutContent } from '@/lib/supabase';

interface AboutEditorProps {
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
}

export function AboutEditor({ content, onChange }: AboutEditorProps) {
  const aboutContent = content as unknown as AboutContent;

  const updateField = (field: keyof AboutContent, value: unknown) => {
    onChange({ ...content, [field]: value });
  };

  // Team member helpers
  const addTeamMember = () => {
    const team = aboutContent.team || [];
    updateField('team', [...team, { name: '', role: '', image_url: '' }]);
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    const team = [...(aboutContent.team || [])];
    team[index] = { ...team[index], [field]: value };
    updateField('team', team);
  };

  const removeTeamMember = (index: number) => {
    const team = [...(aboutContent.team || [])];
    team.splice(index, 1);
    updateField('team', team);
  };

  // Values helpers
  const addValue = () => {
    const values = aboutContent.values || [];
    updateField('values', [...values, { title: '', description: '', icon: '' }]);
  };

  const updateValue = (index: number, field: string, value: string) => {
    const values = [...(aboutContent.values || [])];
    values[index] = { ...values[index], [field]: value };
    updateField('values', values);
  };

  const removeValue = (index: number) => {
    const values = [...(aboutContent.values || [])];
    values.splice(index, 1);
    updateField('values', values);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Section Title</label>
        <input
          type="text"
          value={aboutContent.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="About Us"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={aboutContent.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Tell your story..."
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Team Members */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Team Members</label>
          <button
            onClick={addTeamMember}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </button>
        </div>

        <div className="space-y-4">
          {(aboutContent.team || []).map((member, index) => (
            <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Member {index + 1}</span>
                <button
                  onClick={() => removeTeamMember(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                  placeholder="Name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                  placeholder="Role (e.g., Head Chef)"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="url"
                  value={member.image_url || ''}
                  onChange={(e) => updateTeamMember(index, 'image_url', e.target.value)}
                  placeholder="Photo URL (optional)"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Our Values</label>
          <button
            onClick={addValue}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Value
          </button>
        </div>

        <div className="space-y-4">
          {(aboutContent.values || []).map((value, index) => (
            <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Value {index + 1}</span>
                <button
                  onClick={() => removeValue(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3">
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={value.icon || ''}
                    onChange={(e) => updateValue(index, 'icon', e.target.value)}
                    placeholder="Icon (emoji)"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-center text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={value.title}
                    onChange={(e) => updateValue(index, 'title', e.target.value)}
                    placeholder="Title"
                    className="col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  value={value.description}
                  onChange={(e) => updateValue(index, 'description', e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
