'use client';

import { useItineraries } from '@/features/itineraries/hooks/use-itineraries';

export default function ItineraryDetailPage() {
  const { data: itineraries, isLoading } = useItineraries();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Itinerary Detail</h1>
      <p className="text-muted-foreground mb-6">Detailed view of a specific holiday itinerary.</p>
      
      <div className="grid gap-4">
        {itineraries?.map((itinerary: any) => (
          <div key={itinerary.id} className="border rounded p-4">
            <pre>{JSON.stringify(itinerary, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
