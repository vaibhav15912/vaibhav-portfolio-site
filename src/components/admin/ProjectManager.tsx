"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2, Edit, Plus } from 'lucide-react';

export default function ProjectManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link: '',
    category: 'recent_work',
    status: '',
    tag: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('order_index', { ascending: true });
    if (error) console.error(error);
    else setProjects(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingProject) {
      const { error } = await supabase.from('projects').update(formData).eq('id', editingProject.id);
      if (error) alert(error.message);
      else {
        setEditingProject(null);
        resetForm();
        fetchProjects();
      }
    } else {
      const { error } = await supabase.from('projects').insert([formData]);
      if (error) alert(error.message);
      else {
        resetForm();
        fetchProjects();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchProjects();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      link: '',
      category: 'recent_work',
      status: '',
      tag: '',
    });
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || '',
      image_url: project.image_url || '',
      link: project.link || '',
      category: project.category,
      status: project.status || '',
      tag: project.tag || '',
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select 
                  className="w-full border rounded-md p-2" 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="recent_work">Recent Work</option>
                  <option value="startup">Startup</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Link</Label>
                <Input value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
              {formData.category === 'startup' && (
                <>
                  <div className="space-y-2">
                    <Label>Status (link, on-hold, exited)</Label>
                    <Input value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tag (e.g. "on hold", "acquired in 2017")</Label>
                    <Input value={formData.tag} onChange={(e) => setFormData({...formData, tag: e.target.value})} />
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editingProject ? 'Update' : 'Add'}</Button>
              {editingProject && <Button type="button" variant="outline" onClick={() => { setEditingProject(null); resetForm(); }}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="relative group">
            <CardContent className="p-4">
              <div className="h-32 bg-gray-100 rounded-md mb-2 overflow-hidden">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-contain" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
              </div>
              <h3 className="font-bold truncate">{project.title}</h3>
              <p className="text-xs text-gray-500 uppercase">{project.category}</p>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" onClick={() => handleEdit(project)}><Edit size={14}/></Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(project.id)}><Trash2 size={14}/></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
