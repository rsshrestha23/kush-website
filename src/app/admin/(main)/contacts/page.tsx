'use client';

import { useState, useEffect } from 'react';
import { IconMail, IconPhone, IconBuilding, IconSearch, IconFilter, IconTrash, IconCheck, IconX, IconEye, IconClock } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { Contact } from '@/types/blog';
import { format } from 'date-fns';

interface ContactsResponse {
  contacts: Contact[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalContacts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  stats: {
    total: number;
    unread: number;
    read: number;
  };
}

export default function AdminContacts() {
  const [contactsData, setContactsData] = useState<ContactsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const fetchContacts = async (page = 1, filterValue = filter, search = searchTerm) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        filter: filterValue,
        search,
      });

      const response = await fetch(`/api/admin/contacts?${params}`);
      if (response.ok) {
        const data = await response.json();
        setContactsData(data);
      } else {
        toast.error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage, filter, searchTerm);
  }, [currentPage, filter, searchTerm]);

  const handleMarkAsRead = async (contactId: string, isRead: boolean) => {
    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead }),
      });

      if (response.ok) {
        toast.success(`Contact marked as ${isRead ? 'read' : 'unread'}`);
        fetchContacts(currentPage, filter, searchTerm);
      } else {
        toast.error('Failed to update contact status');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Error updating contact');
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Contact deleted successfully');
        fetchContacts(currentPage, filter, searchTerm);
        setSelectedContact(null);
      } else {
        toast.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Error deleting contact');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchContacts(1, filter, searchTerm);
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy HH:mm');
  };

  const getServiceDisplayName = (service: string) => {
    const serviceMap: { [key: string]: string } = {
      'web-development': 'Web Development',
      'mobile-development': 'Mobile Development',
      'ui-ux-design': 'UI/UX Design',
      'cloud-services': 'Cloud Services',
      'digital-marketing': 'Digital Marketing',
      'it-consulting': 'IT Consulting',
      'other': 'Other'
    };
    return serviceMap[service] || service;
  };

  if (loading && !contactsData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
        <p className="text-gray-600">Manage and respond to customer inquiries</p>
      </div>

      {/* Stats Cards */}
      {contactsData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{contactsData.stats.total}</p>
              </div>
              <IconMail className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{contactsData.stats.unread}</p>
              </div>
              <IconClock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Read</p>
                <p className="text-2xl font-bold text-gray-900">{contactsData.stats.read}</p>
              </div>
              <IconCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center gap-2">
            <IconFilter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value as 'all' | 'read' | 'unread');
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Contacts</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contactsData?.contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className={`hover:bg-gray-50 ${!contact.isRead ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {contact.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <IconMail className="w-4 h-4 mr-1" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <IconPhone className="w-4 h-4 mr-1" />
                            {contact.phone}
                          </div>
                        )}
                        {contact.company && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <IconBuilding className="w-4 h-4 mr-1" />
                            {contact.company}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contact.service ? getServiceDisplayName(contact.service) : 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(contact.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        contact.isRead
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {contact.isRead ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <IconEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMarkAsRead(contact._id!, !contact.isRead)}
                        className={`${
                          contact.isRead ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'
                        }`}
                        title={contact.isRead ? 'Mark as Unread' : 'Mark as Read'}
                      >
                        {contact.isRead ? <IconX className="w-4 h-4" /> : <IconCheck className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact._id!)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {contactsData && contactsData.pagination.totalPages > 1 && (
          <div className="bg-white px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing page {contactsData.pagination.currentPage} of {contactsData.pagination.totalPages}
                ({contactsData.pagination.totalContacts} total contacts)
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={!contactsData.pagination.hasPrevPage}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={!contactsData.pagination.hasNextPage}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <IconX className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedContact.phone}</p>
                    </div>
                  )}
                  {selectedContact.company && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedContact.company}</p>
                    </div>
                  )}
                  {selectedContact.service && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Service</label>
                      <p className="mt-1 text-sm text-gray-900">{getServiceDisplayName(selectedContact.service)}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span
                      className={`inline-flex mt-1 px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedContact.isRead
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {selectedContact.isRead ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Submitted: {formatDate(selectedContact.createdAt)}</p>
                  {selectedContact.updatedAt !== selectedContact.createdAt && (
                    <p>Last updated: {formatDate(selectedContact.updatedAt)}</p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2 pt-4 border-t">
                  <button
                    onClick={() => handleMarkAsRead(selectedContact._id!, !selectedContact.isRead)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      selectedContact.isRead
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Mark as {selectedContact.isRead ? 'Unread' : 'Read'}
                  </button>
                  <button
                    onClick={() => handleDeleteContact(selectedContact._id!)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
                  >
                    Delete Contact
                  </button>
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: Your inquiry about ${selectedContact.service ? getServiceDisplayName(selectedContact.service) : 'our services'}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {contactsData && contactsData.contacts.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <IconMail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'No contacts have been submitted yet.' 
              : `No ${filter} contacts found.`}
          </p>
        </div>
      )}
    </div>
  );
} 