import React from "react";
import { X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export const AccountModal: React.FC = () => {
  const {
    currentUser,
    accountModalOpen,
    closeAccountModal,
    logout,
  } = useAuth();

  if (!accountModalOpen || !currentUser) return null;

  const initials =
    currentUser.contactPerson
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "SK";


  return (
    <div
      className="modal-overlay open"
      id="customerAccountModal"
      onClick={closeAccountModal}
    >
      <div
        className="modal-card account-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={closeAccountModal}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="account-modal-header">
          <div className="account-avatar" id="accountAvatarText">
            {initials}
          </div>
          <div className="account-header-info">
            <h3
              id="accountModalCompanyName"
              style={{ margin: "0 0 4px", fontSize: "18px", color: "#1e293b" }}
            >
              {currentUser.companyName}
            </h3>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
              <span id="accountModalContact">{currentUser.contactPerson}</span>{" "}
              • GSTIN:{" "}
              <strong id="accountModalGst" style={{ color: "#0f172a" }}>
                {currentUser.gstNo}
              </strong>
            </p>
          </div>
        </div>

        <div className="account-modal-body">
          <div className="account-info-grid">
            <div className="account-info-card">
              <span className="info-label">Contact Person</span>
              <span className="info-value" id="accountInfoContact">
                {currentUser.contactPerson}
              </span>
            </div>
            <div className="account-info-card">
              <span className="info-label">Registered Phone (Login ID)</span>
              <span className="info-value" id="accountInfoPhone">
                {currentUser.phone}
              </span>
            </div>
            <div className="account-info-card">
              <span className="info-label">Email ID (Login ID)</span>
              <span className="info-value" id="accountInfoEmail">
                {currentUser.email}
              </span>
            </div>
            <div className="account-info-card">
              <span className="info-label">GST Number</span>
              <span className="info-value" id="accountInfoGst">
                {currentUser.gstNo}
              </span>
            </div>
            <div className="account-info-card full-width">
              <span className="info-label">Registered Address &amp; State</span>
              <span className="info-value" id="accountInfoAddress">
                {currentUser.address}, {currentUser.city}, {currentUser.state}
              </span>
            </div>
          </div>

          <div className="account-offers-section">
            <h4
              style={{
                fontSize: "15px",
                marginBottom: "12px",
                color: "var(--gray-900)",
              }}
            >
              Order History
            </h4>
            <div id="accountOrdersList">
              <p
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  margin: "6px 0",
                }}
              >
                No past orders found. Your confirmed orders will appear here.
              </p>
            </div>
          </div>

          <div className="account-actions-row" style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={logout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
