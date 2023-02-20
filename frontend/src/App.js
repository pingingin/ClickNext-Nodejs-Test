import './index.css';
import './App.css';
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Layout from './Page/js/Layout';
import Home from './Page/js/Home';
import Login from './Page/js/Login';
import Logout from './Page/js/Logout';
import Deposit from './Page/js/Deposit';
import Withdraw from './Page/js/Withdraw';
import Transfer from './Page/js/Transfer';
import HistoryTransfer from './Page/js/HistoryTransfer';
import HistoryReceiver from './Page/js/HistoryReceiver';
import NoPage from './Page/js/NoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route index element={<Home />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="history/transfer" element={<HistoryTransfer />} />
          <Route path="history/receive" element={<HistoryReceiver />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}