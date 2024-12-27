// src/components/Header.jsx
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <h1 className="text-lg font-bold">ERP Hospitalar</h1>
      <div className="flex items-center gap-2">
        <span className="hidden sm:block">Usuário</span>
        <AccountCircleIcon />
      </div>
    </header>
  );
}

export default Header;
