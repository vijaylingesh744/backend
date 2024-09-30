import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import FetchData from '../../fetch-api/Apifetch';
import CouponList from './CouponList';
import AddCouponModal from './AddCouponModal';

function Coupon() {
  const [listCoupon, setListCoupon] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCoupon();
  }, [page]);

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

  const fetchCoupon = async () => {
    try {
      const res = await FetchData("coupon", 'GET', null, true, false);
      if (res.status) {
        setListCoupon(res.data);
        setPaginationInfo(res.pagination);
      } else {
        console.error("Error fetching coupon list:", res.message);
      }
    } catch (error) {
      console.error("Error fetching coupon list:", error.message);
    }
  };

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
      <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
          <div className="card-body px-4 py-3">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="fw-semibold mb-8">Coupons List</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="text-muted text-decoration-none" href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Coupons List
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
          <AddCouponModal fetchCoupon={fetchCoupon} />
        <CouponList listCoupon={listCoupon} fetchCoupon={fetchCoupon}  paginationInfo={paginationInfo}
  PreviousPage={PreviousPage}
  NextPage={NextPage}
  page={page}
  setPage={setPage} />

      </div>
    </div>
  );
}

export default Coupon;
