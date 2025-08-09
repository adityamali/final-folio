'use client';
import React, { useState, useEffect } from 'react';
import { getFormSubmissions, type EnquiryRecord } from '../../lib/formSubmission';

const AdminDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const result = await getFormSubmissions();
      
      if (result.success && result.data) {
        setSubmissions(result.data as EnquiryRecord[]);
        setError(null);
      } else {
        setError(result.error || 'Failed to load enquiries');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error loading enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          <span className="text-lg">Loading enquiries...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold mb-2 text-red-600">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadSubmissions}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Enquiries</h1>
          <p className="text-gray-600">
            Total enquiries: {submissions.length}
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold mb-2">No enquiries yet</h2>
            <p className="text-gray-600">
              Enquiries will appear here once people start using your form.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {submissions.map((enquiry) => (
              <div
                key={enquiry.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{enquiry.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{enquiry.email}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(enquiry.submitted_at)}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Services Requested:</h4>
                  <div className="flex flex-wrap gap-2">
                    {enquiry.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {enquiry.message && (
                  <div>
                    <h4 className="font-medium mb-2">Message:</h4>
                    <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      {enquiry.message}
                    </p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>ID: {enquiry.id}</span>
                    <span>Created: {formatDate(enquiry.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={loadSubmissions}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-foreground rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;