import React from 'react'

const Communty = () => {
  return (
    <div>
      <div className="body-wrapper">
        <div className="container-fluid">
          <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
            <div className="card-body px-4 py-3">
              <div className="row align-items-center">
                <div className="col-9">
                  <h4 className="fw-semibold mb-8">Notification</h4>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a
                          className="text-muted text-decoration-none"
                          href="../main/index.html"
                        >
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Notification
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className="col-3">
                  <div className="text-center mb-n5">
                    <img
                      src="/assets/images/breadcrumb/ChatBc.png"
                      alt=""
                      className="img-fluid mb-n4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">

              {/* <div className="d-flex align-items-center gap-3 mb-4 mt-7 pt-8">
      <h4 className="mb-0 fw-semibold">Comments</h4>
      <span className="badge bg-primary-subtle text-primary fs-4 fw-semibold px-6 py-8 rounded">
        3
      </span>
    </div> */}
              <div className="position-relative">
                <div className="p-4 rounded-2 text-bg-light mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src="/assets/images/profile/user-2.jpg"
                      alt=""
                      className="rounded-circle"
                      width={33}
                      height={33}
                    />
                    <h6 className="fw-semibold mb-0 fs-4">Don Russell</h6>
                    <span className="p-1 text-bg-muted rounded-circle d-inline-block" />
                  </div>
                  <p className="my-3">
                    Es do ujurus nejson imju azgudpi toceztep ji cocicoci bosawrop korze
                    ta. Casetlu udumej umocu wanaro webmos ijafa ud muli amja softoj ma
                    pijum.
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <a
                      className="d-flex align-items-center justify-content-center text-bg-primary p-2 fs-4 rounded-circle"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Reply"
                    >
                      <i className="ti ti-arrow-back-up" />
                    </a>
                  </div>
                </div>
                <div className="p-4 rounded-2 text-bg-light mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src="/assets/images/profile/user-3.jpg"
                      alt=""
                      className="rounded-circle"
                      width={33}
                      height={33}
                    />
                    <h6 className="fw-semibold mb-0 fs-4">Cordelia Potter</h6>
                    <span className="p-1 text-bg-muted rounded-circle d-inline-block" />
                  </div>
                  <p className="my-3">
                    Huwso jewzehgu julriw niwgazep lewbob isujirmuz hemto pahop cewa
                    zuhucze rinitba etdebluj. Obdevo bo fa siztes laobeir agoemugo rut
                    sapaviw mulati do re dabelul wo tumnik wih mu.
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <a
                      className="d-flex align-items-center justify-content-center text-bg-primary p-2 fs-4 rounded-circle"
                      href="javascript:void(0)"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Reply"
                    >
                      <i className="ti ti-arrow-back-up" />
                    </a>
                  </div>
                </div>
                {/* <div className="p-4 rounded-2 text-bg-light mb-3 ms-7">
        <div className="d-flex align-items-center gap-3">
          <img
            src="/assets/images/profile/user-3.jpg"
            alt=""
            className="rounded-circle"
            width={40}
            height={40}
          />
          <h6 className="fw-semibold mb-0 fs-4">Irene Hanson</h6>
          <span className="p-1 text-bg-muted rounded-circle d-inline-block" />
        </div>
        <p className="my-3">
          Uborofgic be rof lom sedge vapozi ohoinu nutremcuc ro ko atmeg anrov
          git ve vuj ki teb or. Lohi hafa faddegon horoz ebema kew idful ducam
          nev rol iga wikkobsu sucdu gud.
        </p>
      </div> */}
                <div className="p-4 rounded-2 text-bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src="/assets/images/profile/user-4.jpg"
                      alt=""
                      className="rounded-circle"
                      width={33}
                      height={33}
                    />
                    <h6 className="fw-semibold mb-0 fs-4">Seth Ortiz</h6>
                    <span className="p-1 text-bg-muted rounded-circle d-inline-block" />
                  </div>
                  <p className="my-3">
                    Icme rasejmat ciwo ifekemug owoca vicoz ukikitus famiftat nuk eroewu
                    za upe. Pobrikvup kivofvac tuba ot veh ozoab sa gesi hahoniha hop
                    burbip volo hufotobo di uted vojoamu.
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <a
                      className="d-flex align-items-center justify-content-center text-bg-primary p-2 fs-4 rounded-circle"
                      href="javascript:void(0)"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Reply"
                    >
                      <i className="ti ti-arrow-back-up" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Communty
