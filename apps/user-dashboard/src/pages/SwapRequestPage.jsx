import { useState, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Plus, Inbox, Send } from 'lucide-react';
import SwapRequestForm from '../components/pageComponents/swapRequestPage/SwapRequestForm';
import SwapRequestHistory from '../components/pageComponents/swapRequestPage/SwapRequestHistory';
import Text from '../components/common/Text';
import {
  swapIsAproved,
  addSwapRequest,
  fetchSwapRequests,
  fetchReceivedSwapRequests,
} from '../features/swaprequest/swapThunks';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import UpdateSwapRequestModal from '../modals/updateSwap';
import Pagination from '../components/common/paginaton';
import SwapFilter from '../components/pageComponents/swapRequestPage/swapFilter';
import ReceivedSwapRequests from '../components/pageComponents/swapRequestPage/swapReceived.jsx';
import SwapDecisionModal from '../modals/SwapDecisionModal';
import {
  fetchUpcomingSchedules,
  fetchSchedules,
} from '../features/schedule/scheduleThunks';
import { addDays, addHours, formatISO } from 'date-fns';

export default function SwapRequestPage() {
  const [activeTab, setActiveTab] = useState('request');
  const [formData, setFormData] = useState({});

  // SEPARATE modal states for different purposes
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);

  const [editingRequest, setEditingRequest] = useState(null);
  const [decisionRequest, setDecisionRequest] = useState(null);
  const [decisionAction, setDecisionAction] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const dispatch = useDispatch();
  const {
    swapRequests,
    swapStatus,
    swapMeta,
    receivedRequests,
    receivedStatuS,
    receivedMeta,
  } = useSelector((state) => state.swap);

  const { user } = useSelector((state) => state.user);

  const loading = swapStatus === 'loading';
  const totalPages =
    activeTab === 'received'
      ? Math.ceil((receivedMeta?.totalFiltered || 1) / itemsPerPage)
      : Math.ceil((swapMeta?.totalFiltered || 1) / itemsPerPage);

  // Fetch data when tab/filters change
  useEffect(() => {
    if (activeTab === 'history') {
      dispatch(
        fetchSwapRequests({
          page: currentPage,
          limit: itemsPerPage,
          status: filterStatus !== 'all' ? filterStatus : undefined,
          fromUserId: user?._id,
          sort: '-createdAt',
        })
      );
    } else if (activeTab === 'received') {
      dispatch(
        fetchReceivedSwapRequests({
          page: currentPage,
          limit: itemsPerPage,
          status: filterStatus !== 'all' ? filterStatus : undefined,
          toUserId: user?._id,
          sort: '-createdAt',
        })
      );
    } else if (activeTab === 'request') {
      const now = new Date();
      const startDate = addHours(now, 24); // 24 hours from now
      const endDate = addDays(now, 14); // 2 weeks from now

      dispatch(
        fetchUpcomingSchedules({
          userId: user?._id,
          startDate: formatISO(startDate), // convert to ISO string
          endDate: formatISO(endDate),
        })
      );

      dispatch(
        fetchSchedules({
          excludeUserId: user?._id,
          departmentId: user?.departmentId,
          startDate: formatISO(startDate),
          endDate: formatISO(endDate),
        })
      );
    }
  }, [dispatch, user?._id, currentPage, filterStatus, itemsPerPage, activeTab]);

  // Edit modal handlers (for sent requests)
  const openEditModal = (request) => {
    setEditingRequest(request);
    setUpdateModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingRequest(null);
    setUpdateModalOpen(false);
  };

  // Decision modal handlers (for received requests)
  const openDecisionModal = (request, action) => {
    setDecisionRequest(request);
    setDecisionAction(action);
    setDecisionModalOpen(true);
  };

  const closeDecisionModal = () => {
    setDecisionRequest(null);
    setDecisionAction(null);
    setDecisionModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.currentShift || !formData.swapWith) {
      toast.error('Please select both shifts.');
      return;
    }

    const [toScheduleId, toUserId] = formData.swapWith.split('___');

    dispatch(
      addSwapRequest({
        fromScheduleId: formData.currentShift,
        toScheduleId,
        toUserId,
        message: formData.message || '',
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Swap request submitted successfully!');
        setFormData({});
        setActiveTab('history');
      })
      .catch((err) => {
        toast.error(err?.message || 'Failed to submit swap request.');
      });
  };

  // Handle approve/reject with correct parameters
  const handleDecisionSubmit = (request, action, message) => {
    dispatch(
      swapIsAproved({
        id: request._id,
        data: {
          status: action,
          replyMessage: message,
        },
      })
    )
      .unwrap()
      .then(() => {
        toast.success(`Request ${action} successfully.`);
        closeDecisionModal();

        // Refetch data to update UI
        dispatch(
          fetchReceivedSwapRequests({
            page: currentPage,
            limit: itemsPerPage,
            status: filterStatus !== 'all' ? filterStatus : undefined,
            toUserId: user?._id,
            sort: '-createdAt',
          })
        );
      })
      .catch((err) => toast.error(err?.message || 'Failed to update request.'));
  };

  // Refetch after edit
  const handleEditComplete = () => {
    dispatch(
      fetchSwapRequests({
        page: currentPage,
        limit: itemsPerPage,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        fromUserId: user?._id,
        sort: '-createdAt',
      })
    );
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'request':
        return <Plus size={18} />;
      case 'history':
        return <Send size={18} />;
      case 'received':
        return <Inbox size={18} />;
      default:
        return null;
    }
  };

  const getTabLabel = (tab) => {
    switch (tab) {
      case 'request':
        return 'New Request';
      case 'history':
        return 'Sent Requests';
      case 'received':
        return 'Received Requests';
      default:
        return tab;
    }
  };

  return (
    <>
      <div className="p-6 bg-gradient-to-br from-gray-50 via-teal-50/20 blue-50/30 min-h-screen">
        <div className="bg-gray-50 p-6">
          <div className="mx-auto">
            <Text as="h1" content="Swap Request" MyClass="text-3xl font-semibold text-[#0F7B8A] mb-4"  />
            <Text as="p" content="Manage your shift swap requests and track approval progress." MyClass="text-gray-600"  />
          </div>
        </div>

        <div className="p-6 mx-auto bg-white w-full flex-1 flex flex-col">
          <Tabs.Root
            value={activeTab}
            onValueChange={(tab) => {
              setActiveTab(tab);
              setCurrentPage(1);
              setFilterStatus('all');
            }}
          >
            <Tabs.List className="flex space-x-6 border-b border-gray-200 mb-4">
              {['request', 'history', 'received'].map((tab) => (
                <Tabs.Trigger
                  key={tab}
                  value={tab}
                  className={`flex items-center gap-2 pb-2 text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'border-b-2 border-[#0F7B8A] text-[#0F7B8A]'
                      : 'text-gray-500 hover:text-[#0F7B8A] hover:bg-teal-50/50'
                  }`}
                >
                  {getTabIcon(tab)}
                  {getTabLabel(tab)}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <Tabs.Content value="request">
              <SwapRequestForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </Tabs.Content>

            <Tabs.Content value="history">
              <SwapFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                setCurrentPage={setCurrentPage}
              />
              <div className="flex-1 overflow-y-auto">
                <SwapRequestHistory
                  requests={swapRequests}
                  onEdit={openEditModal}
                />
              </div>
            </Tabs.Content>

            <Tabs.Content value="received">
              <SwapFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                setCurrentPage={setCurrentPage}
              />
              <ReceivedSwapRequests
                requests={receivedRequests}
                onAction={openDecisionModal}
              />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>

      {activeTab !== 'request' && (
        <div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={itemsPerPage}
            totalPages={totalPages}
            onLimitChange={(newLimit) => {
              setItemsPerPage(newLimit);
              setCurrentPage(1);
            }}
            totalItems={
              activeTab === 'received'
                ? receivedMeta?.totalFiltered || 0
                : swapMeta?.totalFiltered || 0
            }
            filteredItems={
              activeTab === 'received'
                ? receivedRequests.length
                : swapRequests.length
            }
            itemName="Requests"
          />
        </div>
      )}

      <UpdateSwapRequestModal
        isOpen={updateModalOpen}
        onClose={closeEditModal}
        request={editingRequest}
        onUpdated={handleEditComplete}
      />

      <SwapDecisionModal
        isOpen={decisionModalOpen}
        onClose={closeDecisionModal}
        request={decisionRequest}
        action={decisionAction}
        onSubmit={handleDecisionSubmit}
      />
    </>
  );
}
