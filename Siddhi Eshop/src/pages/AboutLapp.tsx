import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RFQModal } from "../assets/components/ui/RFQModal.tsx";

export const AboutLapp: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const scrollToRfqTopic = (topic: string) => {
    setSelectedProduct(topic);
  };

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "20px 0 60px",
      }}
    >
      <div className="container">
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "14px",
          }}
        >
          <Link to="/" style={{ color: "#ff6600", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <span style={{ color: "#0f172a", fontWeight: 600 }}>
            About LAPP India
          </span>
        </div>

        {/* Brand Executive Hero Card */}
        <div
          className="sheet-hero-card"
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 12px rgba(15, 23, 42, 0.04)",
            marginBottom: "20px",
            borderLeft: "5px solid #ff6600",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <img
                src="/images/logo-lapp.png"
                alt="LAPP Logo"
                style={{ height: "36px", width: "auto", objectFit: "contain" }}
              />
              <div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#64748b",
                  }}
                >
                  LAPP GROUP GERMANY
                </span>
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  LAPP INDIA PRIVATE LIMITED
                </h1>
              </div>
            </div>
            <span
              style={{
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                color: "#c2410c",
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "16px",
                textTransform: "uppercase",
              }}
            >
              AUTHORISED CHANNEL PARTNER
            </span>
          </div>

          <p
            style={{
              fontSize: "13.5px",
              lineHeight: 1.6,
              color: "#475569",
              margin: "0 0 16px",
            }}
          >
            Headquartered in Stuttgart, Germany, <strong>LAPP</strong> is a
            world leader in integrated cable and connection technology. As an
            official authorized channel partner in Bangalore, Siddhi Kabel
            Corporation Private Limited distributes the full spectrum of
            original Lapp solutions: <strong>ÖLFLEX®</strong> power and control
            cables, <strong>UNITRONIC®</strong> data transmission cables,{" "}
            <strong>ETHERLINE®</strong> industrial Ethernet,{" "}
            <strong>SKINTOP®</strong> cable glands, <strong>SILVYN®</strong>{" "}
            protective conduits, and <strong>LAPP INFRA</strong> building wires.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <div
                style={{ fontSize: "18px", fontWeight: 800, color: "#ff6600" }}
              >
                40,000+
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                Standard Catalogue SKUs
              </div>
            </div>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <div
                style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a" }}
              >
                Stuttgart, GER
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                Global Engineering Origin
              </div>
            </div>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <div
                style={{ fontSize: "18px", fontWeight: 800, color: "#ff6600" }}
              >
                Bangalore Hub
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                Stock &amp; Immediate Dispatch
              </div>
            </div>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <div
                style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a" }}
              >
                100% Genuine
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                Mill Test Certs Provided
              </div>
            </div>
          </div>
        </div>

        {/* Product Series Directory */}
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "16px",
          }}
        >
          LAPP Brand Portfolio &amp; Product Families
        </h2>

        <div
          className="lapp-product-card-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <img
              src="/images/card-olflex.jpg"
              alt="ÖLFLEX Cables"
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "20px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#ff6600",
                  textTransform: "uppercase",
                }}
              >
                ÖLFLEX®
              </span>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  margin: "4px 0 8px",
                }}
              >
                Power and Control Cables
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  lineHeight: 1.5,
                  marginBottom: "14px",
                }}
              >
                Oil-resistant, flexible PVC and PUR control cables for
                industrial machinery, motor feeds, and drag chains (CLASSIC 110,
                110 SY, 110 CY, 400 P, FD 855 CP).
              </p>
              <Link
                to="/olflex-cables"
                className="btn btn-primary btn-sm"
                style={{ width: "100%", textAlign: "center", textTransform: "uppercase" }}
              >
                View Products &rarr;
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <img
              src="/images/card-unitronic.jpg"
              alt="UNITRONIC Cables"
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "20px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#ff6600",
                  textTransform: "uppercase",
                }}
              >
                UNITRONIC®
              </span>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  margin: "4px 0 8px",
                }}
              >
                Data Communication Cables
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  lineHeight: 1.5,
                  marginBottom: "14px",
                }}
              >
                Screened data transmission cables with high EMC protection for
                sensors, instrumentation, RS485 serial communication, and
                industrial automation.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, textTransform: "uppercase" }}
                  onClick={() => scrollToRfqTopic("UNITRONIC Cables")}
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <img
              src="/images/card-skintop.jpg"
              alt="SKINTOP Glands"
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "20px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#ff6600",
                  textTransform: "uppercase",
                }}
              >
                SKINTOP®
              </span>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  margin: "4px 0 8px",
                }}
              >
                Cable Glands &amp; Accessories
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  lineHeight: 1.5,
                  marginBottom: "14px",
                }}
              >
                Polyamide, nickel-plated brass, and stainless steel IP68/IP69K
                cable glands with integrated strain relief and vibration
                protection. Metric &amp; PG threads.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, textTransform: "uppercase" }}
                  onClick={() => scrollToRfqTopic("SKINTOP Glands")}
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>

          <div className="lapp-product-card">
            <img src="/images/card-uniplus.jpg" alt="UNIPLUS Single Cores" />
            <div className="lapp-product-card-body">
              <span className="lapp-product-badge">UNIPLUS®</span>
              <h3>Cabinet Single Cores</h3>
              <p>
                Flexible single-core wires for control cabinets, panels, and
                internal machine wiring.
              </p>
              <button
                className="btn btn-primary btn-sm"
                style={{ width: "100%", textTransform: "uppercase" }}
                onClick={() => scrollToRfqTopic("UNIPLUS Single Cores")}
              >
                Request Quote
              </button>
            </div>
          </div>

          <div className="lapp-product-card">
            <img src="/images/card-conduit.jpg" alt="SILVYN Conduit Systems" />
            <div className="lapp-product-card-body">
              <span className="lapp-product-badge">SILVYN®</span>
              <h3>Rill, Conduit &amp; Klick</h3>
              <p>
                Corrugated flexible conduits and connectors for mechanical and
                environmental protection.
              </p>
              <button
                className="btn btn-primary btn-sm"
                style={{ width: "100%", textTransform: "uppercase" }}
                onClick={() => scrollToRfqTopic("SILVYN Conduits")}
              >
                Request Quote
              </button>
            </div>
          </div>

          <div className="lapp-product-card">
            <img src="/images/card-infra.jpg" alt="LAPP INFRA Building Wires" />
            <div className="lapp-product-card-body">
              <span className="lapp-product-badge">LAPP INFRA</span>
              <h3>Domestic / House Wiring</h3>
              <p>
                Flame-retardant FR-LSH building wires for residential and
                commercial installations.
              </p>
              <button
                className="btn btn-primary btn-sm"
                style={{ width: "100%", textTransform: "uppercase" }}
                onClick={() => scrollToRfqTopic("LAPP INFRA House Wiring")}
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>

        <div className="lapp-distributor-bar">
          <span>
            Authorized Lapp Channel Partner:{" "}
            <strong>Siddhi Kabel Corporation Private Limited</strong> •
            Banashankari 3rd Stage, Bangalore 560085 • Phone: 09620000947
          </span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => scrollToRfqTopic("LAPP FULL SCHEDULE")}
          >
            Submit Official RFQ / BOM →
          </button>
        </div>
      </div>
      {selectedProduct && (
        <RFQModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
