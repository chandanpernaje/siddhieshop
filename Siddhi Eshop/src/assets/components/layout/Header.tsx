import React, { useState } from "react";
import { Search, ShoppingCart, Menu, X, Phone, Mail, User } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PRODUCTS_DATA, ALL_OLFLEX_PRODUCTS } from "../../../data/products";

export const Header: React.FC = () => {
  const { totalItems, openCartDrawer } = useCart();
  const { currentUser, openAuthModal, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Filter products for dropdown
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const combinedList = [
      ...PRODUCTS_DATA.map(p => ({
        id: p.id,
        partNo: p.partNo,
        name: p.name,
        brand: p.brand || "",
        searchString: `${p.name} ${p.partNo} ${p.brand} ${(p.specs||[]).join(" ")} ${p.application || ""}`.toLowerCase(),
        image: p.image || "/images/placeholder-product.jpg",
        route: `/product/${p.partNo}`
      })),
      ...ALL_OLFLEX_PRODUCTS.map(p => ({
        id: p.partNo,
        partNo: p.partNo,
        name: p.name,
        brand: p.brand || "LAPP KABEL",
        searchString: `${p.name} ${p.partNo} ${p.brand || "LAPP KABEL"} ${p.desc || ""} ${p.category || ""}`.toLowerCase(),
        image: "/images/card-olflex.jpg",
        route: `/olflex`
      }))
    ];

    const q = searchQuery.toLowerCase().trim();
    return combinedList.filter((p) => p.searchString.includes(q)).slice(0, 6);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      setSearchQuery("");
      navigate(searchResults[0].route);
    }
  };

  return (
    <header className="site-header" style={{ position: "sticky", top: 0, zIndex: 1000, background: "#ffffff", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", flexWrap: "wrap", gap: "12px" }}>
        {/* Logo / Brand */}
        <div className="brand-logo" onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/images/siddhi-kabel-lockup.png" alt="Siddhi Kabel" style={{ height: "42px", objectFit: "contain" }} />
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, minWidth: "260px", maxWidth: "600px", margin: "0 10px", position: "relative" }}>
          <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", position: "relative" }}>
            <input
              type="text"
              placeholder="Search cables, part numbers, industrial brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 40px 10px 16px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                color: "#0f172a",
                outline: "none",
                backgroundColor: "#f8fafc",
              }}
            />
            <button
              type="submit"
              style={{
                position: "absolute",
                right: "12px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Search Dropdown */}
          {searchQuery.trim() !== "" && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "0 0 8px 8px",
                zIndex: 1000,
                maxHeight: "400px",
                overflowY: "auto",
                border: "1px solid #e2e8f0",
                borderTop: "none"
              }}
            >
              {searchResults.length > 0 ? (
                searchResults.map((prod, idx) => (
                  <div
                    key={prod.id || idx}
                    onClick={() => {
                      setSearchQuery("");
                      navigate(prod.route);
                    }}
                    style={{
                      padding: "10px 15px",
                      borderBottom: "1px solid #f1f5f9",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <img src={prod.image} alt={prod.name} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>{prod.name}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{prod.brand} • PN: {prod.partNo}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "15px", textAlign: "center", color: "#64748b", fontSize: "13px" }}>
                  No products found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions (Cart & Auth) */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={openCartDrawer}
            aria-label="Quotation Cart"
            style={{
              position: "relative",
              background: "#f1f5f9",
              border: "none",
              borderRadius: "8px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              color: "#0f172a",
              fontWeight: 600,
              fontSize: "13px",
            }}
          >
            <ShoppingCart size={18} />
            <span className="hidden-mobile">Cart</span>
            {totalItems > 0 && (
              <span
                style={{
                  background: "#b91c1c",
                  color: "#ffffff",
                  fontSize: "10px",
                  fontWeight: 800,
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }} className="hidden-mobile">
                Hi, {currentUser.contactPerson?.split(" ")[0] || "User"}
              </span>
              <button
                onClick={logout}
                style={{
                  background: "none",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#475569",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal("login")}
              style={{
                background: "#0f172a",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <style>
        {`
          @media (max-width: 768px) {
            .hidden-mobile {
              display: none !important;
            }
          }
        `}
      </style>
    </header>
  );
};
