import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS_DATA } from "../../../data/products";
import { useAuth } from "../../../context/AuthContext";

export const CatalogGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { searchQuery, searchCategory } = useAuth();
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS_DATA;

    // Tab filter
    if (activeTab !== "all") {
      list = list.filter((p) => p.category === activeTab);
    }

    // Header category select filter
    if (searchCategory !== "all") {
      if (searchCategory === "lapp") {
        list = list.filter((p) => p.brand.toLowerCase().includes("lapp"));
      } else if (searchCategory === "eaton") {
        list = list.filter((p) => p.brand.toLowerCase().includes("eaton"));
      } else if (searchCategory === "partex") {
        list = list.filter((p) => p.brand.toLowerCase().includes("partex"));
      } else if (searchCategory === "mennekes") {
        list = list.filter((p) => p.brand.toLowerCase().includes("menn"));
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.partNo.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q)) ||
          p.application.toLowerCase().includes(q),
      );
    }

    return list;
  }, [activeTab, searchCategory, searchQuery]);

  return (
    <section
      className="products-section"
      id="productsSection"
      style={{
        padding: "50px 0",
        background: "#ffffff",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        className="container"
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 15px",
          boxSizing: "border-box",
        }}
      >
        <div className="section-title-wrap">
          <span className="section-subtitle">Verified Industrial Inventory</span>
          <h2 className="section-title">Direct Procurement Catalog</h2>
          <p className="section-desc">
            Explore certified industrial electrical and automation components in
            ready stock with official manufacturer test certificates.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className="tabs-bar"
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >
          <button
            className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Products ({PRODUCTS_DATA.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "cables" ? "active" : ""}`}
            onClick={() => setActiveTab("cables")}
          >
            Power &amp; Control Cables
          </button>
          <button
            className={`tab-btn ${activeTab === "switchgear" ? "active" : ""}`}
            onClick={() => setActiveTab("switchgear")}
          >
            Switchgear &amp; Breakers
          </button>
          <button
            className={`tab-btn ${activeTab === "data" ? "active" : ""}`}
            onClick={() => setActiveTab("data")}
          >
            Data &amp; Marking Systems
          </button>
          <button
            className={`tab-btn ${activeTab === "plugs" ? "active" : ""}`}
            onClick={() => setActiveTab("plugs")}
          >
            CEE Industrial Plugs
          </button>
          <button
            className={`tab-btn ${activeTab === "earthing" ? "active" : ""}`}
            onClick={() => setActiveTab("earthing")}
          >
            Earthing Electrodes
          </button>
        </div>

        {/* Product Cards Grid with Fully Clickable Elements */}
        <div
          className="products-grid"
          id="productsGrid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "16px",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            margin: "0 auto",
          }}
        >
          {filteredProducts.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "50px 20px",
                color: "#6b7280",
              }}
            >
              <h3>No products match your search or filter criteria.</h3>
              <p style={{ marginTop: "8px" }}>
                Try clearing the search or switching back to "All Products".
              </p>
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => navigate(`/product-detail?sku=${prod.partNo}`)}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "16px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease",
                }}
                className="hover:shadow-md hover:border-red-500 group"
              >
                <div>
                  <div style={{ height: "140px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", borderRadius: "8px", marginBottom: "12px" }}>
                    <img src={prod.image} alt={prod.name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase" }}>{prod.brand}</span>
                  
                  {/* Clickable Product Title */}
                  <h4 className="group-hover:text-red-600 transition-colors" style={{ fontSize: "14px", fontWeight: "750", color: "#111827", margin: "4px 0" }}>
                    {prod.name}
                  </h4>
                  
                  {/* Clickable Part Number Text */}
                  <p style={{ fontSize: "12px", color: "#0284c7", fontWeight: "600" }}>
                    Part No: <span className="underline">{prod.partNo}</span>
                  </p>
                </div>
                
                <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "16px", fontWeight: "800", color: "#111827" }}>₹{prod.price}</span>
                    <span style={{ display: "block", fontSize: "10px", color: "#6b7280" }}>+ GST</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product-detail?sku=${prod.partNo}`);
                    }}
                    style={{ background: "#dc2626", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                  >
                    REQUEST QUOTE
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};