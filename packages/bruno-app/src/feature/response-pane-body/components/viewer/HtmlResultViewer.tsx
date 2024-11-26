/**
 * This file is part of bruno-app.
 * For license information, see the file LICENSE_GPL3 at the root directory of this distribution.
 */
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { LoadingResponse } from '../LoadingResponse';

type AudioResultViewer = {
  itemId: string;
  originUrl: string;
};

export const HtmlResultViewer: React.FC<AudioResultViewer> = ({ itemId, originUrl }) => {
  const value = useQuery({
    queryKey: ['response-body', itemId],
    retry: false,
    queryFn: async () => {
      const data = await fetch(`response-body://${itemId}`);
      const text = await data.text();
      return text.replace('<head>', `<head><base href="${originUrl}">`);
    }
  });

  if (value.isLoading) {
    return <LoadingResponse />;
  }

  return (
    <webview
      src={`data:text/html; charset=utf-8,${encodeURIComponent(value.data)}`}
      webpreferences="disableDialogs=true, javascript=yes"
      className="h-full bg-white"
    />
  );
};
