"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Edit } from 'lucide-react';

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    quote: '',
    avatar_url: '',
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('testimonials').select('*').order('order_index', { ascending: true });
    if (error) console.error(error);
    else setTestimonials(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingTestimonial) {
      const { error } = await supabase.from('testimonials').update(formData).eq('id', editingTestimonial.id);
      if (error) alert(error.message);
      else {
        setEditingTestimonial(null);
        resetForm();
        fetchTestimonials();
      }
    } else {
      const { error } = await supabase.from('testimonials').insert([formData]);
      if (error) alert(error.message);
      else {
        resetForm();
        fetchTestimonials();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchTestimonials();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      quote: '',
      avatar_url: '',
    });
  };

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      title: testimonial.title || '',
      quote: testimonial.quote,
      avatar_url: testimonial.avatar_url || '',
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Title (e.g. CEO, Good Kind)</Label>
                <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Avatar URL</Label>
                <Input value={formData.avatar_url} onChange={(e) => setFormData({...formData, avatar_url: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Quote</Label>
                <Textarea value={formData.quote} onChange={(e) => setFormData({...formData, quote: e.target.value})} required />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editingTestimonial ? 'Update' : 'Add'}</Button>
              {editingTestimonial && <Button type="button" variant="outline" onClick={() => { setEditingTestimonial(null); resetForm(); }}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="relative group">
            <CardContent className="p-4 flex gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                {testimonial.avatar_url ? (
                  <img src={testimonial.avatar_url} alt={testimonial.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-bold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{testimonial.title}</p>
                <p className="text-sm line-clamp-2 italic">"{testimonial.quote}"</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" onClick={() => handleEdit(testimonial)}><Edit size={14}/></Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(testimonial.id)}><Trash2 size={14}/></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
