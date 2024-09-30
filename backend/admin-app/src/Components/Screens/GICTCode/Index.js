import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import FetchData from '../../fetch-api/Apifetch';
import Swal from 'sweetalert2';
import GICTCList from './GICTCList';
import AddGICTCModal from './AddGICTCModal';
import EditGICTCModal from './EditGICTCModal';

function Subcribe() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [listGICTC, setListGICTC] = useState([]);
  const [editSubId, setEditSubId] = useState(null);
  const [EditForm,setEditForm] = useState({});
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [page, setPage] = useState(1);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  useEffect(() => {
    fetchGICTC();
  }, [page]);

  const fetchGICTC = async () => {
    try {
      const res = await FetchData("list/code", 'GET', null, true, false);
      if (res.success) {
        setListGICTC(res.data);
        // setPaginationInfo(res.pagination);
        console.log("GICTC data:", res.data);
      } else {
        console.error("Error fetching GICTC list:", res.message);
      }
    } catch (error) {
      console.error("Error fetching GICTC list:", error.message);
    }
  };

  const handleAddGICTC = () => setShowAddModal(true);

  const handleEditGICTC = (itemId, form) => {
    setShowEditModal(true);
    setEditSubId(itemId);
    setEditForm(form);
  };

  const handleDeleteGICTC = (itemId) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await FetchData(`/delete/code/${itemId}`, 'GET', null, true, false);
          if (res.success) {
            fetchGICTC();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Deleted Successfully",
              showConfirmButton: false,
              timer: 1500
            });
          }else{
            console.error("Error deleting GICTC:", res.message);
          }
        } catch(error){
          console.error("Error deleting GICTC:", error.message);
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
                <h4 className="fw-semibold mb-8">GICTCs list</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="text-muted text-decoration-none" href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      GICTCs list
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
        <Button variant="primary" style={{ float: 'right' }} onClick={handleAddGICTC} className='mb-2'>
          Add GICTC Code
        </Button>

        <AddGICTCModal
          show={showAddModal}
          handleClose={handleCloseAddModal}
          fetchGICTC={fetchGICTC}
        />
        <EditGICTCModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          fetchGICTC={fetchGICTC}
          editSubId={editSubId}
          EditForm={EditForm}
        />

<GICTCList
  listGICTC={listGICTC}
  fetchGICTC={fetchGICTC}
  handleEdit={handleEditGICTC}
  handleDelete={handleDeleteGICTC}
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