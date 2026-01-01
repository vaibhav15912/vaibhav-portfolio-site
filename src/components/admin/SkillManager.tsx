"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2, Edit } from 'lucide-react';

export default function SkillManager() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'designer',
    items: '', // We'll handle as comma-separated string for editing
    sub_heading_1: '',
    sub_items_1: '',
    sub_heading_2: '',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('skills').select('*').order('order_index', { ascending: true });
    if (error) console.error(error);
    else setSkills(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const itemsArray = formData.items.split(',').map(i => i.trim()).filter(i => i !== '');
    const dataToSubmit = {
      ...formData,
      items: itemsArray,
    };

    if (editingSkill) {
      const { error } = await supabase.from('skills').update(dataToSubmit).eq('id', editingSkill.id);
      if (error) alert(error.message);
      else {
        setEditingSkill(null);
        resetForm();
        fetchSkills();
      }
    } else {
      const { error } = await supabase.from('skills').insert([dataToSubmit]);
      if (error) alert(error.message);
      else {
        resetForm();
        fetchSkills();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchSkills();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      type: 'designer',
      items: '',
      sub_heading_1: '',
      sub_items_1: '',
      sub_heading_2: '',
    });
  };

  const handleEdit = (skill: any) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      description: skill.description || '',
      type: skill.type,
      items: Array.isArray(skill.items) ? skill.items.join(', ') : '',
      sub_heading_1: skill.sub_heading_1 || '',
      sub_items_1: skill.sub_items_1 || '',
      sub_heading_2: skill.sub_heading_2 || '',
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{editingSkill ? 'Edit Skill Category' : 'Add New Skill Category'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <select 
                  className="w-full border rounded-md p-2" 
                  value={formData.type} 
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="designer">Designer</option>
                  <option value="developer">Developer</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Items (comma-separated, e.g. "Figma, Sketch, Adobe XD")</Label>
                <Input value={formData.items} onChange={(e) => setFormData({...formData, items: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Sub-heading 1 (e.g. "Things I enjoy designing:")</Label>
                <Input value={formData.sub_heading_1} onChange={(e) => setFormData({...formData, sub_heading_1: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Sub-items 1 (e.g. "UX, UI, Web")</Label>
                <Input value={formData.sub_items_1} onChange={(e) => setFormData({...formData, sub_items_1: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Sub-heading 2 (e.g. "Design Tools:")</Label>
                <Input value={formData.sub_heading_2} onChange={(e) => setFormData({...formData, sub_heading_2: e.target.value})} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editingSkill ? 'Update' : 'Add'}</Button>
              {editingSkill && <Button type="button" variant="outline" onClick={() => { setEditingSkill(null); resetForm(); }}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <Card key={skill.id} className="relative group">
            <CardContent className="p-4">
              <h3 className="font-bold">{skill.name}</h3>
              <p className="text-sm text-gray-500 mb-2 uppercase">{skill.type}</p>
              <p className="text-sm mb-4 line-clamp-2">{skill.description}</p>
              <div className="flex flex-wrap gap-1">
                {Array.isArray(skill.items) && skill.items.map((item: string, i: number) => (
                  <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{item}</span>
                ))}
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" onClick={() => handleEdit(skill)}><Edit size={14}/></Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(skill.id)}><Trash2 size={14}/></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
