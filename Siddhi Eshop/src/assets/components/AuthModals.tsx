import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const AuthModals: React.FC = () => {
  const {
    currentUser,
    authModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    accountModalOpen,
    closeAccountModal,
    login,
    register,
    logout,
    userOffers,
  } = useAuth();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Register form state
  const [regCompany, setRegCompany] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regState, setRegState] = useState("");
  const [regGst, setRegGst] = useState("");
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(loginId, password);
    if (!res.success) {
      setErrorMsg(res.message || "Login failed");
    } else {
      setErrorMsg("");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = register({
      companyName: regCompany,
      address: regAddress,
      city: regCity,
      state: regState,
      gstNo: regGst,
      contactPerson: regName,
      phone: regPhone,
      email: regEmail,
      password: regPassword,
    });
    if (!res.success) {
      setErrorMsg(res.message || "Registration failed");
    } else {
      setErrorMsg("");
    }
  };

  return (
    <>
      {/* --- AUTH / LOGIN MODAL --- */}
      {authModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-800 relative">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
            >
              ✕
            </button>

            <div className="p-6 border-b border-slate-800">
              <span className="text-[10px] text-red-500 font-extrabold uppercase tracking-widest">
                SIDDHI ESHOP CUSTOMER PORTAL
              </span>
              <h2 className="text-xl font-black mt-1">
                Sign In to Your Account
              </h2>


              <div className="flex gap-6 mt-4 border-b border-slate-800 text-xs font-bold">
                <button
                  onClick={() => setAuthModalTab("login")}
                  className={`pb-2 border-b-2 transition-colors ${authModalTab === "login" ? "border-red-600 text-white" : "border-transparent text-slate-400 hover:text-slate-200"}`}
                >
                  Sign In (Login)
                </button>
                <button
                  onClick={() => setAuthModalTab("register")}
                  className={`pb-2 border-b-2 transition-colors ${authModalTab === "register" ? "border-red-600 text-white" : "border-transparent text-slate-400 hover:text-slate-200"}`}
                >
                  Create Customer Account
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto">
              {currentUser ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-bold mb-2">You are already signed in</h3>
                  <p className="text-slate-400 mb-6">
                    Signed in as {currentUser.contactPerson} ({currentUser.companyName})
                  </p>
                  <button
                    onClick={() => {
                      logout();
                      closeAuthModal();
                    }}
                    className="bg-red-700 hover:bg-red-800 text-white py-2 px-6 rounded-lg font-bold text-sm shadow transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  {errorMsg && (
                    <div className="bg-red-950/80 border border-red-800 text-red-200 text-xs p-3 rounded-lg mb-4">
                      {errorMsg}
                    </div>
                  )}

                  {authModalTab === "login" ? (
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Phone Number OR Business Email ID *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 09620000947 or name@company.com"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-600"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Login using your registered Phone No. or Email ID
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg font-bold text-sm shadow transition-colors mt-2"
                  >
                    SIGN IN & CONTINUE
                  </button>
                  <div className="text-center pt-2">
                    <span className="text-xs text-slate-400">
                      New customer or industrial enterprise?{" "}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAuthModalTab("register")}
                      className="text-red-500 hover:underline text-xs font-bold"
                    >
                      Create Account Now →
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  onSubmit={handleRegisterSubmit}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <span className="text-red-500 font-extrabold uppercase tracking-wider block mb-2">
                      1. Company Details & Tax Information
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Acme Automation Pvt Ltd"
                          value={regCompany}
                          onChange={(e) => setRegCompany(e.target.value)}
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          GST No *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 29ABCDE1234F1Z5"
                          value={regGst}
                          onChange={(e) => setRegGst(e.target.value)}
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="block font-bold text-slate-300 mb-1">
                        Address * (Building, Street, Industrial Area)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Plot No. 42, Peenya Industrial Area"
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Bangalore"
                          value={regCity}
                          onChange={(e) => setRegCity(e.target.value)}
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Karnataka"
                          value={regState}
                          onChange={(e) => setRegState(e.target.value)}
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-red-500 font-extrabold uppercase tracking-wider block mb-2">
                      2. Authorized Contact Person & Login Details
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          Contact Person Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Ramesh Kumar"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          Phone Number * (Login ID)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 09620000947"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-300 mb-1">
                          Email ID * (Login ID)
                        </label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-red-500 font-extrabold uppercase tracking-wider block mb-2">
                      3. Account Security Password
                    </span>
                    <label className="block font-bold text-slate-300 mb-1">
                      Set Password *
                    </label>
                    <input
                      type="password"
                      placeholder="Min. 6 characters with at least 1 special character"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg font-bold text-sm shadow transition-colors mt-4"
                  >
                    CREATE ACCOUNT
                  </button>
                  <div className="text-center pt-2">
                    <span className="text-slate-400">Already registered? </span>
                    <button
                      type="button"
                      onClick={() => setAuthModalTab("login")}
                      className="text-red-500 hover:underline font-bold"
                    >
                      Sign In →
                    </button>
                  </div>
                </form>
              )}
              </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- ACCOUNT DETAILS MODAL --- */}
      {accountModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative">
            <button
              onClick={closeAccountModal}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
            >
              ✕
            </button>

            {/* Header banner */}
            <div className="bg-slate-900 text-white p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white font-black text-lg shadow">
                {currentUser.companyName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-black">
                  {currentUser.companyName}
                </h3>
                <p className="text-xs text-slate-300">
                  {currentUser.contactPerson} • GSTIN:{" "}
                  <span className="font-mono">{currentUser.gstNo}</span>
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Contact Person
                  </span>
                  <p className="font-bold text-sm text-slate-800 mt-0.5">
                    {currentUser.contactPerson}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Registered Phone (Login ID)
                  </span>
                  <p className="font-bold text-sm text-slate-800 mt-0.5">
                    {currentUser.phone}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Email ID (Login ID)
                  </span>
                  <p className="font-bold text-sm text-slate-800 mt-0.5">
                    {currentUser.email}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    GST Number
                  </span>
                  <p className="font-bold text-sm text-slate-800 mt-0.5 font-mono">
                    {currentUser.gstNo}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Registered Address & State
                </span>
                <p className="font-bold text-sm text-slate-800 mt-0.5">
                  {currentUser.address}, {currentUser.city}, {currentUser.state}
                </p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-black text-slate-900 text-sm mb-2">
                  Your Sent Commercial Offers & RFQs
                </h4>
                {userOffers.length === 0 ? (
                  <p className="text-slate-500 bg-slate-50 p-4 rounded-lg text-center">
                    No offers or RFQs sent yet. Use the RFQ form to send a
                    commercial offer.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {userOffers.map((offer, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-3 rounded-lg border flex justify-between items-center"
                      >
                        <div>
                          <span className="font-bold text-red-700">
                            {offer.refNo}
                          </span>
                          <p className="text-slate-600">
                            {offer.category} • {offer.filesCount} items attached
                          </p>
                        </div>
                        <span className="text-slate-400 text-[11px]">
                          {offer.date}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t flex justify-between items-center">
              <button
                onClick={() => {
                  closeAccountModal();
                }}
                className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-lg font-bold text-xs shadow"
              >
                SEND NEW OFFER / RFQ
              </button>
              <button
                onClick={logout}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-5 py-2.5 rounded-lg font-bold text-xs transition-colors"
              >
                SIGN OUT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
