import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import Title from "../components/Title";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const { navigate } = useContext(ShopContext);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/api/user/profile");
      if (response.data.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
        toast.error("Name and Email cannot be empty");
        setFormData({ name: userData.name, email: userData.email });
        setIsEditing(false);
        return;
    }
    try {
      const response = await axiosInstance.post("/api/user/update", formData);
      if (response.data.success) {
        setUserData(response.data.user);
        setIsEditing(false);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const getCartTotal = (cart) => {
    if (!cart) return 0;
    let total = 0;

    Object.values(cart).forEach((sizes) => {
      Object.values(sizes).forEach((qty) => {
        total += qty;
      });
    });
    return total;
  };

  if (!userData) return <div className="p-10 text-center">User not found.</div>;

  return (
    <div className="border-t pt-10">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"PROFILE"} />
      </div>

      <div className="flex flex-col md:flex-row gap-10 bg-white p-8 border border-gray-200 shadow-sm">
        <div className="flex flex-col items-center gap-4 border-r pr-10 border-gray-100">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold text-gray-400">
            {userData.name.charAt(0).toUpperCase()}
          </div>
          <p className="text-xs text-gray-400 font-medium">
            RANK: SILVER MEMBER
          </p>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Account Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Username</p>
                {isEditing ? (
                  <input
                    type="text"
                    className="border border-gray-300 rounded px-2 py-1 w-full mt-1 outline-none focus:border-black"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                ) : (
                  <p className="font-medium text-gray-700 mt-1">
                    {userData.name}
                  </p>
                )}
              </div>
              <div>
                <p className="text-gray-400">Email Address</p>
                {isEditing ? (
                  <input
                    type="email"
                    className="border border-gray-300 rounded px-2 py-1 w-full mt-1 outline-none focus:border-black"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                ) : (
                  <p className="font-medium text-gray-700 mt-1">
                    {userData.email}
                  </p>
                )}
              </div>
              <div>
                <p className="text-gray-400">User ID</p>
                <p className="font-mono text-xs bg-gray-50 p-1 inline-block mt-1">
                  {userData._id}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Security Status</p>
                <p className="text-green-600 flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Password Encrypted
                </p>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Shopping Activity
            </h2>
            <div
              onClick={() => navigate("/cart")}
              className="cursor-pointer bg-blue-50 border border-blue-100 p-4 rounded-sm flex justify-between items-center max-w-xs hover:bg-blue-100 transition-all"
            >
              <div>
                <p className="text-blue-800 font-medium">Items in Cart</p>
                <p className="text-xs text-blue-600">Click to view items</p>
              </div>
              <span className="text-2xl font-bold text-blue-800">
                {getCartTotal(userData.cartData)}
              </span>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdateProfile}
                  className="bg-black text-white px-8 py-2 text-sm active:bg-gray-700 transition-all"
                >
                  SAVE CHANGES
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 px-8 py-2 text-sm hover:bg-gray-50 transition-all"
                >
                  CANCEL
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-black text-white px-8 py-2 text-sm active:bg-gray-700 transition-all"
              >
                EDIT PROFILE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
