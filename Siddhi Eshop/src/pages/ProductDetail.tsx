import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, CheckCircle2, FileText } from "lucide-react";
import { useCart } from "../context/CartContext";
import { isValidPositiveNumber } from "../utils/validation";
import { RFQModal } from "../assets/components/ui/RFQModal.tsx";

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addCustomItem } = useCart();

  // Interactive selectors state
  const [selectedCore, setSelectedCore] = useState("3 Core");
  const [selectedSize, setSelectedSize] = useState("0.5 Sqmm");
  const [selectedConductor, setSelectedConductor] = useState("With Earth (Yellow/Green - G)");
  const [qty, setQty] = useState(50);
  const [selectedImg, setSelectedImg] = useState("/images/cable-olflex-thumb.png");
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 20, 220));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 20, 100));
  };
  
  // State to manage RFQ Modal pop-up
  const [selectedProductForRFQ, setSelectedProductForRFQ] = useState<string | null>(null);

  const coreOptions = [
    "2 Core", "3 Core", "4 Core", "5 Core", "6 Core", "7 Core", "8 Core",
    "10 Core", "12 Core", "14 Core", "15 Core", "16 Core", "18 Core",
    "20 Core", "21 Core", "25 Core", "30 Core", "32 Core", "34 Core",
    "35 Core", "36 Core", "40 Core", "41 Core", "50 Core", "52 Core"
  ];

  const sizeOptions = [
    "0.5 Sqmm", "0.75 Sqmm", "1 Sqmm", "1.5 Sqmm", "2.5 Sqmm",
    "4 Sqmm", "6 Sqmm", "10 Sqmm", "16 Sqmm", "25 Sqmm", "35 Sqmm"
  ];

  const galleryImages = [
    { src: "/images/cable-olflex-thumb.png", label: "Main Profile" },
    { src: "/images/cable-olflex-angle.png", label: "Angle View" },
    { src: "/images/cable-olflex-cores.png", label: "Numbered Cores" },
    { src: "/images/cable-olflex-drum.png", label: "Wooden Drum" },
  ];

  // Dynamic price calculation based on selected core and size
  const calculateDynamicPrice = () => {
    const coreNum = parseInt(selectedCore) || 1;
    const sizeNum = parseFloat(selectedSize) || 0.5;

    // Industrial pricing multiplier formula based on copper content & insulation
    const baseUnitPrice = 35; 
    const calculatedPrice = baseUnitPrice * Math.pow(coreNum, 0.45) * Math.pow(sizeNum, 0.75) + 15;
    
    const finalPrice = Math.max(25, Number(calculatedPrice.toFixed(2)));
    const gstPrice = Number((finalPrice * 0.18).toFixed(2)); // 18% GST
    const mrpPrice = Number((finalPrice * 1.82).toFixed(2)); // Estimated MRP

    return {
      price: finalPrice,
      gst: gstPrice,
      mrp: mrpPrice,
    };
  };

  const currentPricing = calculateDynamicPrice();

  const handleAddToCart = () => {
    if (!isValidPositiveNumber(qty)) return;
    const variationId = `${id || "1119003"}-${selectedCore.replace(/\s+/g, '-')}-${selectedSize.replace(/\s+/g, '-')}-${selectedConductor.includes("With") ? "G" : "X"}`;
    addCustomItem(
      {
        id: variationId,
        name: `ÖLFLEX® CLASSIC 110 ${selectedCore} ${selectedSize} (${selectedConductor})`,
        partNo: id || "1119003",
        brand: "LAPP KABEL",
        price: currentPricing.price,
        unit: "meter",
      },
      qty
    );
    setQty(50);
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "20px 0 60px" }}>
      <div className="container">
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "#64748b", marginBottom: "20px", flexWrap: "wrap" }}>
          <Link to="/" style={{ color: "#0284c7", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link to="/about-lapp" style={{ color: "#0284c7", textDecoration: "none" }}>LAPP India</Link>
          <span>/</span>
          <Link to="/olflex-cables" style={{ color: "#0284c7", textDecoration: "none" }}>ÖLFLEX® Power & Control Cables</Link>
          <span>/</span>
          <strong style={{ color: "#c32125" }}>ÖLFLEX® CLASSIC 110 {selectedCore} {selectedSize} (Part: {id || "1119003"})</strong>
        </div>

        {/* Main 3-Column Layout */}
        <style>
          {`
            .product-detail-grid {
              display: grid;
              grid-template-columns: 1fr 1.3fr 1fr;
              gap: 24px;
            }
            .product-bottom-grid {
              display: grid;
              grid-template-columns: 1.2fr 1fr;
              gap: 40px;
            }
            @media (max-width: 991px) {
              .product-detail-grid, .product-bottom-grid {
                grid-template-columns: 1fr;
              }
            }
          `}
        </style>
        <div className="product-detail-grid">          
          {/* Column 1: Image Gallery & Zoom Preview */}
          <div>
            <div 
              style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", textAlign: "center", marginBottom: "12px", height: "340px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}
            >
              <div style={{ position: "absolute", top: "10px", right: "10px", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "6px", display: "flex", alignItems: "center", zIndex: 10, overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                <button 
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 100}
                  style={{ background: "#fff", border: "none", padding: "6px 10px", cursor: zoomLevel <= 100 ? "not-allowed" : "pointer", fontSize: "16px", fontWeight: "bold", color: zoomLevel <= 100 ? "#cbd5e1" : "#0f172a", borderRight: "1px solid #e2e8f0" }}
                  title="Zoom Out"
                >
                  -
                </button>
                <div style={{ padding: "0 10px", fontSize: "11px", fontWeight: 700, color: "#64748b", minWidth: "45px", textAlign: "center" }}>
                  {zoomLevel}%
                </div>
                <button 
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 220}
                  style={{ background: "#fff", border: "none", padding: "6px 10px", cursor: zoomLevel >= 220 ? "not-allowed" : "pointer", fontSize: "16px", fontWeight: "bold", color: zoomLevel >= 220 ? "#cbd5e1" : "#0f172a", borderLeft: "1px solid #e2e8f0" }}
                  title="Zoom In"
                >
                  +
                </button>
              </div>
              <img src={selectedImg} alt="ÖLFLEX CLASSIC 110" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", transform: `scale(${zoomLevel / 100})`, transition: "transform 0.2s ease-out" }} />
            </div>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(img.src)}
                  style={{
                    width: "60px",
                    height: "60px",
                    border: selectedImg === img.src ? "2px solid #ff6600" : "1px solid #cbd5e1",
                    borderRadius: "6px",
                    background: "#fff",
                    cursor: "pointer",
                    padding: "4px",
                    flexShrink: 0
                  }}
                >
                  <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Product Titles, Description & Interactive Selectors */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "24px" }}>
            <span style={{ color: "#ff6600", fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>LAPP KABEL GERMANY</span>
            <h1 style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a", margin: "4px 0 4px" }}>
              ÖLFLEX® CLASSIC 110 {selectedCore} {selectedSize}
            </h1>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "12px" }}>
              PVC Copper Insulated Number coded cables
            </p>
            <div style={{ fontSize: "12px", color: "#334155", marginBottom: "16px" }}>
              Part No: <strong style={{ color: "#0284c7" }}>{id || "1119003"}</strong>
            </div>

            {/* Info Box */}
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #ff6600", padding: "12px 14px", borderRadius: "6px", marginBottom: "20px" }}>
              <strong style={{ fontSize: "12.5px", color: "#0f172a", display: "block", marginBottom: "3px" }}>
                Oil-resistant PVC control cable with numbered cores
              </strong>
              <p style={{ margin: 0, color: "#64748b", fontSize: "11.5px", lineHeight: "1.4" }}>
                ÖLFLEX® CLASSIC 110 - PVC control cable, VDE registered and with numbered cores, flexible cable for various applications, U0/U: 300/500V
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px", color: "#16a34a", fontSize: "11.5px", fontWeight: 700 }}>
                <CheckCircle2 size={13} /> VDE certificate of conformity with factory surveillance
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px", color: "#c32125", fontSize: "11.5px", fontWeight: 700 }}>
                <FileText size={13} /> product information (PDF)
              </div>
            </div>

            {/* 1. Number of Core Selector */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "700", marginBottom: "6px", color: "#1e293b" }}>
                <span>1. Number of core</span>
                <span style={{ color: "#ff6600" }}>{selectedCore}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(65px, 1fr))", gap: "6px" }}>
                {coreOptions.map((core) => (
                  <button
                    key={core}
                    onClick={() => setSelectedCore(core)}
                    style={{
                      padding: "5px 6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      borderRadius: "4px",
                      border: selectedCore === core ? "2px solid #c32125" : "1px solid #cbd5e1",
                      background: selectedCore === core ? "#fff5f5" : "#fff",
                      color: selectedCore === core ? "#c32125" : "#334155",
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {core}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Size (Sqmm) Selector */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "700", marginBottom: "6px", color: "#1e293b" }}>
                <span>2. Size (Sqmm)</span>
                <span style={{ color: "#ff6600" }}>{selectedSize}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "6px" }}>
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: "5px 6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      borderRadius: "4px",
                      border: selectedSize === size ? "2px solid #c32125" : "1px solid #cbd5e1",
                      background: selectedSize === size ? "#fff5f5" : "#fff",
                      color: selectedSize === size ? "#c32125" : "#334155",
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Protective Conductor Selector */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "700", marginBottom: "6px", color: "#1e293b" }}>
                <span style={{ paddingRight: "8px" }}>3. Protective conductor (with/without Yellow/Green)</span>
                <span style={{ color: "#ff6600", whiteSpace: "nowrap" }}>{selectedConductor.includes("With") ? "With Earth (G)" : "Without (X)"}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))", gap: "8px" }}>
                {["With Earth (Yellow/Green - G)", "Without Earth (Numbered - X)"].map((cond) => (
                  <button
                    key={cond}
                    title={cond}
                    onClick={() => setSelectedConductor(cond)}
                    style={{
                      padding: "7px 12px",
                      fontSize: "11px",
                      fontWeight: 700,
                      borderRadius: "4px",
                      border: selectedConductor === cond ? "2px solid #0f172a" : "1px solid #cbd5e1",
                      background: selectedConductor === cond ? "#0f172a" : "#fff",
                      color: selectedConductor === cond ? "#fff" : "#334155",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%"
                    }}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Dynamic Pricing, Qty & Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "sticky", top: "120px", alignSelf: "start" }}>
            
            {/* Dynamic Price Box */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px" }}>
              <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "2px" }}>₹{(currentPricing.price + currentPricing.gst).toFixed(2)} (incl. of all taxes) / mtr</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontSize: "24px", fontWeight: "900", color: "#0f172a" }}>₹{currentPricing.price}</span>
                <span style={{ fontSize: "11.5px", color: "#16a34a", fontWeight: 700 }}>+ ₹{currentPricing.gst} GST</span>
              </div>
              <div style={{ fontSize: "11.5px", color: "#64748b", marginBottom: "16px" }}>
                MRP <span style={{ textDecoration: "line-through" }}>₹{currentPricing.mrp}</span> <strong style={{ color: "#c32125" }}>45% OFF</strong>
              </div>

              {/* Quantity Controller */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", background: "#f8fafc", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>Update Qty (Mtrs)</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: "26px", height: "26px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>-</button>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                    style={{ width: "45px", textAlign: "center", border: "none", background: "transparent", fontWeight: "bold", fontSize: "13px" }}
                  />
                  <button onClick={() => setQty(qty + 1)} style={{ width: "26px", height: "26px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>+</button>
                </div>
              </div>
              <div style={{ fontSize: "10.5px", color: "#d97706", marginBottom: "16px", lineHeight: "1.3" }}>
                ⚠️ Caution: order Multiple of 10 Mtrs or 25 mtrs for all multicore
              </div>

              {/* 1. Add to Enquiry (Adds to Cart with dynamic price) */}
              <button className="btn btn-primary" onClick={handleAddToCart} style={{ width: "100%", marginBottom: "10px", background: "#2563eb", justifyContent: "center" }}>
                <ShoppingCart size={15} /> ADD TO ENQUIRY
              </button>
            </div>

            {/* Bulk Order Box (Opens RFQ Modal Popup) */}
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "16px" }}>
              <strong style={{ fontSize: "12px", color: "#166534", display: "block", marginBottom: "4px" }}>Bulk Order?</strong>
              <p style={{ fontSize: "11px", color: "#475569", margin: "0 0 10px", lineHeight: "1.4" }}>
                Need a large quantity? Raise an RFQ to get our best custom B2B pricing for your project.
              </p>
              <button 
                className="btn btn-sm" 
                onClick={() => setSelectedProductForRFQ(`Bulk Order RFQ: ÖLFLEX® CLASSIC 110 ${selectedCore} ${selectedSize} (Part: ${id || "1119003"}) - Qty: ${qty}m`)} 
                style={{ background: "#16a34a", color: "#fff", width: "100%", fontWeight: 800 }}
              >
                RAISE RFQ
              </button>
            </div>

            {/* Technical Data Sidebar Box */}
            <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px" }}>
              <strong style={{ fontSize: "12px", textTransform: "uppercase", color: "#0f172a", display: "block", marginBottom: "10px", letterSpacing: "0.5px" }}>
                Technical Data Summary
              </strong>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", textAlign: "center" }}>
                <div style={{ background: "#f8fafc", padding: "8px 4px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ display: "block", fontSize: "10px", color: "#64748b" }}>Outer dia</span>
                  <strong style={{ fontSize: "12px", color: "#0f172a" }}>5.4 mm</strong>
                </div>
                <div style={{ background: "#f8fafc", padding: "8px 4px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ display: "block", fontSize: "10px", color: "#64748b" }}>Copper</span>
                  <strong style={{ fontSize: "12px", color: "#0f172a" }}>14.4 kg/km</strong>
                </div>
                <div style={{ background: "#f8fafc", padding: "8px 4px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  <span style={{ display: "block", fontSize: "10px", color: "#64748b" }}>Weight</span>
                  <strong style={{ fontSize: "12px", color: "#0f172a" }}>85 kg/km</strong>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Section: Detailed Product Description & Full Technical Specifications Table */}
        <div style={{ marginTop: "30px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "30px" }}>
          <div className="product-bottom-grid">
            
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Product Description</h3>
              
              <h4 style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Benefits</h4>
              <ul style={{ fontSize: "12px", color: "#64748b", paddingLeft: "16px", marginBottom: "16px", lineHeight: "1.6" }}>
                <li>High electrical performance due to 4 kV test voltage</li>
                <li>Oil-resistant according to DIN EN 50290-2-22 (TM54)</li>
                <li>Space-saving installation due to small cable diameters</li>
                <li>High flexibility thanks to fine-wire strand copper conductor construction</li>
              </ul>

              <h4 style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Application Range</h4>
              <ul style={{ fontSize: "12px", color: "#64748b", paddingLeft: "16px", marginBottom: "16px", lineHeight: "1.6" }}>
                <li>Plant engineering, Industrial machinery, Heating and air-conditioning systems</li>
                <li>Machine tools, automated production lines, and conveyor systems</li>
                <li>Mainly used in dry, damp and wet interiors (including water-oil mixtures)</li>
              </ul>

              <h4 style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Norm references / Approvals</h4>
              <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
                VDE reg. no. 7030, CE compliant according to Low Voltage Directive 2014/35/EU
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>Technical Data</h3>
              <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 0", fontWeight: "600", color: "#475569", width: "40%" }}>Classification ETIM 5 / ETIM 6</td>
                    <td style={{ padding: "8px 0", color: "#1e293b" }}>ETIM 5.0 / 6.0 Class-ID: EC000104 (Control cable)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 0", fontWeight: "600", color: "#475569" }}>Core identification code</td>
                    <td style={{ padding: "8px 0", color: "#1e293b" }}>Black with white numbers acc. to VDE 0293-334</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 0", fontWeight: "600", color: "#475569" }}>Conductor stranding</td>
                    <td style={{ padding: "8px 0", color: "#1e293b" }}>Fine wire according to DIN EN 60228 (VDE 0295), class 5</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 0", fontWeight: "600", color: "#475569" }}>Minimum bending radius</td>
                    <td style={{ padding: "8px 0", color: "#1e293b" }}>Occasional flexing: 10 x outer diameter | Fixed: 4 x outer diameter</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 0", fontWeight: "600", color: "#475569" }}>Nominal voltage</td>
                    <td style={{ padding: "8px 0", color: "#1e293b" }}>U0/U: 300/500 V</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 0", fontWeight: "600", color: "#475569" }}>Test voltage</td>
                    <td style={{ padding: "8px 0", color: "#1e293b" }}>4000 V AC</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 0", fontWeight: "600", color: "#475569" }}>Temperature range</td>
                    <td style={{ padding: "8px 0", color: "#1e293b" }}>Occasional flexing: -5°C to +70°C | Fixed: -40°C to +80°C</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>

      {/* RFQ Modal Popup */}
      {selectedProductForRFQ && (
        <RFQModal
          product={selectedProductForRFQ}
          onClose={() => setSelectedProductForRFQ(null)}
        />
      )}
    </div>
  );
};