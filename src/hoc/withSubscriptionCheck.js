import React from 'react';
import { useUserPremiumStatus } from '../hooks/useUserPremiumStatus';

const withSubscriptionCheck = (Wrapped) => {
  return (props) => {
    const { isPremium, isLoading } = useUserPremiumStatus();

    if (isLoading) return null; // Loader
    if (!isPremium) return <div className="p-6 text-center">Offre Premium requise</div>;
    return <Wrapped {...props} />;
  };
};

export default withSubscriptionCheck;
