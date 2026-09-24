import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, FileText, ShoppingCart } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

import { PRODUCTS_DATA, ALL_OLFLEX_PRODUCTS } from "../../../data/products";

export const Header: React.FC = () => {
  const {
    currentUser,
    openAuthModal,
    openAccountModal,
    searchQuery,
    setSearchQuery,
    searchCategory,
    setSearchCategory,
  } = useAuth();

  const { totalItems, subtotal, openCartDrawer } = useCart();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (currentUser) {
      openAccountModal();
    } else {
      openAuthModal("login");
    }
  };



  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSearchCategory(val);
    if (val === "lapp") {
      navigate("/about-lapp");
    } else if (val === "eaton") {
      navigate("/about-eaton");
    } else if (val === "partex") {
      navigate("/about-partex");
    } else if (val === "mennekes") {
      navigate("/about-mennekes");
    } else if (val === "all") {
      navigate("/");
    }
  };

  const scrollToRfq = () => {
    if (window.location.pathname !== "/") {
      navigate("/#rfqSection");
    } else {
      document
        .getElementById("rfqSection")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter products for dropdown
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    // Normalize both product arrays for search
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

    let list = combinedList;
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
    const q = searchQuery.toLowerCase().trim();
    return list.filter((p) => p.searchString.includes(q)).slice(0, 6); // limit to 6 results
  }, [searchQuery, searchCategory]);

  // Quick links for brands and pages
  const quickLinks = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const links: { title: string; url?: string; action?: string }[] = [];

    if (q.includes("lapp") || q.includes("olflex") || q.includes("unitronic")) {
      links.push({ title: "View Lapp Kabel Germany Portfolio", url: "/about-lapp" });
    }
    if (q.includes("eaton") || q.includes("moeller")) {
      links.push({ title: "View Eaton Moeller Portfolio", url: "/about-eaton" });
    }
    if (q.includes("partex") || q.includes("marker")) {
      links.push({ title: "View Partex Sweden Portfolio", url: "/about-partex" });
    }
    if (q.includes("mennekes") || q.includes("menax") || q.includes("plug") || q.includes("socket")) {
      links.push({ title: "View Mennekes Germany Portfolio", url: "/about-mennekes" });
    }
    if (q.includes("request") || q.includes("form") || q.includes("quote") || q.includes("rfq")) {
      links.push({ title: "Go to Request for Quotation (RFQ) Form", action: "rfq" });
    }
    
    return links;
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      if (searchCategory === "lapp") navigate("/about-lapp");
      else if (searchCategory === "eaton") navigate("/about-eaton");
      else if (searchCategory === "partex") navigate("/about-partex");
      else if (searchCategory === "mennekes") navigate("/about-mennekes");
      return;
    }

    if (quickLinks.length > 0) {
      const link = quickLinks[0];
      setSearchQuery("");
      if (link.action === "rfq") {
        scrollToRfq();
      } else {
        navigate(link.url!);
      }
    } else if (searchResults.length > 0) {
      setSearchQuery("");
      navigate(searchResults[0].route);
    }
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link
            to="/"
            className="brand-logo-wrap"
            title="Siddhi Kabel Corporation Private Limited"
          >
            <img
              src="/images/siddhi-kabel-lockup.png"
              alt="Siddhi Kabel Corporation Private Limited"
              className="brand-lockup-img"
              width="220"
              height="52"
              style={{
                height: "52px",
                maxHeight: "52px",
                width: "auto",
                maxWidth: "260px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Link>

          {/* Search with Category Filter */}
          <div className="header-search-wrap" style={{ position: "relative" }}>
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <select
                className="search-cat-select"
                id="searchCategorySelect"
                value={searchCategory}
                onChange={handleCategoryChange}
              >
                <option value="all">All Brands (4)</option>
                <option value="lapp">Lapp Kabel Germany</option>
                <option value="eaton">Eaton Moeller Germany</option>
                <option value="partex">Partex Sweden</option>
                <option value="mennekes">Mennekes Germany</option>
              </select>
              <input
                type="text"
                id="headerSearchInput"
                className="search-input"
                placeholder="Search Part No., Lapp ÖLFLEX, Eaton, Partex, Mennekes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" className="search-btn" title="Search">
                <Search size={18} strokeWidth={2.5} />
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
                {quickLinks.length > 0 && (
                  <div style={{ padding: "8px 15px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>Quick Links</div>
                    {quickLinks.map((link, idx) => (
                      <div
                        key={`ql-${idx}`}
                        onClick={() => {
                          setSearchQuery("");
                          if (link.action === "rfq") {
                            scrollToRfq();
                          } else {
                            navigate(link.url!);
                          }
                        }}
                        style={{
                          fontSize: "13px",
                          color: "#c32125",
                          fontWeight: "600",
                          cursor: "pointer",
                          padding: "6px 0",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                      >
                        <span style={{ fontSize: "16px" }}>→</span> {link.title}
                      </div>
                    ))}
                  </div>
                )}
                
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
                    {quickLinks.length > 0 ? "No specific products found, try the quick links above." : `No products found for "${searchQuery}"`}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Customer Account / Sign In */}
            <div
              className="action-item action-auth-item"
              id="headerAuthAction"
              onClick={handleAccountClick}
              title="Customer Account / Sign In"
              style={{ cursor: "pointer" }}
            >
              <div className="action-icon-wrap" id="headerAuthIconWrap">
                <User size={18} strokeWidth={2} />
              </div>
              <div className="action-text">
                <span className="action-label" id="headerAuthLabel">
                  {currentUser ? "Welcome," : "Sign In / Register"}
                </span>
                <span className="action-val" id="headerAuthVal">
                  {currentUser
                    ? `${currentUser.contactPerson.split(" ")[0]} (${currentUser.companyName.slice(0, 12)}...)`
                    : "Customer Account"}
                </span>
              </div>
            </div>

            {/* Quick RFQ */}
            <div
              className="action-item"
              onClick={scrollToRfq}
              style={{ cursor: "pointer" }}
              title="Bulk Inquiry / RFQ"
            >
              <div className="action-icon-wrap">
                <FileText size={18} strokeWidth={2} />
              </div>
              <div className="action-text">
                <span className="action-label">Bulk Inquiry</span>
                <span className="action-val">Quick RFQ</span>
              </div>
            </div>

            {/* Cart Drawer Button */}
            <button
              className="action-item"
              onClick={openCartDrawer}
              title="View RFQ Cart"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div className="action-icon-wrap">
                <ShoppingCart size={18} strokeWidth={2} />
                <span className="action-badge" id="cartCountBadge">
                  {totalItems}
                </span>
              </div>
              <div className="action-text">
                <span className="action-label">Quotation Cart</span>
                <span className="action-val" id="cartSubtotalHeader">
                  ₹
                  {subtotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 991px) {
            .header-inner {
              flex-wrap: wrap !important;
              justify-content: center !important;
              text-align: center !important;
            }
            .brand-logo-wrap {
              width: 100% !important;
              justify-content: center !important;
              margin-bottom: 15px !important;
              order: 1 !important;
            }
            .header-actions {
              width: 100% !important;
              justify-content: space-between !important;
              margin-bottom: 15px !important;
              border-top: none !important;
              order: 2 !important;
            }
            .header-search-wrap {
              width: 100% !important;
              max-width: 100% !important;
              margin-bottom: 10px !important;
              order: 3 !important;
            }
            .search-cat-select {
              max-width: 100px !important;
              font-size: 11px !important;
              padding: 0 5px !important;
            }
          }
        `}
      </style>
    </header>
  );
};
