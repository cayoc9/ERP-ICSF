// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import GroupIcon from '@mui/icons-material/Group';

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 flex flex-col">
      <nav className="flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
          <DashboardIcon />
          <span>Indicadores</span>
        </Link>
        <Link to="/reportar" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
          <NoteAddIcon />
          <span>Reportar Falha</span>
        </Link>
        <Link to="/hospital-groups" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
          <GroupIcon />
          <span>Grupos Hospitalares</span>
        </Link>
        {/* Adicione outras rotas conforme necessário */}
      </nav>
    </aside>
  );
}

export default Sidebar;