import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import FetchData from '../../fetch-api/Apifetch';
import Swal from 'sweetalert2';
import SubscribeList from './SubscribeList';
import AddSubscriptionModal from './AddSubscriptionModal';
import EditSubscriptionModal from './EditSubscriptionModal';

function Subcribe() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [listSubscription, setListSubscription] = useState([]);
  const [editSubId, setEditSubId] = useState(null);
  const [setEditForm, EditForm] = useState({});
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [page, setPage] = useState(1);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  useEffect(() => {
    fetchSubscription();
  }, [page]);

  const fetchSubscription = async () => {
    try {
      const res = await FetchData("subscription", 'GET', null, true, false);
      if (res.status) {
        setListSubscription(res.data);
        setPaginationInfo(res.pagination);
        console.log("Subscription data:", res.data);
      } else {
        console.error("Error fetching subscription list:", res.message);
      }
    } catch (error) {
      console.error("Error fetching subscription list:", error.message);
    }
  };

  const handleAddSubscription = () => setShowAddModal(true);

  const handleEditSubscription = (itemId, form) => {
    setShowEditModal(true);
    setEditSubId(itemId);
    setEditForm(form);
  };

  const handleDeleteSubscription = (itemId) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await FetchData(`/subscription/delete/${itemId}`, 'DELETE', null, true, false);
          if (res.status) {
            fetchSubscription();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Deleted Successfully",
              showConfirmButton: false,
              timer: 1500
            });
          }else{
            console.error("Error deleting subscription:", res.message);
          }
        } catch(error){
          console.error("Error deleting subscription:", error.message);
        }
      }
    });
  };

  const NextPage = () => {
    if (paginationInfo.currentPage < paginationInfo.totalPages) {
      setPage(page + 1);
    }
  };
  
  const PreviousPage = () => {
    if (paginationInfo.currentPage > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
          <div className="card-body px-4 py-3">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="fw-semibold mb-8">Subscriptions list</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="text-muted text-decoration-none" href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Subscriptions list
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-3">
                <div className="text-center mb-n5">
                  <img src="/assets/images/breadcrumb/ChatBc.png" alt="" className="img-fluid mb-n4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button variant="primary" style={{ float: 'right' }} onClick={handleAddSubscription} className='mb-2'>
          Add Subscription Plan
        </Button>

        <AddSubscriptionModal
          show={showAddModal}
          handleClose={handleCloseAddModal}
          fetchSubscription={fetchSubscription}
        />
        <EditSubscriptionModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          fetchSubscription={fetchSubscription}
          editSubId={editSubId}
          EditForm={EditForm}
        />

<SubscribeList
  listSubscription={listSubscription}
  fetchSubscription={fetchSubscription}
  handleEdit={handleEditSubscription}
  handleDelete={handleDeleteSubscription}
  paginationInfo={paginationInfo}
  PreviousPage={PreviousPage}
  NextPage={NextPage}
  page={page}
  setPage={setPage}
/>

      </div>
    </div>
  );
}
export default Subcribe;