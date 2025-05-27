import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Pencil, Trash2, UserPlus, Users } from "lucide-react";
import { userService } from "../services/userService";
import { User, UserFormData } from "../types/user";

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const toast = React.useRef<Toast>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to load users",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", password: "", role: "user" });
    setDialogVisible(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setDialogVisible(true);
  };

  const handleDelete = (user: User) => {
    confirmDialog({
      message: `Are you sure you want to delete user ${user.name}?`,
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "btn-primary mx-4",
      rejectClassName: "btn-secondary",
      accept: async () => {
        try {
          await userService.deleteUser(user._id);
          await loadUsers();
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "User deleted successfully",
            life: 3000,
          });
        } catch (error) {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete user",
            life: 3000,
          });
        }
      },
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingUser) {
        console.log("editingUser", editingUser);

        const { password, ...updateData } = formData;
        await userService.updateUser(editingUser._id, updateData);
      } else {
        await userService.createUser(formData);
      }

      await loadUsers();
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: `User ${editingUser ? "updated" : "added"} successfully`,
        life: 3000,
      });
      setDialogVisible(false);
    } catch (error) {
      const messages = error?.data?.errors;
      if (Array.isArray(messages)) {
        messages.forEach((err) =>
          toast.current?.show({
            severity: "error",
            summary: "Validation Error",
            detail: err.message,
            life: 5000,
          })
        );
      }
    }
  };

  const actionBodyTemplate = (rowData: User) => {
    return (
      <div className="flex gap-2">
        <Button
          icon={<Pencil className="w-4 h-4" />}
          className="p-button-rounded p-button-success p-button-text"
          onClick={() => handleEdit(rowData)}
          tooltip="Edit"
        />
        <Button
          icon={<Trash2 className="w-4 h-4" />}
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => handleDelete(rowData)}
          tooltip="Delete"
        />
      </div>
    );
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Users className="w-6 h-6 mr-2" />
          User Management
        </h1>
        <Button
          label="Add User"
          icon={<UserPlus className="w-4 h-4 mr-2" />}
          onClick={handleAdd}
        />
      </div>

      <div className="card">
        <DataTable
          value={users}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className="p-datatable-striped"
          loading={loading}
        >
          <Column
            header="#"
            body={(rowData, options) => options.rowIndex + 1}
            style={{ width: "3rem", textAlign: "center" }}
          />
          <Column field="name" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="role" header="Role" sortable />
          <Column
            body={actionBodyTemplate}
            header="Actions"
            style={{ width: "10rem" }}
          />
        </DataTable>
      </div>

      <Dialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        header={editingUser ? "Edit User" : "Add New User"}
        modal
        className="w-full max-w-lg"
      >
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <InputText
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <InputText
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full"
            />
          </div>

          {!editingUser && (
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <Password
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full"
                toggleMask
                feedback={false}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="font-medium">
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button
              label="Cancel"
              className="p-button-text btn-secondary"
              onClick={() => setDialogVisible(false)}
            />
            <Button
              className="btn-primary"
              label={editingUser ? "Update" : "Add"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserManagementPage;
