import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
export const queryClient = new QueryClient()

export const WithQueryClient = ({ children }: { children: React.ReactNode; }) => {
    return <QueryClientProvider contextSharing={true} client={queryClient}>
        {children}
    </QueryClientProvider>;

};
