// import { useState, useEffect } from 'react';

// export default function Home({ initialUsers }) {
//   const [users, setUsers] = useState(initialUsers || []);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('/api/users');
//       const data = await response.json();
//       setUsers(data.users || []);
//     } catch (error) {
//       console.error('Erro ao obter usuários:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleAddUser = async () => {
//     try {
//       const response = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email }),
//       });

//       if (response.ok) {
//         fetchUsers();
//         setName('');
//         setEmail('');
//       }
//     } catch (error) {
//       console.error('Erro ao adicionar usuário:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Lista de Usuários</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.name} - {user.email}
//           </li>
//         ))}
//       </ul>

//       <h2>Adicionar Usuário</h2>
//       <form>
//         <label>
//           Nome:
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//         <br />
//         <button type="button" onClick={handleAddUser}>
//           Adicionar Usuário
//         </button>
//       </form>
//     </div>
//   );
// }

// // Esta função é chamada no momento da construção para fornecer os dados iniciais
// export async function getServerSideProps() {
//   try {
//     // Obter todos os usuários
//     const response = await fetch('http://localhost:3000/api/users');
//     const data = await response.json();

//     return {
//       props: {
//         initialUsers: data.users || [],
//       },
//     };
//   } catch (error) {
//     console.error('Erro ao obter usuários:', error);
//     return {
//       props: {
//         initialUsers: [],
//       },
//     };
//   }
// }
