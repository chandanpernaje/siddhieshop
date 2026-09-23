import React, { useState } from "react";
import {
  X,
  Lock,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import {
  isNotEmptyString,
  isValidEmail,
  isValidPhone,
} from "../../../utils/validation";

export const AuthModal: React.FC = () => {
  const {
    currentUser,
    logout,
    authModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    login,
    register,
  } = useAuth();

  // Login form state
  const [loginId, setLoginId] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginFieldErrors, setLoginFieldErrors] = useState<
    Record<string, string>
  >({});

  // Register form state
  const [regData, setRegData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    gstNo: "",
    state: "Karnataka",
    city: "Bangalore",
    password: "",
    address: "",
  });
  const [regError, setRegError] = useState("");
  const [regFieldErrors, setRegFieldErrors] = useState<Record<string, string>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const renderRegError = (field: string) =>
    regFieldErrors[field] ? (
      <div
        className="auth-alert"
        style={{ display: "block", marginTop: "6px" }}
      >
        {regFieldErrors[field]}
      </div>
    ) : null;
  const updateRegField = (field: keyof typeof regData, value: string) => {
    setRegData((current) => ({ ...current, [field]: value }));
    setRegFieldErrors((current) => ({ ...current, [field]: "" }));
  };

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setLoginError("");
    const nextErrors: Record<string, string> = {};
    const cleanLoginId = loginId.trim();
    if (!isNotEmptyString(cleanLoginId)) {
      nextErrors.loginId = "Email or phone number is required.";
    } else if (
      cleanLoginId.includes("@")
        ? !isValidEmail(cleanLoginId)
        : !isValidPhone(cleanLoginId)
    ) {
      nextErrors.loginId = cleanLoginId.includes("@")
        ? "Please enter a valid email."
        : "Please enter a valid phone number.";
    }
    if (!isNotEmptyString(loginPass)) {
      nextErrors.loginPass = "Password is required.";
    }
    setLoginFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    const res = login(cleanLoginId, loginPass);
    setIsSubmitting(false);
    if (!res.success) {
      setLoginError(res.message || "Login failed.");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setRegError("");

    const {
      companyName,
      contactPerson,
      phone,
      email,
      gstNo,
      state,
      city,
      password,
      address,
    } = regData;

    const nextErrors: Record<string, string> = {};
    const requiredFields: Array<[string, string, string]> = [
      ["companyName", companyName, "Company name is required."],
      ["address", address, "Address is required."],
      ["city", city, "City is required."],
      ["gstNo", gstNo, "GST number is required."],
      ["contactPerson", contactPerson, "Full name is required."],
      ["phone", phone, "Mobile number is required."],
      ["email", email, "Email is required."],
      ["password", password, "Password is required."],
    ];
    requiredFields.forEach(([field, value, message]) => {
      if (!isNotEmptyString(value)) nextErrors[field] = message;
    });
    if (isNotEmptyString(email) && !isValidEmail(email))
      nextErrors.email = "Please enter a valid email.";
    if (isNotEmptyString(phone) && !isValidPhone(phone))
      nextErrors.phone = "Please enter a valid mobile number.";
    if (isNotEmptyString(password) && password.length < 6)
      nextErrors.password = "Password must be at least 6 characters long.";
    if (
      isNotEmptyString(password) &&
      !/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/`~]/.test(password)
    )
      nextErrors.password =
        "Password must contain at least one special character.";
    setRegFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    const res = register({
      companyName,
      contactPerson,
      phone,
      email,
      gstNo,
      state,
      city,
      password,
      address,
    });
    setIsSubmitting(false);
    if (!res.success) {
      setRegError(res.message || "Registration failed.");
    }
  };

  return (
    <div className="modal-overlay open" id="authModal" onClick={closeAuthModal}>
      <div
        className="modal-card auth-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={closeAuthModal}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="auth-modal-header">
          <div className="auth-modal-badge">Siddhi Eshop Customer Portal</div>
          <h3 className="auth-modal-title" id="authModalTitle">
            {authModalTab === "register"
              ? "Create Customer Account"
              : "Sign In to Your Account"}
          </h3>


          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${authModalTab === "login" ? "active" : ""}`}
              onClick={() => {
                setAuthModalTab("login");
                setLoginError("");
              }}
            >
              Sign In (Login)
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${authModalTab === "register" ? "active" : ""}`}
              onClick={() => {
                setAuthModalTab("register");
                setRegError("");
              }}
            >
              Create Customer Account
            </button>
          </div>
        </div>

        <div className="auth-modal-body">
          {currentUser ? (
             <div className="auth-signed-in" style={{ padding: "40px 20px", textAlign: "center" }}>
               <ShieldCheck size={48} style={{ margin: "0 auto 15px", color: "var(--primary)" }} />
               <h3 style={{ marginBottom: "10px", fontSize: "1.2rem", fontWeight: "bold" }}>You are already signed in</h3>
               <p style={{ marginBottom: "24px", fontSize: "0.9rem", color: "#666" }}>
                 Signed in as {currentUser.contactPerson}
               </p>
               <button
                 type="button"
                 className="btn"
                 onClick={() => {
                   logout();
                   closeAuthModal();
                 }}
                 style={{ width: "100%", padding: "12px", fontWeight: "bold", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
               >
                 Sign Out
               </button>
             </div>
          ) : (
            <>
              {/* LOGIN FORM */}
              {authModalTab === "login" && (
                <form className="auth-form active" onSubmit={handleLoginSubmit}>
              {loginError && (
                <div className="auth-alert" style={{ display: "block" }}>
                  {loginError}
                </div>
              )}

              <div className="auth-field-group">
                <label>Phone Number or Business Email ID *</label>
                <div className="auth-input-wrap">
                  <Phone size={16} className="auth-field-icon" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 98920000947 or name@company.com"
                    value={loginId}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      const value = /[A-Za-z@]/.test(rawValue)
                        ? rawValue
                        : rawValue.replace(/\D/g, "").slice(0, 10);
                      setLoginId(value);
                      setLoginFieldErrors((current) => ({
                        ...current,
                        loginId: "",
                      }));
                    }}
                  />
                </div>
                {loginFieldErrors.loginId && (
                  <div
                    className="auth-alert"
                    role="alert"
                    aria-live="polite"
                    style={{ display: "block", marginTop: "6px" }}
                  >
                    {loginFieldErrors.loginId}
                  </div>
                )}
              </div>

              <div className="auth-field-group auth-inline-caption">
                <div className="auth-subtext">
                  Login using your registered Phone No. or Email ID
                </div>
              </div>

              <div className="auth-field-group">
                <label>Password *</label>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-field-icon" />
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={loginPass}
                    onChange={(e) => {
                      setLoginPass(e.target.value);
                      setLoginFieldErrors((current) => ({
                        ...current,
                        loginPass: "",
                      }));
                    }}
                  />
                </div>
                {loginFieldErrors.loginPass && (
                  <div
                    className="auth-alert"
                    role="alert"
                    aria-live="polite"
                    style={{ display: "block", marginTop: "6px" }}
                  >
                    {loginFieldErrors.loginPass}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="auth-primary-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SIGNING IN..." : "SIGN IN & CONTINUE"}
              </button>

              <div
                className="auth-form-switch"
                style={{ marginTop: "12px", textAlign: "center" }}
              >
                <span>New customer or industrial enterprise? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalTab("register");
                    setRegError("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--primary)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Create Account Now &rarr;
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {authModalTab === "register" && (
            <form className="auth-form active" onSubmit={handleRegisterSubmit}>
              {regError && (
                <div className="auth-alert" style={{ display: "block" }}>
                  {regError}
                </div>
              )}

              <div className="auth-section-divider">
                <span className="auth-section-tag">
                  1. Company details &amp; tax information
                </span>
              </div>

              <div className="auth-grid-company-top">
                <div className="auth-field-group">
                  <label>Company Name *</label>
                  <div className="auth-input-wrap">
                    <Building size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      required
                      aria-invalid={Boolean(regFieldErrors.companyName)}
                      placeholder="e.g. Acme Automation Pvt Ltd"
                      value={regData.companyName}
                      onChange={(e) =>
                        updateRegField("companyName", e.target.value)
                      }
                    />
                  </div>
                  {renderRegError("companyName")}
                </div>

                <div className="auth-field-group">
                  <label>Address * (Building, Street, Industrial Area)</label>
                  <div className="auth-input-wrap">
                    <MapPin size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      required
                      aria-invalid={Boolean(regFieldErrors.address)}
                      placeholder="e.g. Plot No. 42, Peenya Industrial Area 2nd Phase"
                      value={regData.address}
                      onChange={(e) =>
                        updateRegField("address", e.target.value)
                      }
                    />
                  </div>
                  {renderRegError("address")}
                </div>
              </div>

              <div className="auth-grid-company-bottom">
                <div className="auth-field-group">
                  <label>City *</label>
                  <div className="auth-input-wrap">
                    <MapPin size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      required
                      aria-invalid={Boolean(regFieldErrors.city)}
                      placeholder="e.g. Bangalore, Chennai, Pune"
                      value={regData.city}
                      onChange={(e) => updateRegField("city", e.target.value)}
                    />
                  </div>
                  {renderRegError("city")}
                </div>

                <div className="auth-field-group">
                  <label>State *</label>
                  <select
                    className="auth-select"
                    value={regData.state}
                    onChange={(e) => updateRegField("state", e.target.value)}
                  >
                    <option value="Karnataka">-- Select State / UT --</option>
                    <option value="Karnataka">Karnataka (29)</option>
                    <option value="Tamil Nadu">Tamil Nadu (33)</option>
                    <option value="Maharashtra">Maharashtra (27)</option>
                    <option value="Telangana">Telangana (36)</option>
                    <option value="Andhra Pradesh">Andhra Pradesh (37)</option>
                    <option value="Gujarat">Gujarat (24)</option>
                    <option value="Delhi">Delhi (07)</option>
                    <option value="Haryana">Haryana (06)</option>
                    <option value="Other">Other States</option>
                  </select>
                </div>

                <div className="auth-field-group col-gst">
                  <label>GST No *</label>
                  <div className="auth-input-wrap">
                    <ShieldCheck size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      required
                      aria-invalid={Boolean(regFieldErrors.gstNo)}
                      maxLength={15}
                      placeholder="E.g. 29ABCDEF1234F1Z5"
                      value={regData.gstNo}
                      onChange={(e) =>
                        updateRegField("gstNo", e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  {renderRegError("gstNo")}
                </div>
              </div>

              <div className="auth-section-divider">
                <span className="auth-section-tag">
                  2. Authorized contact person &amp; login details
                </span>
              </div>

              <div className="auth-grid-3col">
                <div className="auth-field-group">
                  <label>Contact Person Name *</label>
                  <div className="auth-input-wrap">
                    <User size={16} className="auth-field-icon" />
                    <input
                      type="text"
                      required
                      aria-invalid={Boolean(regFieldErrors.contactPerson)}
                      placeholder="e.g. Ramesh Kumar"
                      value={regData.contactPerson}
                      onChange={(e) =>
                        updateRegField("contactPerson", e.target.value)
                      }
                    />
                  </div>
                  {renderRegError("contactPerson")}
                </div>

                <div className="auth-field-group">
                  <label>Phone Number * (Login ID)</label>
                  <div className="auth-input-wrap">
                    <Phone size={16} className="auth-field-icon" />
                    <input
                      type="tel"
                      required
                      aria-invalid={Boolean(regFieldErrors.phone)}
                      maxLength={10}
                      inputMode="numeric"
                      placeholder="e.g. 9820000947"
                      value={regData.phone}
                      onChange={(e) =>
                        updateRegField(
                          "phone",
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                    />
                  </div>
                  {renderRegError("phone")}
                </div>

                <div className="auth-field-group">
                  <label>Email ID * (Login ID)</label>
                  <div className="auth-input-wrap">
                    <Mail size={16} className="auth-field-icon" />
                    <input
                      type="email"
                      required
                      aria-invalid={Boolean(regFieldErrors.email)}
                      placeholder="name@company.com"
                      value={regData.email}
                      onChange={(e) => updateRegField("email", e.target.value)}
                    />
                  </div>
                  {renderRegError("email")}
                </div>
              </div>

              <div className="auth-section-divider">
                <span className="auth-section-tag">
                  3. Account security password
                </span>
              </div>

              <div className="auth-grid-password">
                <div className="auth-field-group">
                  <label>Set Password *</label>
                  <div className="auth-input-wrap">
                    <Lock size={16} className="auth-field-icon" />
                    <input
                      type="password"
                      required
                      aria-invalid={Boolean(regFieldErrors.password)}
                      placeholder="Enter a secure password"
                      value={regData.password}
                      onChange={(e) => {
                        updateRegField("password", e.target.value);
                        setRegFieldErrors((current) => ({
                          ...current,
                          confirmPassword: "",
                        }));
                      }}
                    />
                  </div>
                  {renderRegError("password")}
                </div>

                <div className="password-note-box">
                  <ShieldCheck size={16} />
                  <span>
                    Requires min. 6 characters &amp; 1 special character. Use
                    Phone No or Email to login.
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="auth-primary-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </button>

              <div
                className="auth-form-switch"
                style={{ marginTop: "10px", textAlign: "center" }}
              >
                <span>Already registered? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalTab("login");
                    setLoginError("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--primary)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sign In &rarr;
                </button>
              </div>
            </form>
          )}
          </>
          )}
        </div>
      </div>
    </div>
  );
};
