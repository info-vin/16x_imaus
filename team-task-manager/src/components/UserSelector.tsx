import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { User } from '../types';

const UserSelector: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    currentUser,
    setCurrentUser,
    teamMembers,
    fetchTeamMembers,
    logout,
  } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentUser) {
      fetchTeamMembers();
    }
  }, [currentUser, fetchTeamMembers]);

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
    logout();
    setIsOpen(false);
    navigate('/');
  };


  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition"
        title={currentUser ? t('switchUser') : t('login')}
      >
        {currentUser ? (
          <div className="w-10 h-10 rounded-full ring-2 ring-indigo-400 flex items-center justify-center bg-indigo-500 text-white font-bold">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <UserCircleIcon className="w-7 h-7 text-gray-400" />
        )}
      </button>

      {isOpen && currentUser && (
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
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <span>{member.name}</span>
              </a>
            ))}
            <div className="border-t border-gray-600 my-1"></div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
              role="menuitem"
            >
              {t('logout')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSelector;
