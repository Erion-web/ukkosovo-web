import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, LogOut, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface ActivityForm {
  title: string;
  description: string;
  image: string;
  fullContent: string;
  objectives: string;
  impact: string;
}

export function AdminPanel() {
  const { isAdmin, login, logout, activities, addActivity, updateActivity, deleteActivity } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ActivityForm>({ title: '', description: '', image: '', fullContent: '', objectives: '', impact: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
      setPassword('');
    } else {
      setError('Invalid password');
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ 
      title: '', 
      description: '', 
      image: '',
      fullContent: '',
      objectives: '',
      impact: ''
    });
    setShowForm(true);
  };

  const handleEdit = (id: number) => {
    const activity = activities.find(a => a.id === id);
    if (activity) {
      setEditingId(id);
      setFormData({ 
        title: activity.title, 
        description: activity.description, 
        image: activity.image,
        fullContent: activity.fullContent || '',
        objectives: activity.objectives?.join('\n') || '',
        impact: activity.impact?.join('\n') || ''
      });
      setShowForm(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activityData = {
      ...formData,
      objectives: formData.objectives.split('\n').filter(line => line.trim()),
      impact: formData.impact.split('\n').filter(line => line.trim())
    };
    if (editingId) {
      updateActivity(editingId, activityData);
    } else {
      addActivity(activityData);
    }
    setShowForm(false);
    setFormData({ title: '', description: '', image: '', fullContent: '', objectives: '', impact: '' });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-[#003d82] rounded-full mx-auto mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#003d82] text-center mb-2">Admin Panel</h1>
          <p className="text-gray-600 text-center mb-8">Enter password to access</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none"
                placeholder="Enter admin password"
              />
              {error && <p className="mt-2 text-sm text-[#E30613]">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#003d82] text-white rounded-lg hover:bg-[#002a5c] transition-colors font-medium"
            >
              Login
            </button>
          </form>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="block text-center mt-6 text-sm text-gray-600 hover:text-[#003d82] transition-colors"
          >
            ← Back to website
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#003d82]">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="px-4 py-2 text-gray-700 hover:text-[#003d82] transition-colors"
            >
              View Site
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Manage Activities</h2>
            <p className="text-gray-600">Add, edit, or remove activities from the website</p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-6 py-3 bg-[#003d82] text-white rounded-lg hover:bg-[#002a5c] transition-colors"
          >
            <Plus size={20} />
            Add Activity
          </button>
        </div>

        {/* Activities List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
              <div className="relative h-48">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{activity.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{activity.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(activity.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#003d82] text-white rounded-lg hover:bg-[#002a5c] transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteActivity(activity.id)}
                    className="px-4 py-2 bg-red-50 text-[#E30613] rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No activities yet. Click "Add Activity" to get started.</p>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-[#003d82]">
                  {editingId ? 'Edit Activity' : 'Add New Activity'}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Activity Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none"
                    placeholder="e.g., Annual Tech Summit"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description * (shown on activity cards)
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none resize-none"
                    placeholder="Brief summary for the activity card..."
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="image"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                      <img src={formData.image} alt="Preview" className="w-full h-48 object-cover" />
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Blog Page Content</h4>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="fullContent" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Content * (main blog text - use line breaks for paragraphs)
                      </label>
                      <textarea
                        id="fullContent"
                        required
                        rows={8}
                        value={formData.fullContent}
                        onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none resize-y"
                        placeholder="Write the full blog content here. Use double line breaks for new paragraphs..."
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        This will appear in the "About This Initiative" section
                      </p>
                    </div>

                    <div>
                      <label htmlFor="objectives" className="block text-sm font-medium text-gray-700 mb-2">
                        Key Objectives (one per line)
                      </label>
                      <textarea
                        id="objectives"
                        rows={4}
                        value={formData.objectives}
                        onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none resize-none"
                        placeholder="Objective 1&#10;Objective 2&#10;Objective 3&#10;Objective 4"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Each line will become a separate objective card
                      </p>
                    </div>

                    <div>
                      <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-2">
                        Impact & Results (one per line)
                      </label>
                      <textarea
                        id="impact"
                        rows={4}
                        value={formData.impact}
                        onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003d82] focus:border-transparent outline-none resize-none"
                        placeholder="Impact point 1&#10;Impact point 2&#10;Impact point 3&#10;Impact point 4"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Each line will become a bullet point in the impact section
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#003d82] text-white rounded-lg hover:bg-[#002a5c] transition-colors font-medium"
                  >
                    {editingId ? 'Update Activity' : 'Add Activity'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}