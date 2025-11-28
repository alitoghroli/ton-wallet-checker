import { useState } from 'react';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import QRCode from 'qrcode';
import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [qr, setQr] = useState('');
  //const [tonConnectUI] = useTonConnectUI();

  const checkBalance = async () => {
    if (!address.trim()) return;
    setLoading(true);
    setError('');
    setBalance(null);
    setQr('');

    try {
      const res = await fetch(`https://toncenter.com/api/v2/getAddressInformation?address=${address}`);
      const data = await res.json();
      
      if (data.ok) {
        const bal = (BigInt(data.result.balance) / BigInt(1e9)).toString();
        setBalance(bal);
        QRCode.toDataURL(address, { width: 300 }, (_err: any, url: string) => {
          setQr(url);
        });
      } else {
        setError('آدرس نامعتبر');
      }
    } catch (e) {
      setError('خطای شبکه – VPN رو چک کن');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>TON Wallet Checker</h1>
      <p>بالانس + QR کد + آماده تلگرام مینی‌اپ</p>

      <TonConnectButton />

      <div className="input-group">
        <input
          type="text"
          placeholder="آدرس TON وارد کن (EQ... یا UQ...)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={checkBalance} disabled={loading}>
          {loading ? 'در حال بررسی...' : 'چک کن'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {balance !== null && (
        <div className="result">
          <h2>{balance} TON</h2>
          {qr && <img src={qr} alt="QR Code" className="qr" />}
          <p className="address">{address}</p>
        </div>
      )}

      <footer>Made with ❤️ for TON & Telegram Mini Apps</footer>
    </div>
  );
}

export default App;
