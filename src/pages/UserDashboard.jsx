import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const mockOrders = [
  {
    id: 1,
    restaurant: "Spicy Rooster Grill",
    date: "2025-06-15",
    items: ["Chicken Biryani", "Tandoori Chicken", "Egg Curry"],
    total: 590,
    status: "Delivered",
    img: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?h=120&w=120&fit=crop",
  },
  {
    id: 2,
    restaurant: "Fish N Fry",
    date: "2025-06-11",
    items: ["Fish Tikka", "Prawn Masala"],
    total: 440,
    status: "On the way",
    img: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?h=120&w=120&fit=crop",
  },
  {
    id: 3,
    restaurant: "Eggsplore",
    date: "2025-06-02",
    items: ["Double Egg Roll", "Chicken Omelette"],
    total: 250,
    status: "Cancelled",
    img: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?h=120&w=120&fit=crop",
  },
];

const PURE_RED = "#ff0000";
const PURE_RED_HOVER = "#cc0000";
const PURE_RED_BG = "#fff5f5";

// Profile Snapshot Component
const ProfileSnapshot = ({ userDetails }) => {
  if (!userDetails) {
    return (
      <div className="bg-[#fff5f5] rounded-xl shadow-md p-8 mb-6 flex items-center min-h-[160px]">
        <span className="text-[#ff0000] text-lg font-semibold">Loading profile...</span>
      </div>
    );
  }

  // Fallback fields if missing
  const {
    name = "—",
    email = "—",
    mobile = "—",
    role = "—",
    status = "Active",
    lastLogin = null,
  } = userDetails;

  // Format last login date if available
  let lastLoginDisplay = "—";
  if (userDetails.lastLogin) {
    try {
      const dt = new Date(userDetails.lastLogin);
      lastLoginDisplay =
        dt.toLocaleDateString() + ", " + dt.toLocaleTimeString();
    } catch {
      lastLoginDisplay = userDetails.lastLogin;
    }
  }

  return (
    <div
      className="bg-[#fff5f5] rounded-xl shadow-md p-8 mb-6 flex flex-col"
      style={{
        border: "1.5px solid #ffecec",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: PURE_RED, fontSize: 26 }}>
          <svg
            width="29"
            height="29"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            style={{
              verticalAlign: "middle",
              marginRight: 6,
              display: "inline-block",
            }}
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
          </svg>
        </span>
        <span className="text-2xl sm:text-[1.6rem] font-[600] text-[#d12c2c] tracking-wide">
          Profile Snapshot
        </span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        <div>
          <div className="mb-2">
            <span className="font-semibold">Name:</span> {name}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Mobile:</span> {mobile}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Role:</span> {role}
          </div>
        </div>
        <div>
          <div className="mb-2">
            <span className="font-semibold">Email:</span> {email}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Status:</span>{" "}
            <span
              style={{
                background: "#e6f7ec",
                color: "#1eab60",
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 5,
                padding: "2px 10px",
                verticalAlign: "middle",
              }}
            >
              {status}
            </span>
          </div>
          <div>
            <span className="font-semibold">Last Login:</span>{" "}
            {lastLoginDisplay}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    address_name: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const [userDetails, setUserDetails] = useState(null);
  const [activeSection, setActiveSection] = useState("My Profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders] = useState(mockOrders);
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie;
    const tokenMatch = cookies.match(/accessToken=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      console.warn("No access token found in cookies");
      return;
    }

    fetch("/api/users/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data) {
          setUserDetails(data.data);
        } else {
          console.warn("Invalid user data response", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
      });
  }, []);

  const handleAdd = async () => {
    const isEmpty = Object.values(newAddress).some((value) => !value.trim());
    if (isEmpty) return;

    try {
      const res = await fetch("/api/user/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newAddress),
      });

      if (!res.ok) {
        throw new Error(`Failed to add address: ${res.status}`);
      }

      setAddresses((prev) => [
        ...prev,
        {
          ...newAddress,
          id: Date.now(),
          isActive: prev.length === 0,
        },
      ]);
      setNewAddress({
        address_name: "",
        address_line: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      });
    } catch (err) {
      console.error("Failed to add address:", err);
    }
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleEdit = (id) => {
    alert("Edit functionality not implemented in this demo.");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const sidebarSections = [
    {
      title: "PROFILE",
      items: ["My Profile"],
    },
    {
      title: "ONLINE ORDERING",
      items: ["My addresses", "Order history"],
    },
    {
      title: "PAYMENTS",
      items: ["Manage Cards"],
    },
  ];

  return (
    <div className="min-h-screen w-full flex bg-white font-['Inter','Poppins',sans-serif]">
      {/* Mobile Hamburger */}
      <div className="md:hidden absolute top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            borderColor: PURE_RED,
            color: PURE_RED,
            background: "#fff",
          }}
          className="p-2 rounded-md border shadow-sm focus:outline-none"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 bg-white border-r border-gray-200 flex flex-col gap-4 transition-all duration-300 min-w-[70vw] max-w-[85vw] p-6 shadow-2xl md:relative md:min-w-[320px] md:max-w-[350px] md:py-10 md:px-6 md:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex md:hidden justify-end mb-3">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded hover:bg-[#fff5f5]"
            style={{ color: PURE_RED, background: "#fff" }}
            aria-label="Close sidebar"
          >
            <svg
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {sidebarSections.map((section) => (
          <div key={section.title} className="mb-2">
            <div className="mb-3 ml-1 tracking-widest text-gray-500 font-semibold text-sm uppercase">
              {section.title}
            </div>
            {section.items.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setActiveSection(item);
                  setSidebarOpen(false);
                }}
                className={`rounded-lg px-4 py-3 mb-1 cursor-pointer transition ${
                  activeSection === item
                    ? "font-semibold relative bg-[#fff5f5] text-[#ff0000] border-l-[3.5px] border-[#ff0000]"
                    : "text-[#232323] hover:bg-gray-100"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        ))}

        <div className="grow" />
        <button
          onClick={handleLogout}
          style={{
            background: PURE_RED,
            color: "#fff",
          }}
          className="w-full font-bold px-4 py-2 rounded-xl transition hover:bg-[#cc0000]"
        >
          Logout
        </button>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 pt-14 px-4 sm:px-6 md:px-12 pb-8">
        <h1 className="text-[2rem] sm:text-[2.5rem] font-semibold mb-5 text-[#232323]">
          {activeSection}
        </h1>

        {activeSection === "My Profile" && (
          <ProfileSnapshot userDetails={userDetails} />
        )}

        {activeSection === "My addresses" && (
          <div className="flex flex-wrap gap-5 sm:gap-7 md:gap-8">
            {/* Add Address Card */}
            <div className="w-full max-w-[350px] min-h-[340px] bg-white border border-[#f3f3f3] rounded-[13px] flex flex-col items-center pt-7 px-5 pb-6 shadow-sm hover:shadow-md transition mx-auto sm:mx-0">
              <span style={{ color: PURE_RED }} className="text-[2.4rem] mb-2">
                ＋
              </span>
              <span className="text-[#232323] text-xl font-medium mb-5">
                Add address
              </span>
              <div className="w-full flex flex-col gap-2">
                {["address_name", "address_line", "city", "state", "pincode", "country"].map((field, i) => (
                  <input
                    key={i}
                    className="border border-[#eee] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ff0000] placeholder-[#bdbdbd] bg-[#fafafa]"
                    placeholder={
                      {
                        address_name: "Name (Home/Work)",
                        address_line: "Address Line",
                        city: "City",
                        state: "State",
                        pincode: "Pincode",
                        country: "Country",
                      }[field]
                    }
                    value={newAddress[field]}
                    onChange={(e) =>
                      setNewAddress((prev) => ({ ...prev, [field]: e.target.value }))
                    }
                  />
                ))}
                <button
                  onClick={handleAdd}
                  disabled={Object.values(newAddress).some((v) => !v.trim())}
                  style={{
                    background: PURE_RED,
                    color: "#fff",
                  }}
                  className="mt-2 font-semibold py-2 rounded-lg transition hover:bg-[#cc0000]"
                >
                  Add address
                </button>
              </div>
            </div>

            {/* Existing Address Cards */}
            {addresses.map((address) => (
              <div
                key={address.id}
                className="w-full max-w-[350px] min-h-[220px] bg-white border border-[#f3f3f3] rounded-[13px] shadow-sm flex flex-col justify-between px-5 py-7 mx-auto sm:mx-0"
              >
                <div>
                  <div className="font-semibold text-xl text-[#232323] mb-2">
                    {address.address_name}
                  </div>
                  <div className="text-[#232323] text-base leading-snug mb-3 break-words">
                    {address.address_line}
                    {address.city && `, ${address.city}`}
                    {address.state && `, ${address.state}`}
                    {address.pincode && ` - ${address.pincode}`}
                    {address.country && `, ${address.country}`}
                  </div>
                </div>
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => handleEdit(address.id)}
                    className="text-[#ff0000] font-medium hover:underline"
                  >
                    Edit <span className="text-[1.3em]">›</span>
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="text-[#b7b7b7] font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Order History section */}
        {activeSection === "Order history" && (
          <div className="w-full flex flex-col gap-6 max-w-3xl mx-auto">
            {orders.length === 0 ? (
              <div className="text-center text-[#b7b7b7] text-lg">No past orders found.</div>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-[#f3f3f3] rounded-[13px] px-6 py-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={order.img}
                        alt={order.restaurant}
                        className="w-16 h-16 object-cover rounded-lg border border-[#eee] hidden sm:block"
                      />
                      <div>
                        <div className="font-bold text-lg text-[#232323] mb-1">
                          {order.restaurant}
                        </div>
                        <div
                          className="text-sm mb-1 font-medium"
                          style={{
                            color:
                              order.status === "Delivered"
                                ? "#16a34a"
                                : order.status === "Cancelled"
                                ? "#ef4444"
                                : PURE_RED,
                          }}
                        >
                          {order.status}
                        </div>
                        <div className="text-[#555] text-sm mb-1">
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                        <div className="text-[#232323] text-sm mb-2">
                          Items:{" "}
                          <span className="font-medium">
                            {order.items.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 ml-auto">
                      <span className="text-[#232323] text-lg font-bold">
                        ₹{order.total}
                      </span>
                      <button
                        style={{
                          border: `1px solid ${PURE_RED}`,
                          color: PURE_RED,
                        }}
                        className="px-4 py-1 rounded-md font-medium text-sm hover:bg-[#fff5f5] transition"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Global styles */}
      <style>{`
        html, body, #root {
          font-family: 'Inter', 'Poppins', sans-serif;
        }

        @media (max-width: 768px) {
          aside {
            min-width: 70vw !important;
            max-width: 85vw !important;
            padding: 1.5rem !important;
          }
        }

        @media (max-width: 640px) {
          main > div {
            flex-direction: column !important;
            align-items: stretch !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;