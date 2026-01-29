'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Wallet, Edit3, Save, X, Camera } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import Image from 'next/image';

export default function ProfileContent() {
  const { user, profile, loading, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    email: profile?.email || '',
    wallet_address: profile?.wallet_address || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    
    try {
      await updateProfile({
        username: formData.username,
        wallet_address: formData.wallet_address,
      });
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: profile?.username || '',
      email: profile?.email || '',
      wallet_address: profile?.wallet_address || '',
    });
    setIsEditing(false);
    setError('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-brand-background to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-brand-background to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <h1 className="text-4xl font-black text-brand-primary mb-4">Profile</h1>
            <p className="text-brand-secondary">Please sign in to view your profile.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-brand-background to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-brand-primary mb-4">
            MY PROFILE
          </h1>
          <p className="text-xl text-brand-secondary">
            Manage your MILLIONBONE account settings and information
          </p>
        </motion.div>

        {/* Success/Error Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
          >
            <p className="text-red-600">{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
          >
            <p className="text-green-600">{success}</p>
          </motion.div>
        )}

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border overflow-hidden"
        >
          
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    {profile?.avatar_url ? (
                      <Image
                        src={profile.avatar_url}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="h-10 w-10 text-white" />
                    )}
                  </div>
                  <button className="absolute -bottom-1 -right-1 bg-brand-accent text-white p-2 rounded-full hover:bg-opacity-90 transition-colors">
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {profile?.username || 'MBONE Holder'}
                  </h2>
                  <p className="text-white/80">
                    Member since {profile?.created_at ? formatDate(profile.created_at) : 'Unknown'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full font-medium transition-colors flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-6 flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-brand-secondary font-medium mb-2">
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        placeholder="Enter your username"
                      />
                    ) : (
                      <div className="bg-gray-50 px-4 py-3 rounded-xl">
                        {profile?.username || 'Not set'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-brand-secondary font-medium mb-2">
                      Email Address
                    </label>
                    <div className="bg-gray-50 px-4 py-3 rounded-xl flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{profile?.email}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed here. Contact support if needed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Wallet Information */}
              <div>
                <h3 className="text-xl font-bold text-brand-primary mb-6 flex items-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <span>Wallet Information</span>
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-brand-secondary font-medium mb-2">
                      Wallet Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="wallet_address"
                        value={formData.wallet_address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                        placeholder="Enter your wallet address"
                      />
                    ) : (
                      <div className="bg-gray-50 px-4 py-3 rounded-xl">
                        {profile?.wallet_address ? (
                          <span className="font-mono text-sm">
                            {profile.wallet_address.slice(0, 6)}...{profile.wallet_address.slice(-4)}
                          </span>
                        ) : (
                          'Not connected'
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-brand-secondary font-medium mb-2">
                      Account Created
                    </label>
                    <div className="bg-gray-50 px-4 py-3 rounded-xl flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{profile?.created_at ? formatDate(profile.created_at) : 'Unknown'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="mt-8 flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 text-brand-secondary rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-brand-accent text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-white rounded-2xl p-6 shadow-lg border"
        >
          <h3 className="text-lg font-bold text-brand-primary mb-4">Account Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-green-600 font-bold text-lg">Verified</div>
              <div className="text-green-600 text-sm">Email Verified</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-blue-600 font-bold text-lg">Active</div>
              <div className="text-blue-600 text-sm">Account Status</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-purple-600 font-bold text-lg">Diamond</div>
              <div className="text-purple-600 text-sm">Hands Level</div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}