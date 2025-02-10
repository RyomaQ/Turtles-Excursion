import { User } from "@/src/types/User";

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <table className="w-full border-collapse border border-pink950 bg-white rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-pink-100">
          <th className="border border-gray-300 text-left p-2">Prénom</th>
          <th className="border border-gray-300 text-left p-2">Nom</th>
          <th className="border border-gray-300 text-left p-2">Email</th>
          <th className="border border-gray-300 text-left p-2">Activités</th>
          <th className="border border-gray-300 text-left p-2">Statut</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.rowid}>
            <td className="border border-gray-300 p-2">{user.firstname}</td>
            <td className="border border-gray-300 p-2">{user.lastname}</td>
            <td className="border border-gray-300 p-2">{user.email}</td>
            <td className="border border-gray-300 p-2">{user.activities}</td>
            <td className="border border-gray-300 p-2">
              {user.is_admin ? "Admin" : "Utilisateur"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
