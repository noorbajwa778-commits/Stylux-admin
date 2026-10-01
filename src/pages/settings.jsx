import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../supabase.js";
import { setName } from "../redux/redux/Slices/HomeDataSlice.js";
import Header from "../components/header.jsx";
import { User } from "lucide-react";

export default function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.home.user);
  const storedName = useSelector((state) => state.home.name);

  const [nameInput, setNameInput] = useState(storedName || "");
  const [profileMsg, setProfileMsg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [notifications, setNotifications] = useState({
    newSalonRequests: true,
    newOrders: true,
    newReviews: false,
  });

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    dispatch(setName(nameInput));
    const { error } = await supabase
      .from("admin")
      .update({ name: nameInput })
      .eq("id", user.id);
    if (error) {
      console.log("Admin profile update error:", error);
    }
    setProfileMsg("Profile saved.");
  };

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      setPasswordMsg({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Passwords do not match." });
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPasswordMsg({ type: "error", text: error.message });
    } else {
      setPasswordMsg({ type: "success", text: "Password updated." });
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div>
      <Header title="Settings" subtitle="Manage your admin account" />

      <div className="px-8 pb-8 space-y-6 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Profile</h2>

          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink to-purple flex items-center justify-center text-white overflow-hidden">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Admin avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={28} />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-sm text-purple font-medium"
            >
              Upload photo
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          {profileMsg && (
            <p className="text-sm text-green-600 mt-3">{profileMsg}</p>
          )}

          <button
            onClick={handleSaveProfile}
            className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-pink to-purple text-white text-sm font-medium"
          >
            Save Changes
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Change Password</h2>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
              />
            </div>
          </div>

          {passwordMsg.text && (
            <p
              className={`text-sm mt-3 ${
                passwordMsg.type === "error" ? "text-red-500" : "text-green-600"
              }`}
            >
              {passwordMsg.text}
            </p>
          )}

          <button
            onClick={handleUpdatePassword}
            className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-pink to-purple text-white text-sm font-medium"
          >
            Update Password
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">
            Notification Preferences
          </h2>

          <div className="space-y-4">
            {[
              { key: "newSalonRequests", label: "New salon requests" },
              { key: "newOrders", label: "New order notifications" },
              { key: "newReviews", label: "New review alerts" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.label}</span>
                <button
                  onClick={() => toggleNotification(item.key)}
                  className={`w-11 h-6 rounded-full relative transition ${
                    notifications[item.key]
                      ? "bg-gradient-to-r from-pink to-purple"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                      notifications[item.key] ? "left-6" : "left-1"
                    }`}
                  ></span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}