import React, { useEffect, useState } from 'react';
import { getMySubscription } from '../services/userService';

const withSubscriptionCheck = (Wrapped) => {
  return (props) => {
    const [allowed, setAllowed] = useState(null);

    useEffect(() => {
      (async () => {
        try {
          const sub = await getMySubscription();
          setAllowed(!!sub.active);
        } catch (e) {
          console.error("subscription check failed", e);
          setAllowed(false);
        }
      })();
    }, []);

    if (allowed === null) return null; // Loader si tu veux
    if (!allowed) return <div className="p-6 text-center">Offre Premium requise</div>;
    return <Wrapped {...props} />;
  };
};

export default withSubscriptionCheck;
