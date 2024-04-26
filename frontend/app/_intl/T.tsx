import React from 'react';
import { useTranslation } from '@/_intl/useTranslation';

export const T = ({ id }: {id: string}) => {
  const { translate } = useTranslation();
  return <>{translate(id)}</>;
};
