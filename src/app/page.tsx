'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {Map} from '@/components/map';
import {useToast} from '@/hooks/use-toast';
import {Button} from '@/components/ui/button';
import {getCurrentLocation} from '@/services/location';
import {Location} from '@/services/location';

export default function Home() {
  const {toast} = useToast();
  const [location, setLocation] = React.useState<Location | null>(null);
  const [trackLog, setTrackLog] = React.useState<Location[]>([]);
  const [tracking, setTracking] = React.useState(false);

  const handleCheckIn = async () => {
    setTracking(true);
    const currentLocation = await getCurrentLocation();
    setLocation(currentLocation);
    setTrackLog(prev => [...prev, currentLocation]);
    toast({
      title: 'Check-in successful!',
      description: `Location tracking started at ${currentLocation.lat}, ${currentLocation.lng}`,
    });
  };

  const handleCheckOut = () => {
    setTracking(false);
    toast({
      title: 'Check-out successful!',
      description: 'Location tracking stopped.',
    });
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuButton>Dashboard</SidebarMenuButton>
              <SidebarMenuButton>Settings</SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarMenu>
              {!tracking ? (
                <Button onClick={handleCheckIn}>Check In</Button>
              ) : (
                <Button onClick={handleCheckOut}>Check Out</Button>
              )}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <Map location={location} trackLog={trackLog} />
    </SidebarProvider>
  );
}
