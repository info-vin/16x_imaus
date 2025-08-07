import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KanbanView from '../components/KanbanView';

const FlowPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return <KanbanView />;
};

export default FlowPage;
