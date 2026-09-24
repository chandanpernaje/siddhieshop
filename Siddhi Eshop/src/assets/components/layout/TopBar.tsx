import React from "react";
import { Phone, Mail } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div
      className="top-bar"
      style={{
        backgroundColor: "#0f172a",
        color: "#f8fafc",
        padding: "8px 24px",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            backgroundColor: "#b91c1c",
            color: "#ffffff",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "10px",
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          Official
        </span>
        <span style={{ fontWeight: 600 }}>
          Siddhi Kabel Corporation Private Limited | Dependable Electrical Solutions
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Phone size={13} style={{ color: "#ef4444" }} />
          <span>096200 00947 / 098860 58511</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Mail size={13} style={{ color: "#ef4444" }} />
          <a href="mailto:sales@siddhikabel.com" style={{ color: "inherit", textDecoration: "none" }}>
            sales@siddhikabel.com
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Mail size={13} style={{ color: "#ef4444" }} />
          <a href="mailto:Enquiry@siddhikabel.com" style={{ color: "inherit", textDecoration: "none" }}>
            Enquiry@siddhikabel.com
          </a>
        </div>
      </div>
    </div>
  );
};
