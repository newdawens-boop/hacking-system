import { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Globe, Cpu, Signal, Shield, Lock, Wifi, Server, Terminal, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import './App.css';

// 200+ Hacking messages from different systems
const hackingMessages = [
  // Firewall & Security Systems
  ...Array.from({ length: 20 }, (_, idx) => [
    `[FIREWALL] Bypassing security layer ${idx + 1}...`,
    `[FIREWALL] Decrypting SSL certificate ${Math.random().toString(36).substring(2, 8).toUpperCase()}...`,
    `[FIREWALL] Breaking AES-256 encryption...`,
    `[FIREWALL] Disabling intrusion detection system...`,
    `[FIREWALL] Spoofing MAC address...`,
  ]).flat(),
  
  // Network Systems
  ...Array.from({ length: 20 }, (_, idx) => [
    `[NETWORK] Establishing connection to node ${idx + 1}...`,
    `[NETWORK] Routing through proxy server ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}...`,
    `[NETWORK] Handshake protocol initiated...`,
    `[NETWORK] Packet sniffing on port ${Math.floor(Math.random() * 9000) + 1000}...`,
    `[NETWORK] DNS hijacking in progress...`,
  ]).flat(),
  
  // Database Systems
  ...Array.from({ length: 20 }, (_, idx) => [
    `[DATABASE] Querying user records table_${idx + 1}...`,
    `[DATABASE] Extracting metadata from SQL server...`,
    `[DATABASE] Bypassing database authentication...`,
    `[DATABASE] Dumping user credentials...`,
    `[DATABASE] Accessing encrypted storage...`,
  ]).flat(),
  
  // GPS & Location Systems
  ...Array.from({ length: 20 }, (_, idx) => [
    `[GPS] Triangulating position from satellite ${idx + 1}...`,
    `[GPS] Accessing cell tower data...`,
    `[GPS] Calculating coordinates...`,
    `[GPS] Signal strength: ${Math.floor(Math.random() * 100)}%`,
    `[GPS] Location lock acquired...`,
  ]).flat(),
  
  // Device Systems
  ...Array.from({ length: 20 }, () => [
    `[DEVICE] Scanning hardware components...`,
    `[DEVICE] Reading IMEI: ${Math.random().toString().slice(2, 17)}`,
    `[DEVICE] Accessing camera module...`,
    `[DEVICE] Microphone activation...`,
    `[DEVICE] Extracting device fingerprint...`,
  ]).flat(),
  
  // Carrier Systems
  ...Array.from({ length: 20 }, () => [
    `[CARRIER] Connecting to mobile network...`,
    `[CARRIER] Reading SIM card data...`,
    `[CARRIER] Signal tower ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    `[CARRIER] Network registration complete...`,
    `[CARRIER] Roaming data accessed...`,
  ]).flat(),
  
  // IP & Trace Systems
  ...Array.from({ length: 20 }, () => [
    `[IP-TRACE] Resolving IP: ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    `[IP-TRACE] WHOIS lookup initiated...`,
    `[IP-TRACE] Traceroute in progress...`,
    `[IP-TRACE] ISP identification: Complete`,
    `[IP-TRACE] Geolocation mapping...`,
  ]).flat(),
  
  // Social Media Systems
  ...Array.from({ length: 20 }, () => [
    `[SOCIAL] Scanning WhatsApp metadata...`,
    `[SOCIAL] Accessing Facebook profile...`,
    `[SOCIAL] Instagram activity log retrieved...`,
    `[SOCIAL] Telegram chat history...`,
    `[SOCIAL] Twitter/X account linked...`,
  ]).flat(),
  
  // Banking Systems
  ...Array.from({ length: 20 }, () => [
    `[BANK] Scanning transaction history...`,
    `[BANK] Credit card validation...`,
    `[BANK] Account balance: $${Math.floor(Math.random() * 100000)}`,
    `[BANK] Recent purchases analyzed...`,
    `[BANK] Payment methods on file...`,
  ]).flat(),
  
  // Dark Web Systems
  ...Array.from({ length: 20 }, () => [
    `[DARKWEB] Connecting to Tor node...`,
    `[DARKWEB] Onion routing established...`,
    `[DARKWEB] Encrypted tunnel active...`,
    `[DARKWEB] Identity masking: ON`,
    `[DARKWEB] Anonymous proxy chain...`,
  ]).flat(),
];

// Shuffle messages for randomness
const shuffledMessages = [...hackingMessages].sort(() => Math.random() - 0.5);

interface TrackingInfo {
  target: string;
  status: string;
  carrier: string;
  location: string;
  address: string;
  ipTrace: string;
  device: string;
  deviceModel: string;
  osVersion: string;
  signalStrength: string;
  latitude: string;
  longitude: string;
  accuracy: string;
}

function App() {
  const [country, setCountry] = useState('+509');
  const [number, setNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [internetSpeed, setInternetSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-detect device info
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let device = 'Unknown Device';
    let deviceModel = 'Unknown Model';
    let osVersion = 'Unknown OS';

    if (/Android/.test(userAgent)) {
      device = 'Android';
      const match = userAgent.match(/Android\s([\d.]+)/);
      osVersion = match ? `Android ${match[1]}` : 'Android';
      const modelMatch = userAgent.match(/;\s([^)]+)\)/);
      deviceModel = modelMatch ? modelMatch[1].trim() : 'Android Device';
    } else if (/iPhone/.test(userAgent)) {
      device = 'iPhone';
      const match = userAgent.match(/OS\s([\d_]+)/);
      osVersion = match ? `iOS ${match[1].replace(/_/g, '.')}` : 'iOS';
      deviceModel = 'iPhone';
    } else if (/iPad/.test(userAgent)) {
      device = 'iPad';
      deviceModel = 'iPad';
    } else if (/Windows/.test(userAgent)) {
      device = 'Windows PC';
      deviceModel = 'Desktop/Laptop';
    } else if (/Mac/.test(userAgent)) {
      device = 'Mac';
      deviceModel = 'MacBook/iMac';
    }

    return { device, deviceModel, osVersion };
  };

  // Get real location
  const getRealLocation = async (): Promise<{ location: string; address: string; lat: string; lng: string; accuracy: string }> => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            
            // Reverse geocoding using OpenStreetMap
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
              );
              const data = await response.json();
              const address = data.display_name || 'Address not found';
              const city = data.address?.city || data.address?.town || data.address?.village || 'Unknown City';
              const country_name = data.address?.country || 'Unknown Country';
              
              resolve({
                location: `${city}, ${country_name}`,
                address: address,
                lat: latitude.toFixed(6),
                lng: longitude.toFixed(6),
                accuracy: `${Math.round(accuracy)}m`
              });
            } catch {
              resolve({
                location: 'Location detected',
                address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
                lat: latitude.toFixed(6),
                lng: longitude.toFixed(6),
                accuracy: `${Math.round(accuracy)}m`
              });
            }
          },
          () => {
            resolve({
              location: 'Haiti',
              address: 'Port-au-Prince, Haiti',
              lat: '18.5944',
              lng: '-72.3074',
              accuracy: 'N/A'
            });
          }
        );
      } else {
        resolve({
          location: 'Haiti',
          address: 'Port-au-Prince, Haiti',
          lat: '18.5944',
          lng: '-72.3074',
          accuracy: 'N/A'
        });
      }
    });
  };

  // Scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getRandomColor = () => {
    const colors = ['#00ff00', '#00ffff', '#ff00ff', '#ff0000', '#ffff00', '#ff8800', '#8800ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getProgressSpeed = () => {
    switch (internetSpeed) {
      case 'slow': return 100;
      case 'medium': return 50;
      case 'fast': return 25;
      default: return 50;
    }
  };

  const startTracking = async () => {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    
    if (cleanNumber.length < 6) {
      alert('Antre yon nimewo valab');
      return;
    }

    setIsTracking(true);
    setProgress(0);
    setLogs([]);
    setShowInfo(false);

    const fullNumber = `${country} ${cleanNumber}`;
    const deviceInfo = getDeviceInfo();
    const locationInfo = await getRealLocation();

    let currentProgress = 0;
    let messageIndex = 0;
    const speed = getProgressSpeed();

    const interval = setInterval(() => {
      currentProgress += Math.random() * 2;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(Math.floor(currentProgress));

      // Add multiple logs at once for speed effect
      const logsToAdd = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < logsToAdd && messageIndex < shuffledMessages.length; i++) {
        const message = shuffledMessages[messageIndex];
        setLogs(prev => [...prev, message]);
        messageIndex++;
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTrackingInfo({
          target: fullNumber,
          status: 'Connected',
          carrier: 'Mobile Network',
          location: locationInfo.location,
          address: locationInfo.address,
          ipTrace: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          device: deviceInfo.device,
          deviceModel: deviceInfo.deviceModel,
          osVersion: deviceInfo.osVersion,
          signalStrength: `${Math.floor(Math.random() * 40) + 60}%`,
          latitude: locationInfo.lat,
          longitude: locationInfo.lng,
          accuracy: locationInfo.accuracy
        });
        setShowInfo(true);
        setIsTracking(false);
      }
    }, speed);
  };

  const handleCall = () => {
    if (trackingInfo) {
      const cleanNumber = trackingInfo.target.replace(/\s/g, '').replace('+', '');
      window.location.href = `tel:${cleanNumber}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff00] font-mono p-4">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-[#00ff00] animate-pulse" />
            <Lock className="w-6 h-6 text-[#00ffff]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider mb-1">
            <span className="text-[#00ff00]">SECURE</span>
            <span className="text-[#00ffff]"> NUMBER</span>
            <span className="text-[#ff00ff]"> TRACKER</span>
          </h1>
          <p className="text-xs md:text-sm text-[#00ff00]/60">Advanced Tracking System v2.0</p>
        </div>

        {/* Photo Placeholder - Large and Beautiful */}
        <Card className="mb-6 bg-black/80 border-2 border-[#00ff00]/50 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full h-48 md:h-64 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] flex items-center justify-center group cursor-pointer overflow-hidden">
              {/* Animated border */}
              <div className="absolute inset-0 border-2 border-[#00ff00]/30 group-hover:border-[#00ff00]/60 transition-all duration-300" />
              
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#00ff00]" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#00ff00]" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#00ff00]" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#00ff00]" />
              
              {/* Scanning line animation */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#00ff00] to-transparent animate-scan" />
              </div>
              
              {/* Content */}
              <div className="text-center z-10">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full bg-[#00ff00]/10 border-2 border-[#00ff00]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Terminal className="w-10 h-10 md:w-12 md:h-12 text-[#00ff00]" />
                </div>
                <p className="text-[#00ff00]/80 text-sm md:text-base font-bold">PHOTO TARGET</p>
              </div>
              
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle, #00ff00 1px, transparent 1px)`,
                backgroundSize: '10px 10px'
              }} />
            </div>
          </CardContent>
        </Card>

        {/* Internet Speed Selector */}
        <div className="mb-4 flex justify-center gap-2">
          <span className="text-xs text-[#00ff00]/60 self-center mr-2">Vitès Entènèt:</span>
          {(['slow', 'medium', 'fast'] as const).map((speed) => (
            <button
              key={speed}
              onClick={() => setInternetSpeed(speed)}
              className={`px-3 py-1 text-xs border rounded transition-all ${
                internetSpeed === speed
                  ? 'bg-[#00ff00] text-black border-[#00ff00]'
                  : 'bg-transparent text-[#00ff00] border-[#00ff00]/50 hover:border-[#00ff00]'
              }`}
            >
              {speed === 'slow' && <Wifi className="w-3 h-3 inline mr-1" />}
              {speed === 'medium' && <Signal className="w-3 h-3 inline mr-1" />}
              {speed === 'fast' && <Globe className="w-3 h-3 inline mr-1" />}
              {speed.charAt(0).toUpperCase() + speed.slice(1)}
            </button>
          ))}
        </div>

        {/* Input Section */}
        <Card className="mb-6 bg-black/80 border border-[#00ff00]/50">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-full sm:w-32 bg-black border-[#00ff00] text-[#00ff00]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-[#00ff00]">
                  <SelectItem value="+1" className="text-[#00ff00]">🇺🇸 +1</SelectItem>
                  <SelectItem value="+509" className="text-[#00ff00]">🇭🇹 +509</SelectItem>
                  <SelectItem value="+44" className="text-[#00ff00]">🇬🇧 +44</SelectItem>
                  <SelectItem value="+33" className="text-[#00ff00]">🇫🇷 +33</SelectItem>
                  <SelectItem value="+1" className="text-[#00ff00]">🇨🇦 +1</SelectItem>
                  <SelectItem value="+49" className="text-[#00ff00]">🇩🇪 +49</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                type="text"
                placeholder="Antre nimewo a..."
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="flex-1 bg-black border-[#00ff00] text-[#00ff00] placeholder:text-[#00ff00]/40"
                onKeyPress={(e) => e.key === 'Enter' && startTracking()}
              />
              
              <Button
                onClick={startTracking}
                disabled={isTracking}
                className="bg-[#00ff00] text-black hover:bg-[#00ff00]/80 font-bold px-6"
              >
                {isTracking ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⚡</span>
                    TRACKING...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    TRACK
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        {isTracking && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#00ff00]">Progress</span>
              <span className="text-[#00ffff] font-bold">{progress}%</span>
            </div>
            <div className="h-3 bg-black border border-[#00ff00]/50 rounded overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00ff00] via-[#00ffff] to-[#00ff00] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Logs Terminal */}
        {(isTracking || logs.length > 0) && (
          <Card className="mb-6 bg-black border border-[#00ff00]/50">
            <CardContent className="p-0">
              <div className="bg-[#0a0a0a] p-2 border-b border-[#00ff00]/30 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00ff00]" />
                <span className="text-xs text-[#00ff00]/60">system_logs.txt</span>
              </div>
              <div className="h-64 md:h-80 overflow-auto p-3 font-mono text-xs md:text-sm">
                {logs.map((log, index) => (
                  <div 
                    key={index} 
                    className="mb-1 animate-fadeIn"
                    style={{ color: getRandomColor() }}
                  >
                    <span className="text-[#00ff00]/40">[{new Date().toLocaleTimeString()}]</span>{' '}
                    {log}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Card */}
        {showInfo && trackingInfo && (
          <Card className="bg-black/90 border-2 border-[#00ff00] animate-slideUp">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#00ff00]/30">
                <AlertTriangle className="w-5 h-5 text-[#ffff00]" />
                <h3 className="text-lg md:text-xl font-bold text-[#00ff00]">📡 TRACKING RESULTS</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Target Number - Clickable */}
                <div 
                  onClick={handleCall}
                  className="col-span-1 md:col-span-2 bg-[#00ff00]/10 border border-[#00ff00]/50 rounded p-3 cursor-pointer hover:bg-[#00ff00]/20 transition-colors group"
                >
                  <div className="flex items-center gap-2 text-[#00ff00]/60 text-xs mb-1">
                    <Phone className="w-3 h-3" />
                    TARGET NUMBER
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-[#00ff00] flex items-center gap-2">
                    {trackingInfo.target}
                    <span className="text-xs bg-[#00ff00] text-black px-2 py-0.5 rounded group-hover:scale-105 transition-transform">
                      KLIKE POU RELE
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="bg-[#1a1a1a] border border-[#00ff00]/30 rounded p-3">
                  <div className="flex items-center gap-2 text-[#00ff00]/60 text-xs mb-1">
                    <Signal className="w-3 h-3" />
                    STATUS
                  </div>
                  <div className="text-[#00ff00] font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse" />
                    {trackingInfo.status}
                  </div>
                </div>

                {/* Signal Strength */}
                <div className="bg-[#1a1a1a] border border-[#00ff00]/30 rounded p-3">
                  <div className="flex items-center gap-2 text-[#00ff00]/60 text-xs mb-1">
                    <Wifi className="w-3 h-3" />
                    SIGNAL
                  </div>
                  <div className="text-[#00ffff] font-bold">{trackingInfo.signalStrength}</div>
                </div>

                {/* Carrier */}
                <div className="bg-[#1a1a1a] border border-[#00ff00]/30 rounded p-3">
                  <div className="flex items-center gap-2 text-[#00ff00]/60 text-xs mb-1">
                    <Server className="w-3 h-3" />
                    CARRIER
                  </div>
                  <div className="text-[#00ff00] font-bold">{trackingInfo.carrier}</div>
                </div>

                {/* Device */}
                <div className="bg-[#1a1a1a] border border-[#00ff00]/30 rounded p-3">
                  <div className="flex items-center gap-2 text-[#00ff00]/60 text-xs mb-1">
                    <Cpu className="w-3 h-3" />
                    DEVICE
                  </div>
                  <div className="text-[#ff00ff] font-bold">{trackingInfo.device}</div>
                  <div className="text-[#ff00ff]/70 text-xs">{trackingInfo.deviceModel}</div>
                  <div className="text-[#ff00ff]/50 text-xs">{trackingInfo.osVersion}</div>
                </div>

                {/* IP Address */}
                <div className="bg-[#1a1a1a] border border-[#00ff00]/30 rounded p-3">
                  <div className="flex items-center gap-2 text-[#00ff00]/60 text-xs mb-1">
                    <Globe className="w-3 h-3" />
                    IP TRACE
                  </div>
                  <div className="text-[#ffff00] font-bold font-mono">{trackingInfo.ipTrace}</div>
                </div>

                {/* Location - Full Width */}
                <div className="col-span-1 md:col-span-2 bg-[#1a1a1a] border border-[#00ff00]/30 rounded p-3">
                  <div className="flex items-center gap-2 text-[#00ff00]/60 text-xs mb-1">
                    <MapPin className="w-3 h-3" />
                    LOCATION
                  </div>
                  <div className="text-[#00ffff] font-bold text-lg">{trackingInfo.location}</div>
                  <div className="text-[#00ffff]/70 text-sm mt-1">{trackingInfo.address}</div>
                  <div className="flex gap-4 mt-2 text-xs text-[#00ff00]/50">
                    <span>Lat: {trackingInfo.latitude}</span>
                    <span>Lng: {trackingInfo.longitude}</span>
                    <span>Accuracy: {trackingInfo.accuracy}</span>
                  </div>
                </div>
              </div>

              {/* Warning Footer */}
              <div className="mt-4 pt-3 border-t border-[#ff0000]/30 text-center">
                <p className="text-[#ff0000] text-xs animate-pulse">
                  ⚠️ DATA ACCESSED SUCCESSFULLY - SESSION LOGGED ⚠️
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-6 text-[#00ff00]/30 text-xs">
          <p>Secure Number Tracker v2.0 | Encrypted Connection</p>
          <p className="mt-1">© 2024 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default App;
