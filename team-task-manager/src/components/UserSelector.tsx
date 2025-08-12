import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../stores/appStore';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

const UserSelector: React.FC = () => {
  const { t } = useTranslation();
  const {
    currentUser,
    setCurrentUser,
    teamMembers,
    fetchTeamMembers,
  } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef]);

  const handleSelect = (user: User) => {
    setCurrentUser(user);
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition"
        title={t('selectUser')}
      >
        {currentUser ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full ring-2 ring-indigo-400"
          />
        ) : (
          <UserCircleIcon className="w-7 h-7 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-30">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <div className="px-4 py-2 text-xs text-gray-400">
              {t('switchUser')}
            </div>
            {teamMembers.map((member) => (
              <a
                key={member.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(member);
                }}
                className={`flex items-center gap-3 px-4 py-2 text-sm ${currentUser?.id === member.id ? 'bg-indigo-600 text-white' : 'text-gray-200 hover:bg-gray-600'}`}
                role="menuitem"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{member.name}</span>
              </a>
            ))}
            <div className="border-t border-gray-600 my-1" />
            <a
              href="#"
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
              role="menuitem"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSelector;
