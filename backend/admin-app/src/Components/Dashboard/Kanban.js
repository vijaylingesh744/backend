import React from 'react'

function Kanban() {
  return (
    <div className="body-wrapper">
    <div className="container-fluid">
      <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
        <div className="card-body px-4 py-3">
          <div className="row align-items-center">
            <div className="col-9">
              <h4 className="fw-semibold mb-8">Kanban</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a
                      className="text-muted text-decoration-none"
                      href="/">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Kanban
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
      <div className="action-btn layout-top-spacing mb-7 d-flex align-items-center justify-content-between flex-wrap gap-6">
        <h5 className="mb-0 fs-5">Improving Work Processes</h5>
        <button id="add-list" className="btn btn-primary">
          Add List
        </button>
      </div>
      <div
        className="modal fade"
        id="addItemModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="addTaskModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="add-task-title modal-title" id="addTaskModalTitleLabel1" >
                Add Task
              </h5>
              <h5
                className="edit-task-title modal-title"
                id="addTaskModalTitleLabel2"
              >
                Edit Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="compose-box">
                <div className="compose-content" id="addTaskModalTitle">
                  <div className="addTaskAccordion" id="add_task_accordion">
                    <div className="task-content task-text-progress">
                      <div
                        id="collapseTwo"
                        className="collapse show"
                        data-parent="#add_task_accordion"
                      >
                        <div className="task-content-body">
                          <form action="javascript:void(0);">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="task-title mb-4 d-flex">
                                  <input
                                    id="kanban-title"
                                    type="text"
                                    placeholder="Task"
                                    className="form-control"
                                    name="task"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="task-badge d-flex">
                                  <textarea
                                    id="kanban-text"
                                    placeholder="Task Text"
                                    className="form-control"
                                    name="taskText"
                                    defaultValue={""}
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-start">
              <div className="d-flex gap-6">
                <button
                  data-btn-action="addTask"
                  className="btn add-tsk btn-primary">
                  Add Task
                </button>
                <button
                  data-btn-action="editTask"
                  className="btn edit-tsk btn-success"
                  style={{ display: "none" }}
                >
                  Save
                </button>
                <button
                  className="btn bg-danger-subtle text-danger d-flex align-items-center gap-1"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="addListModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="addListModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title add-list-title"
                id="addListModalTitleLabel1"
              >
                Add List
              </h5>
              <h5
                className="modal-title edit-list-title"
                id="addListModalTitleLabel2"
              >
                Edit List
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="compose-box">
                <div className="compose-content" id="addListModalTitle">
                  <form action="javascript:void(0);">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="list-title d-flex align-items-center">
                          <input
                            id="item-name"
                            type="text"
                            placeholder="List Name"
                            className="form-control"
                            name="task"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-start">
              <div className="d-flex gap-6">
                <button
                  className="btn bg-danger-subtle text-danger d-flex align-items-center gap-1"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button className="btn add-list btn-primary">Add List</button>
                <button
                  className="btn edit-list btn-success"
                  style={{ display: "none" }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="deleteConformation"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="deleteConformationLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" id="deleteConformationLabel">
            <div className="modal-header">
              <div className="icon round-40 d-flex align-items-center justify-content-center bg-light-danger text-danger me-2 rounded-circle">
                <i className="ti ti-trash fs-6" />
              </div>
              <h5 className="modal-title fw-semibold" id="exampleModalLabel">
                Delete the task?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">
                If you delete the task it will be gone forever. Are you sure you
                want to proceed?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn bg-danger-subtle text-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-danger" data-remove="task">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row scrumboard" id="cancel-row">
        <div className="col-lg-12 layout-spacing pb-3">
          <div data-simplebar="">
            <div className="task-list-section">
              <div
                data-item="item-todo"
                className="task-list-container"
                data-action="sorting"
              >
                <div className="connect-sorting connect-sorting-todo">
                  <div className="task-container-header">
                    <h6
                      className="item-head mb-0 fs-4 fw-semibold"
                      data-item-title="Todo"
                    >
                      Todo
                    </h6>
                    <div className="hstack gap-2">
                      <div className="add-kanban-title">
                        <a
                          className="addTask d-flex align-items-center justify-content-center gap-1 lh-sm"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Add Task"
                        >
                          <i className="ti ti-plus text-dark" />
                        </a>
                      </div>
                      <div className="dropdown">
                        <a
                          className="dropdown-toggle"
                          href="app-kanban.html#"
                          role="button"
                          id="dropdownMenuLink-1"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          <i className="ti ti-dots-vertical text-dark" />
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="dropdownMenuLink-1"
                        >
                          <a
                            className="dropdown-item list-edit"
                            href="javascript:void(0);"
                          >
                            Edit
                          </a>
                          <a
                            className="dropdown-item list-delete"
                            href="javascript:void(0);"
                          >
                            Delete
                          </a>
                          <a
                            className="dropdown-item list-clear-all"
                            href="javascript:void(0);"
                          >
                            Clear All
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="connect-sorting-content" data-sortable="true">
                    <div data-draggable="true" className="card img-task">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4 className="" data-item-title="This is first task">
                              This is first task
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-content p-0">
                          <img
                            src="/assets/images/backgrounds/kanban-img-1.jpg"
                            className="img-fluid"
                            alt="scrumboard"
                          />
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-success fs-1">
                                Design
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-draggable="true" className="card img-task">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4
                              className=""
                              data-item-title="Lets do some task on pd"
                            >
                              Lets do some task on pd
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-content">
                          <p
                            className="mb-0"
                            data-item-text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, o eiusmod tempor incid."
                          >
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, o eiusmod tempor incid.
                          </p>
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-warning fs-1">
                                Development
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-draggable="true" className="card img-task">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4
                              className=""
                              data-item-title="Do some projects on React Native with Flutter"
                            >
                              Do some projects on React Native with Flutter
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-primary fs-1">
                                Mobile
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-item="item-inprogress"
                className="task-list-container"
                data-action="sorting"
              >
                <div className="connect-sorting connect-sorting-inprogress">
                  <div className="task-container-header">
                    <h6
                      className="item-head mb-0 fs-4 fw-semibold"
                      data-item-title="In Progress"
                    >
                      In Progress
                    </h6>
                    <div className="hstack gap-2">
                      <div className="dropdown">
                        <a
                          className="dropdown-toggle"
                          href="app-kanban.html#"
                          role="button"
                          id="dropdownMenuLink-1"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          <i className="ti ti-dots-vertical text-dark" />
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="dropdownMenuLink-1"
                        >
                          <a
                            className="dropdown-item list-edit"
                            href="javascript:void(0);"
                          >
                            Edit
                          </a>
                          <a
                            className="dropdown-item list-delete"
                            href="javascript:void(0);"
                          >
                            Delete
                          </a>
                          <a
                            className="dropdown-item list-clear-all"
                            href="javascript:void(0);"
                          >
                            Clear All
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="connect-sorting-content" data-sortable="true">
                    <div data-draggable="true" className="card">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4
                              className=""
                              data-item-title="Design navigation changes"
                            >
                              Design navigation changes
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-primary fs-1">
                                Mobile
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-draggable="true" className="card img-task">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4 className="" data-item-title="Battle with fire">
                              Battle with fire
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-content p-0">
                          <img
                            src="/assets/images/backgrounds/kanban-img-2.jpg"
                            className="img-fluid"
                            alt="scrumboard"
                          />
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-success fs-1">
                                Design
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-draggable="true" className="card">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4
                              className=""
                              data-item-title="First design concept"
                            >
                              First design concept
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-primary fs-1">
                                Mobile
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-item="item-pending"
                className="task-list-container"
                data-action="sorting"
              >
                <div className="connect-sorting connect-sorting-pending">
                  <div className="task-container-header">
                    <h6
                      className="item-head mb-0 fs-4 fw-semibold"
                      data-item-title="Pending"
                    >
                      Pending
                    </h6>
                    <div className="hstack gap-2">
                      <div className="dropdown">
                        <a
                          className="dropdown-toggle"
                          href="app-kanban.html#"
                          role="button"
                          id="dropdownMenuLink-1"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          <i className="ti ti-dots-vertical text-dark" />
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="dropdownMenuLink-1"
                        >
                          <a
                            className="dropdown-item list-edit"
                            href="javascript:void(0);"
                          >
                            Edit
                          </a>
                          <a
                            className="dropdown-item list-delete"
                            href="javascript:void(0);"
                          >
                            Delete
                          </a>
                          <a
                            className="dropdown-item list-clear-all"
                            href="javascript:void(0);"
                          >
                            Clear All
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="connect-sorting-content" data-sortable="true">
                    <div data-draggable="true" className="card img-task">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4
                              className=""
                              data-item-title="Persona development"
                            >
                              Persona development
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-content">
                          <p
                            className="mb-0"
                            data-item-text="Create user personas based on the research data to represent different user groups and their characteristics, gols, and behaviors.."
                          >
                            Create user personas based on the research data to
                            represent different user groups and their
                            characteristics, gols, and behaviors..
                          </p>
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-warning fs-1">
                                UX stage
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-draggable="true" className="card img-task">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4 className="" data-item-title="Redesign overview">
                              Redesign overview
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-content p-0">
                          <img
                            src="/assets/images/backgrounds/my-card.jpg"
                            className="img-fluid"
                            alt="scrumboard"
                          />
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-success fs-1">
                                Design
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-item="item-pending"
                className="task-list-container"
                data-action="sorting"
              >
                <div className="connect-sorting connect-sorting-done">
                  <div className="task-container-header">
                    <h6
                      className="item-head mb-0 fs-4 fw-semibold"
                      data-item-title="Done"
                    >
                      Done
                    </h6>
                    <div className="hstack gap-2">
                      <div className="dropdown">
                        <a
                          className="dropdown-toggle"
                          href="app-kanban.html#"
                          role="button"
                          id="dropdownMenuLink-1"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          <i className="ti ti-dots-vertical text-dark" />
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="dropdownMenuLink-1"
                        >
                          <a
                            className="dropdown-item list-edit"
                            href="javascript:void(0);"
                          >
                            Edit
                          </a>
                          <a
                            className="dropdown-item list-delete"
                            href="javascript:void(0);"
                          >
                            Delete
                          </a>
                          <a
                            className="dropdown-item list-clear-all"
                            href="javascript:void(0);"
                          >
                            Clear All
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="connect-sorting-content" data-sortable="true">
                    <div data-draggable="true" className="card img-task">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4 className="" data-item-title="Usability testing">
                              Usability testing
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-content p-0">
                          <img
                            src="/assets/images/backgrounds/weatherbg.jpg"
                            className="img-fluid"
                            alt="scrumboard"
                          />
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-info fs-1">
                                Research
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-draggable="true" className="card">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4
                              className=""
                              data-item-title="Introduce new navigation"
                            >
                              Introduce new navigation
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-danger fs-1">
                                Data science
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-draggable="true" className="card">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4
                              className=""
                              data-item-title="Branding visual identity"
                            >
                              Branding visual identity
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-primary fs-1">
                                Branding
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-draggable="true" className="card">
                      <div className="card-body">
                        <div className="task-header">
                          <div className="">
                            <h4
                              className=""
                              data-item-title="Competitor research"
                            >
                              Competitor research
                            </h4>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle"
                              href="app-kanban.html#"
                              role="button"
                              id="dropdownMenuLink-1"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i className="ti ti-dots-vertical text-dark" />
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="dropdownMenuLink-1"
                            >
                              <a
                                className="dropdown-item kanban-item-edit cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-pencil fs-5" />
                                Edit
                              </a>
                              <a
                                className="dropdown-item kanban-item-delete cursor-pointer d-flex align-items-center gap-1"
                                href="javascript:void(0);"
                              >
                                <i className="ti ti-trash fs-5" />
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="task-content">
                          <p
                            className="mb-0"
                            data-item-text="research competitors and identify weakness and strengths each of them. comparing their product features, quelity..."
                          >
                            research competitors and identify weakness and
                            strengths each of them. comparing their product
                            features, quelity...
                          </p>
                        </div>
                        <div className="task-body">
                          <div className="task-bottom">
                            <div className="tb-section-1">
                              <span
                                className="hstack gap-2 fs-2"
                                data-item-date="24 July"
                              >
                                <i className="ti ti-calendar fs-5" /> 24 July{" "}
                              </span>
                            </div>
                            <div className="tb-section-2">
                              <span className="badge rounded-pill text-bg-warning fs-1">
                                UX stages
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default Kanban
