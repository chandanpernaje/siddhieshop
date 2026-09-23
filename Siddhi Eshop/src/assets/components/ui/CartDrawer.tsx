import React from "react";
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCartDrawer,
    updateQty,
    removeFromCart,
    subtotal,
  } = useCart();
  const { currentUser, openAuthModal } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutRfq = () => {
    if (cart.length === 0) {
      showToast(
        "Your RFQ Cart is empty. Please add items before requesting a quotation.",
      );
      return;
    }

    if (!currentUser) {
      showToast(
        "Customer Account Required: Please Sign In or Create an Account to request formal quotation.",
      );
      closeCartDrawer();
      openAuthModal("login");
      return;
    }

    closeCartDrawer();
    const prepareRfq = () => {
      const rfqSec = document.getElementById("rfqSection");
      if (rfqSec) {
        rfqSec.scrollIntoView({ behavior: "smooth" });
        const notesField = document.getElementById(
          "rfqNotes",
        ) as HTMLTextAreaElement;
        if (notesField) {
          const summaryList = cart
            .map(
              (item) =>
                `• ${item.brand} | ${item.name} (${item.partNo}): ${item.qty} ${item.unit} @ ₹${item.price.toFixed(2)} = ₹${(item.qty * item.price).toFixed(2)}`,
            )
            .join("\n");
            
          const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
          const gstAmount = cartSubtotal * 0.18;
          const grandTotal = cartSubtotal + gstAmount;

          notesField.value = `Official GST Quotation Request for Cart Items:\n\n${summaryList}\n\nSubtotal: ₹${cartSubtotal.toFixed(2)}\nGST (18%): ₹${gstAmount.toFixed(2)}\nGrand Total: ₹${grandTotal.toFixed(2)}\n\nPlease provide formal GST quote with freight to site and delivery lead times.`;
          notesField.focus();
        }
      }
      showToast("Cart items transferred to RFQ form below!");
    };

    if (window.location.pathname !== "/") {
      navigate("/#rfqSection");
      setTimeout(prepareRfq, 200);
    } else {
      prepareRfq();
    }
  };

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isCartOpen ? "open" : ""}`}
        onClick={closeCartDrawer}
      />
      <aside
        className={`cart-drawer ${isCartOpen ? "open" : ""}`}
        id="cartDrawer"
      >
        <div className="cart-drawer-header">
          <h3>
            <ShoppingCart
              size={18}
              style={{
                marginRight: "8px",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            />
            Quotation Cart
          </h3>
          <button
            className="btn-close-drawer"
            onClick={closeCartDrawer}
            aria-label="Close Cart"
          >
            <X size={18} />
          </button>
        </div>

        <div className="cart-drawer-items" id="cartItemsList">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingCart
                size={48}
                strokeWidth={1.2}
                style={{ color: "var(--gray-500)", marginBottom: "16px" }}
              />
              <p>Your industrial quotation cart is empty.</p>
              <button
                className="btn btn-primary btn-sm"
                style={{ marginTop: "15px" }}
                onClick={closeCartDrawer}
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item-row" key={item.id}>
                <div className="cart-item-info">
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--primary)",
                      fontWeight: 700,
                    }}
                  >
                    {item.brand} | {item.partNo}
                  </div>
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-price">
                    ₹{item.price.toFixed(2)} / {item.unit}
                  </div>
                </div>
                <div className="cart-qty-ctrl">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    aria-label="Decrease"
                  >
                    <Minus size={12} />
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    aria-label="Increase"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-drawer-footer">
          <div className="cart-subtotal-row" style={{ fontSize: "13px", color: "#64748b", marginBottom: "4px", display: "flex", justifyContent: "space-between" }}>
            <span>Subtotal (excl. GST):</span>
            <span>
              ₹
              {subtotal.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="cart-subtotal-row" style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
            <span>GST (18%):</span>
            <span>
              ₹
              {(subtotal * 0.18).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="cart-subtotal-row" style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "16px", display: "flex", justifyContent: "space-between" }}>
            <span>Grand Total:</span>
            <span>
              ₹
              {(subtotal * 1.18).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div
            className="cart-checkout-actions"
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <button className="btn btn-primary" onClick={handleCheckoutRfq}>
              Request Official GST Quotation
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={closeCartDrawer}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
