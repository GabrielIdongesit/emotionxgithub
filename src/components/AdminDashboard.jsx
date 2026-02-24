import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";



const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [activeSlice, setActiveSlice] = useState(null);
  const [receiptOrder, setReceiptOrder] = useState(null); // For receipt modal
  const [activeTab, setActiveTab] = useState("orders"); // Tab switcher
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    type: "bike"
  });

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);

    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  const navigate = useNavigate();

const adminLogout = () => {
  localStorage.removeItem("isAdmin");
  navigate("/admin-dashboard");
};

const adminLogin = () => {
  localStorage.removeItem("isAdmin");
  navigate("/admin-dashboard");
};


  // ===== CALCULATIONS =====
  const totalRevenue = orders.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalOrders = orders.length;
  const totalProductsSold = orders.reduce((sum, item) => sum + item.qty, 0);
  const totalUsers = users.length;

  // ===== SALES BY DATE (BAR CHART) =====
  const salesDataMap = {};
  orders.forEach(order => {
    const date = new Date(order.date).toLocaleDateString();
    if (!salesDataMap[date]) salesDataMap[date] = 0;
    salesDataMap[date] += order.price * order.qty;
  });
  const barChartData = Object.keys(salesDataMap).map(date => ({
    date,
    sales: salesDataMap[date]
  }));

  // ===== PRODUCT REVENUE (PIE CHART) =====
  const productRevenueMap = {};
  orders.forEach(order => {
    if (!productRevenueMap[order.name]) productRevenueMap[order.name] = 0;
    productRevenueMap[order.name] += order.price * order.qty;
  });
  const pieData = Object.entries(productRevenueMap).map(([name, revenue]) => ({
    name,
    revenue
  }));
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

  // ===== TOP PRODUCTS =====
  const topProducts = Object.entries(productRevenueMap)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // ===== CLEAR ORDERS =====
<button
  onClick={adminLogout}
  className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
>
  Logout
</button>




  const clearOrders = () => {
    if (window.confirm("Clear all orders?")) {
      localStorage.removeItem("orders");
      setOrders([]);
      setFilteredProduct(null);
      setActiveSlice(null);
    }
  };

  // ===== FILTERED ORDERS =====
  const displayedOrders = filteredProduct
    ? orders.filter(order => order.name === filteredProduct)
    : orders;

  // ===== HANDLE PIE SLICE CLICK =====
  const handleSliceClick = (entry) => {
    if (filteredProduct === entry.name) {
      setFilteredProduct(null);
      setActiveSlice(null);
    } else {
      setFilteredProduct(entry.name);
      setActiveSlice(entry.name);
    }
  };

  // ===== PIE TOOLTIP WITH PERCENTAGE =====
  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, revenue } = payload[0].payload;
      const percent = ((revenue / totalRevenue) * 100).toFixed(2);
      return (
        <div className="bg-white p-2 border shadow rounded">
          <p className="font-semibold">{name}</p>
          <p>Revenue: ${revenue.toFixed(2)}</p>
          <p>Contribution: {percent}%</p>
        </div>
      );
    }
    return null;
  };

  // ===== MARK AS PAID & GENERATE RECEIPT =====
  const generateReceipt = (order) => {
    const updatedOrders = orders.map(o =>
      o.id === order.id ? { ...o, paid: true } : o
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setReceiptOrder(order);
  };

  // ===== SHARE / DOWNLOAD RECEIPT (WHATSAPP IMPLEMENTED) =====
  const shareReceipt = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("E-MOTIONX Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Product: ${order.name}`, 20, 40);
    doc.text(`Quantity: ${order.qty}`, 20, 50);
    doc.text(`Price per item: $${order.price}`, 20, 60);
    doc.text(`Total: $${(order.price * order.qty).toFixed(2)}`, 20, 70);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 20, 80);
    doc.text("Payment Received ✅", 20, 100);

    const fileName = `Receipt_${order.name}_${order.id}.pdf`;
    doc.save(fileName);

    const whatsappMessage = `
Hello 👋

Here is your receipt from E-MOTIONX.

Product: ${order.name}
Quantity: ${order.qty}
Total Paid: $${(order.price * order.qty).toFixed(2)}
Date: ${new Date(order.date).toLocaleDateString()}

Thank you for your purchase 🙏
`;

    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, "_blank");
  };

  // ===== PRODUCT MANAGEMENT FUNCTIONS =====
  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p =>
        p.id === editingProduct.id
          ? { ...p, ...formData }
          : p
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        ...formData,
        image: "https://via.placeholder.com/300"
      };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }

    // Notify other components of the change
    window.dispatchEvent(new Event("productsUpdated"));

    // Reset form
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      type: "bike"
    });
    setShowAddProduct(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      type: product.type
    });
    setShowAddProduct(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      window.dispatchEvent(new Event("productsUpdated"));
    }
  };

  const handleCloseForm = () => {
    setShowAddProduct(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      type: "bike"
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={adminLogin}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
        >
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 bg-white p-2 rounded shadow">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded font-semibold transition ${
            activeTab === "orders"
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Orders & Analytics
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded font-semibold transition ${
            activeTab === "products"
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Manage Products
        </button>
      </div>

      {/* ===== ORDERS & ANALYTICS TAB ===== */}
      {activeTab === "orders" && (
        <>
      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} color="text-green-600" />
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Products Sold" value={totalProductsSold} />
        <StatCard title="Total Users Logged In" value={totalUsers} color="text-blue-600" />
      </div>

      {/* ===== SALES BAR CHART ===== */}
      <div className="bg-white mt-10 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Sales Overview (Bar Chart)</h2>
        {barChartData.length === 0 ? (
          <p className="text-gray-500">No sales data yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Bar dataKey="sales" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ===== PRODUCT DISTRIBUTION PIE CHART ===== */}
      <div className="bg-white mt-10 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Top Product Revenue (Click to Filter)</h2>
        {pieData.length === 0 ? (
          <p className="text-gray-500">No product data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="revenue"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                onClick={handleSliceClick}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    cursor="pointer"
                    stroke={activeSlice === entry.name ? "#000" : "#fff"}
                    strokeWidth={activeSlice === entry.name ? 4 : 1}
                  />
                ))}
              </Pie>
              <Tooltip content={PieTooltip} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ===== ORDERS TABLE WITH RECEIPT ===== */}
      <div className="bg-white mt-10 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          {filteredProduct ? `Recent Orders for "${filteredProduct}"` : "Recent Orders"}
        </h2>

        {displayedOrders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Product</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedOrders.slice(-10).reverse().map((order, index) => (
                  <tr key={index} className="border-b text-sm">
                    <td className="p-2">{order.name}</td>
                    <td className="p-2">{order.qty}</td>
                    <td className="p-2">${order.price}</td>
                    <td className="p-2 font-semibold">
                      ${(order.price * order.qty).toFixed(2)}
                    </td>
                    <td className="p-2">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      {order.paid ? "Paid" : "Pending"}
                    </td>
                    <td className="p-2">
                      {!order.paid && (
                        <button
                          onClick={() => generateReceipt(order)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Mark as Paid & Generate Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===== RECEIPT MODAL ===== */}
      {receiptOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">Receipt</h2>
            <p><strong>Product:</strong> {receiptOrder.name}</p>
            <p><strong>Qty:</strong> {receiptOrder.qty}</p>
            <p><strong>Price per item:</strong> ${receiptOrder.price}</p>
            <p><strong>Total:</strong> ${(receiptOrder.price * receiptOrder.qty).toFixed(2)}</p>
            <p><strong>Date:</strong> {new Date(receiptOrder.date).toLocaleDateString()}</p>
            <p className="mt-2 text-green-600 font-bold">Payment Received ✅</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => shareReceipt(receiptOrder)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Share / Download Receipt
              </button>
              <button
                onClick={() => setReceiptOrder(null)}
                className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== TOP PRODUCTS ===== */}
      <div className="bg-white mt-10 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
        {topProducts.length === 0 ? (
          <p className="text-gray-500">No product data</p>
        ) : (
          <ul className="space-y-2">
            {topProducts.map((item, index) => (
              <li
                key={index}
                className="flex justify-between bg-gray-100 p-3 rounded cursor-pointer"
                onClick={() => handleSliceClick(item)}
              >
                <span>{item.name}</span>
                <span className="font-bold">${item.revenue.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
        </>
      )}

      {/* ===== PRODUCTS MANAGEMENT TAB ===== */}
      {activeTab === "products" && (
        <div className="space-y-6">
          {/* Add/Edit Product Button */}
          {!showAddProduct && (
            <button
              onClick={() => {
                setShowAddProduct(true);
                setEditingProduct(null);
                setFormData({ name: "", price: "", category: "", description: "", type: "bike" });
              }}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded font-semibold"
            >
              + Add New Product
            </button>
          )}

          {/* Add/Edit Product Form */}
          {showAddProduct && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="border p-2 rounded"
                />
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="border p-2 rounded"
                >
                  <option value="bike">Bike</option>
                  <option value="spare">Spare Part</option>
                </select>
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border p-2 rounded md:col-span-2"
                  rows="3"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAddProduct}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
                <button
                  onClick={handleCloseForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">All Products ({products.length})</h2>
            {products.length === 0 ? (
              <p className="text-gray-500">No products yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="p-2">Product Name</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">Price</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">Description</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-semibold">{product.name}</td>
                        <td className="p-2">{product.category}</td>
                        <td className="p-2">${product.price}</td>
                        <td className="p-2 capitalize">{product.type}</td>
                        <td className="p-2 text-sm text-gray-700">{product.description}</td>
                        <td className="p-2 space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ===== STAT CARD =====
const StatCard = ({ title, value, color = "text-black" }) => (
  <div className="bg-white shadow p-4 rounded">
    <p className="text-gray-500">{title}</p>
    <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
  </div>
);

export default AdminDashboard;
