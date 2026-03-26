import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
  fullContent?: string;
  objectives?: string[];
  impact?: string[];
}

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id'>) => Promise<void>;
  updateActivity: (id: number, activity: Omit<Activity, 'id'>) => Promise<void>;
  deleteActivity: (id: number) => Promise<void>;
  loading: boolean;
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

  // Fetch activities from server
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/activities`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities from server:', error);
      // Keep current activities if fetch fails
    } finally {
      setLoading(false);
    }
  };

  // Load activities on mount
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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(activity)
      });

      if (!response.ok) {
        throw new Error('Failed to add activity');
      }

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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(activity)
      });

      if (!response.ok) {
        throw new Error('Failed to update activity');
      }

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
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete activity');
      }

      setActivities(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting activity from server:', error);
      throw error;
    }
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
        loading,
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