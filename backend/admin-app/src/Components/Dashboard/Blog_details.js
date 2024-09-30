import React from 'react'

function Blog_details() {
  return (
    <div className="body-wrapper">
    <div className="container-fluid">
      <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
        <div className="card-body px-4 py-3">
          <div className="row align-items-center">
            <div className="col-9">
              <h4 className="fw-semibold mb-8">Blog Detail</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a
                      className="text-muted text-decoration-none"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Blog Detail
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-3">
              <div className="text-center mb-n5">
                <img
                  src="assets/images/breadcrumb/ChatBc.png"
                  alt=""
                  className="img-fluid mb-n4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card rounded-2 overflow-hidden">
        <div className="position-relative">
          <a href="javascript:void(0)">
            <img
              src="assets/images/blog/blog-img5.jpg"
              className="card-img-top rounded-0 object-fit-cover"
              alt="..."
              height={440}
            />
          </a>
          <span className="badge text-bg-light fs-2 rounded-4 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
            2 min Read
          </span>
          <img
            src="assets/images/profile/user-5.jpg"
            alt=""
            className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
            width={40}
            height={40}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-title="Esther Lindsey"
          />
        </div>
        <div className="card-body p-4">
          <span className="badge text-bg-light fs-2 rounded-4 py-1 px-2 lh-sm  mt-3">
            Lifestyle
          </span>
          <h2 className="fs-9 fw-semibold my-4">
            Streaming video way before it was cool, go dark tomorrow
          </h2>
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex align-items-center gap-2">
              <i className="ti ti-eye text-dark fs-5" />
              2252
            </div>
            <div className="d-flex align-items-center gap-2">
              <i className="ti ti-message-2 text-dark fs-5" />3
            </div>
            <div className="d-flex align-items-center fs-2 ms-auto">
              <i className="ti ti-point text-dark" />
              Sat, Jan 14
            </div>
          </div>
        </div>
        <div className="card-body border-top p-4">
          <h2 className="fs-8 fw-semibold mb-3">Title of the paragraph</h2>
          <p className="mb-3">
            But you cannot figure out what it is or what it can do. MTA web
            directory is the simplest way in which one can bid on a link, or a few
            links if they wish to do so. The link directory on MTA displays all of
            the links it currently has, and does so in alphabetical order, which
            makes it much easier for someone to find what they are looking for if
            it is something specific and they do not want to go through all the
            other sites and links as well. It allows you to start your bid at the
            bottom and slowly work your way to the top of the list.
          </p>
          <p className="mb-3">
            Gigure out what it is or what it can do. MTA web directory is the
            simplest way in which one can bid on a link, or a few links if they
            wish to do so. The link directory on MTA displays all of the links it
            currently has, and does so in alphabetical order, which makes it much
            easier for someone to find what they are looking for if it is
            something specific and they do not want to go through all the other
            sites and links as well. It allows you to start your bid at the bottom
            and slowly work your way to the top of the
          </p>
          <p className="text-dark mb-0">
            <strong>This is strong text.</strong>
          </p>
          <p className="mb-0">
            <em>This is italic text.</em>
          </p>
          <div className="border-top mt-7 pt-7">
            <h3 className="fw-semibold">Unorder list.</h3>
            <ul className="my-3 ps-4 text-dark">
              <li className="d-flex align-items-center gap-2">
                <span className="p-1 text-bg-dark rounded-circle" /> Gigure out
                what it is or
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="p-1 text-bg-dark rounded-circle" /> The links it
                currently
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="p-1 text-bg-dark rounded-circle" /> It allows you
                to start your bid
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="p-1 text-bg-dark rounded-circle" /> Gigure out
                what it is or
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="p-1 text-bg-dark rounded-circle" /> The links it
                currently
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="p-1 text-bg-dark rounded-circle" /> It allows you
                to start your bid
              </li>
            </ul>
          </div>
          <div className="border-top mt-7 pt-7">
            <h3 className="fw-semibold">Order list.</h3>
            <ol className="my-3 text-dark">
              <li>Gigure out what it is or</li>
              <li>The links it currently</li>
              <li>It allows you to start your bid</li>
              <li>Gigure out what it is or</li>
              <li>The links it currently</li>
              <li>It allows you to start your bid</li>
            </ol>
          </div>
          <div className="border-top mt-7 pt-7">
            <h3 className="fw-semibold">Quotes</h3>
            <div className="p-3 bg-light rounded border-start border-2 border-primary">
              <h6 className="mb-0 fs-4 fw-semibold">
                <i className="ti ti-quote fs-7" />
                Life is short, Smile while you still have teeth!
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h4 className="mb-4 fw-semibold">Post Comments</h4>
          <form>
            <textarea className="form-control mb-4" rows={5} defaultValue={""} />
            <button className="btn btn-primary">Post Comment</button>
          </form>
          <div className="d-flex align-items-center gap-3 mb-4 mt-7 pt-8">
            <h4 className="mb-0 fw-semibold">Comments</h4>
            <span className="badge bg-primary-subtle text-primary fs-4 fw-semibold px-6 py-8 rounded">
              3
            </span>
          </div>
          <div className="position-relative">
            <div className="p-4 rounded-2 text-bg-light mb-3">
              <div className="d-flex align-items-center gap-3">
                <img
                  src="assets/images/profile/user-2.jpg"
                  alt=""
                  className="rounded-circle"
                  width={33}
                  height={33}
                />
                <h6 className="fw-semibold mb-0 fs-4">Don Russell</h6>
                <span className="p-1 text-bg-muted rounded-circle d-inline-block" />
              </div>
              <p className="my-3">
                Es do ujurus nejson imju azgudpi toceztep ji cocicoci bosawrop
                korze ta. Casetlu udumej umocu wanaro webmos ijafa ud muli amja
                softoj ma pijum.
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
            <div className="p-4 rounded-2 text-bg-light mb-3">
              <div className="d-flex align-items-center gap-3">
                <img
                  src="assets/images/profile/user-3.jpg"
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
            <div className="p-4 rounded-2 text-bg-light mb-3 ms-7">
              <div className="d-flex align-items-center gap-3">
                <img
                  src="assets/images/profile/user-3.jpg"
                  alt=""
                  className="rounded-circle"
                  width={40}
                  height={40}
                />
                <h6 className="fw-semibold mb-0 fs-4">Irene Hanson</h6>
                <span className="p-1 text-bg-muted rounded-circle d-inline-block" />
              </div>
              <p className="my-3">
                Uborofgic be rof lom sedge vapozi ohoinu nutremcuc ro ko atmeg
                anrov git ve vuj ki teb or. Lohi hafa faddegon horoz ebema kew
                idful ducam nev rol iga wikkobsu sucdu gud.
              </p>
            </div>
            <div className="p-4 rounded-2 text-bg-light">
              <div className="d-flex align-items-center gap-3">
                <img
                  src="assets/images/profile/user-4.jpg"
                  alt=""
                  className="rounded-circle"
                  width={33}
                  height={33}
                />
                <h6 className="fw-semibold mb-0 fs-4">Seth Ortiz</h6>
                <span className="p-1 text-bg-muted rounded-circle d-inline-block" />
              </div>
              <p className="my-3">
                Icme rasejmat ciwo ifekemug owoca vicoz ukikitus famiftat nuk
                eroewu za upe. Pobrikvup kivofvac tuba ot veh ozoab sa gesi
                hahoniha hop burbip volo hufotobo di uted vojoamu.
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
  
  )
}

export default Blog_details
