import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { DEFAULT_RPC_URL, ChainStatus, getBalance, getStatus } from '../services/chain';
import { hasWallet, loadWallet } from './wallet';

type Wallet = Awaited<ReturnType<typeof loadWallet>>;
type AppContextValue = {
  wallet:Wallet; authenticated:boolean; status:ChainStatus|null; balance:number; rpcUrl:string;
  refresh:()=>Promise<void>; unlock:()=>Promise<boolean>; setRpcUrl:(url:string)=>void; reloadWallet:()=>Promise<void>;
};
const Ctx=createContext<AppContextValue | null>(null);

export function AppProvider({children}:PropsWithChildren) {
  const [wallet,setWallet]=useState<Wallet>(null); const [authenticated,setAuthenticated]=useState(false);
  const [status,setStatus]=useState<ChainStatus|null>(null); const [balance,setBalance]=useState(0); const [rpcUrl,setRpcUrlState]=useState(DEFAULT_RPC_URL);
  const refresh=useCallback(async()=>{
    try { const s=await getStatus(rpcUrl); setStatus(s); } catch { setStatus(null); }
    if (wallet) { try { const b=await getBalance(rpcUrl,wallet.address); setBalance(b.balance); } catch { /* offline */ } }
  },[rpcUrl,wallet]);
  useEffect(()=>{ let alive=true; (async()=>{ const exists=await hasWallet(); const w=await loadWallet(); if(!alive)return; setWallet(w); if(exists){ const result=await LocalAuthentication.hasHardwareAsync(); if(result) { /* lock until explicit unlock */ } } else setAuthenticated(true); })(); return ()=>{alive=false;}; },[]);
  useEffect(()=>{ if(authenticated) refresh(); const id=setInterval(()=>{ if(authenticated) refresh(); },15000); return ()=>clearInterval(id); },[authenticated,refresh]);
  const reloadWallet=useCallback(async()=>{ setWallet(await loadWallet()); setAuthenticated(true); },[]);
  const unlock=useCallback(async()=>{ const available=await LocalAuthentication.hasHardwareAsync(); if(!available){ setAuthenticated(true); return true; } const result=await LocalAuthentication.authenticateAsync({promptMessage:'Unlock RainX Wallet', fallbackLabel:'Use device passcode'}); if(result.success)setAuthenticated(true); return result.success; },[]);
  const value=useMemo(()=>({wallet,authenticated,status,balance,rpcUrl,refresh,unlock,setRpcUrl:setRpcUrlState,reloadWallet}),[wallet,authenticated,status,balance,rpcUrl,refresh,unlock,reloadWallet]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useApp(){const v=useContext(Ctx); if(!v)throw new Error('useApp must be used inside AppProvider'); return v;}
