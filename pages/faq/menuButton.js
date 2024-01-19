import { useState } from "react";

const ActionsButton = ({ id, index, onDelete, onUpdate }) => {
    const handleActionClick = (action) => {
        switch (action) {
            case 'update':
                onUpdate(index)
                return
            case 'delete':
                onDelete(id)
                return
        }
    };

    const actions = [
        { label: "Recent", value: "update" },
        { label: "Popular", value: "delete" },
    ];

    return (
        <div className="container dropdown js-dropdown js-actions-1-active d-flex h-100" >
            <div
                className="dropdown__button d-flex items-center rounded-4 text-blue-1 bg-blue-1-05 text-14 px-45 py-10"
                data-bs-toggle="dropdown"
                data-bs-auto-close="true"
                aria-expanded="false"
                data-bs-offset="0,10"
            >
                <span className="js-dropdown-title">
                    Sort
                </span>
                <i className="icon icon-chevron-sm-down text-7 ml-10" />
            </div>
            <div className="toggle-element -dropdown-2 js-click-dropdown dropdown-menu">
                <div className="text-16 fw-500 js-dropdown-list">
                    {actions.map((action) => (
                        <div key={action.value}>
                            <button
                                className="d-block js-dropdown-link"
                                onClick={() => handleActionClick(action.value)}
                            >
                                {action.label}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActionsButton;
