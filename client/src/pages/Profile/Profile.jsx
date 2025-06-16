import { useState } from "react";
import { User, Mail, ImagePlus, Save, Pencil } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const Profile = () => {
  const { user, setUser, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser({ displayName: formData.name, photoURL: formData.photoURL })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully!",
          showConfirmButton: false,
          timer: 2000,
        });

        setUser({
          ...user,
          displayName: formData.name,
          photoURL: formData.photoURL,
        });
      })
      .catch((error) => {
        Swal.fire({
          toast: true,
          icon: "error",
          title: "Profile Updated Failed",
          text: error.message,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          background: "#F1F5F9",
          color: "#1E293B",
        });
      });
    setIsEditing(false);
  };

  if (!user) return <Loading />;

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-fit lg:w-[40vw] mx-auto p-6 sm:p-10 bg-base-100 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          👤 Profile
        </h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
              <img
                src={formData.photoURL || "https://images.unsplash.com/vector-1740737650825-1ce4f5377085?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <label className="input input-bordered flex items-center gap-3">
                <User size={20} className="text-primary" />
                <input
                  type="text"
                  value={formData.name}
                  disabled={!isEditing}
                  placeholder="Full Name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent"
                />
              </label>

              {/* Email */}
              <label className="input input-bordered flex items-center gap-3">
                <Mail size={20} className="text-primary" />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-transparent"
                />
              </label>

              {/* Avatar URL */}
              {isEditing && (
                <label className="input input-bordered flex items-center gap-3">
                  <ImagePlus size={20} className="text-primary" />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.photoURL}
                    onChange={(e) =>
                      setFormData({ ...formData, photoURL: e.target.value })
                    }
                    className="w-full bg-transparent"
                  />
                </label>
              )}

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline btn-error"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          photoURL: user.photoURL,
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success gap-2">
                      <Save size={18} /> Save
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary gap-2"
                  >
                    <Pencil size={18} /> Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
