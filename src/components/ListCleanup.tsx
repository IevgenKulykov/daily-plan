import React from 'react';
import { useTranslation } from 'react-i18next';


interface ListCleanupProps {
    removeCompletedTasks: () => void;
    removeRedeemedRewards: () => void;
}

const ListCleanup: React.FC<ListCleanupProps> = ({ removeCompletedTasks, removeRedeemedRewards }) => {
    const { t } = useTranslation();
  
    return (
      <div className="settings-btn-container">
        <button className="cleanup-btn" onClick={removeCompletedTasks}>
          {t('removeCompletedTasksButton')}
        </button>
        <button className="cleanup-btn" onClick={removeRedeemedRewards}>
          {t('removeRedeemedRewardsButton')}
        </button>
      </div>
    );
  };

export default ListCleanup;
