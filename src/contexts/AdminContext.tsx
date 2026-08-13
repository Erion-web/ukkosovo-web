import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { supabase } from '../utils/supabase/client';

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
  fullContent?: string;
  objectives?: string[];
  impact?: string[];
}

interface AIWallResponse {
  id: number;
  answer: string;
  created_at: string;
}

interface AIWallPhoto {
  id: number;
  url: string;
  created_at: string;
}

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id'>) => Promise<void>;
  updateActivity: (id: number, activity: Omit<Activity, 'id'>) => Promise<void>;
  deleteActivity: (id: number) => Promise<void>;
  uploadActivityImage: (file: File) => Promise<string>;
  loading: boolean;
  aiWallResponses: AIWallResponse[];
  fetchAIWallResponses: () => Promise<void>;
  aiWallLoading: boolean;
  photos: AIWallPhoto[];
  fetchPhotos: () => Promise<void>;
  uploadPhoto: (file: File) => Promise<void>;
  deletePhoto: (id: number, url: string) => Promise<void>;
  photosLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'ukkosovohub2026';
const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-862435c9`;

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiWallResponses, setAIWallResponses] = useState<AIWallResponse[]>([]);
  const [aiWallLoading, setAIWallLoading] = useState(false);
  const [photos, setPhotos] = useState<AIWallPhoto[]>([]);
  const [photosLoading, setPhotosLoading] = useState(false);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/activities`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      if (!response.ok) throw new Error('Failed to fetch activities');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities from server:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const addActivity = async (activity: Omit<Activity, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
        body: JSON.stringify(activity)
      });
      if (!response.ok) throw new Error('Failed to add activity');
      const newActivity = await response.json();
      setActivities(prev => [...prev, newActivity]);
    } catch (error) {
      console.error('Error adding activity to server:', error);
      throw error;
    }
  };

  const updateActivity = async (id: number, activity: Omit<Activity, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/activities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
        body: JSON.stringify(activity)
      });
      if (!response.ok) throw new Error('Failed to update activity');
      const updatedActivity = await response.json();
      setActivities(prev => prev.map(a => a.id === id ? updatedActivity : a));
    } catch (error) {
      console.error('Error updating activity on server:', error);
      throw error;
    }
  };

  const deleteActivity = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/activities/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      if (!response.ok) throw new Error('Failed to delete activity');
      setActivities(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting activity from server:', error);
      throw error;
    }
  };

  const uploadActivityImage = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop();
    const path = `activity-${Date.now()}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('activity-images')
      .upload(path, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('activity-images')
      .getPublicUrl(uploadData.path);

    return publicUrl;
  };

  const fetchAIWallResponses = async () => {
    try {
      setAIWallLoading(true);
      const { data, error } = await supabase
        .from('ai_wall_responses')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setAIWallResponses(data || []);
    } catch (error) {
      console.error('Error fetching AI wall responses:', error);
    } finally {
      setAIWallLoading(false);
    }
  };

  const fetchPhotos = async () => {
    try {
      setPhotosLoading(true);
      const { data, error } = await supabase
        .from('ai_wall_photos')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setPhotosLoading(false);
    }
  };

  const uploadPhoto = async (file: File) => {
    const ext = file.name.split('.').pop();
    const path = `photo-${Date.now()}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('ai-wall-photos')
      .upload(path, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('ai-wall-photos')
      .getPublicUrl(uploadData.path);

    const { error: dbError } = await supabase
      .from('ai_wall_photos')
      .insert({ url: publicUrl });

    if (dbError) throw dbError;

    await fetchPhotos();
  };

  const deletePhoto = async (id: number, url: string) => {
    const path = url.split('/').pop();
    if (path) {
      await supabase.storage.from('ai-wall-photos').remove([path]);
    }
    const { error } = await supabase.from('ai_wall_photos').delete().eq('id', id);
    if (error) throw error;
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        activities,
        addActivity,
        updateActivity,
        deleteActivity,
        uploadActivityImage,
        loading,
        aiWallResponses,
        fetchAIWallResponses,
        aiWallLoading,
        photos,
        fetchPhotos,
        uploadPhoto,
        deletePhoto,
        photosLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
