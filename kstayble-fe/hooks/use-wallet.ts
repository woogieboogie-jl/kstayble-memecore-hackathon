"use client"

import { useState, useEffect, createContext, useContext } from 'react'

export interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string
  isVerified: boolean
  provider: 'memecore' | 'mock' | null
}

export interface WalletContextType {
  wallet: WalletState
  connectMemeCoreWallet: () => Promise<void>
  disconnect: () => void
  setVerified: (verified: boolean) => void
  mockTransaction: (type: 'send' | 'receive', amount: string) => Promise<void>
}

// Mock wallet addresses for demo
const DEMO_ADDRESSES = [
  '0x1234567890123456789012345678901234567890',
  '0xAbCdEf1234567890123456789012345678901234',
  '0x9876543210987654321098765432109876543210'
]

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: true, // Set to true by default for demo
    address: '0x1234567890123456789012345678901234567890', // Demo address
    balance: '₩1,520,768',
    isVerified: false,
    provider: 'mock'
  })

  // Load wallet state from localStorage on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('kstable-wallet')
    if (savedWallet) {
      try {
        const parsed = JSON.parse(savedWallet)
        setWallet(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Failed to parse saved wallet:', error)
      }
    }
  }, [])

  // Save wallet state to localStorage whenever it changes
  useEffect(() => {
    // Always save wallet state, not just when connected
    localStorage.setItem('kstable-wallet', JSON.stringify(wallet))
  }, [wallet])

  const connectMemeCoreWallet = async () => {
    try {
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, check if MetaMask or other Web3 wallet is available
      const isWeb3Available = typeof window !== 'undefined' && (window as any).ethereum
      
      if (!isWeb3Available) {
        // Mock MemeCore wallet connection
        const randomAddress = DEMO_ADDRESSES[Math.floor(Math.random() * DEMO_ADDRESSES.length)]
        setWallet(prev => ({
          ...prev,
          isConnected: true,
          address: randomAddress,
          provider: 'memecore'
        }))
        return
      }

      // If actual Web3 wallet is available (MetaMask, etc.), use it
      const ethereum = (window as any).ethereum
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts && accounts.length > 0) {
        setWallet(prev => ({
          ...prev,
          isConnected: true,
          address: accounts[0],
          provider: 'memecore'
        }))
      }
    } catch (error) {
      console.error('Failed to connect MemeCore wallet:', error)
      // Fallback to mock connection
      const randomAddress = DEMO_ADDRESSES[Math.floor(Math.random() * DEMO_ADDRESSES.length)]
      setWallet(prev => ({
        ...prev,
        isConnected: true,
        address: randomAddress,
        provider: 'mock'
      }))
    }
  }

  const disconnect = () => {
    setWallet({
      isConnected: false,
      address: null,
      balance: '₩1,520,768',
      isVerified: false,
      provider: null
    })
    localStorage.removeItem('kstable-wallet')
  }

  const setVerified = (verified: boolean) => {
    setWallet(prev => ({ ...prev, isVerified: verified }))
  }

  const mockTransaction = async (type: 'send' | 'receive', amount: string) => {
    console.log('🔄 mockTransaction called:', { type, amount, currentBalance: wallet.balance })
    
    // Simulate transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock balance update (for demo purposes)
    const currentBalance = parseFloat(wallet.balance.replace(/[₩,]/g, ''))
    console.log('💰 Current balance parsed:', currentBalance)
    
    // Handle both string numbers and formatted currency strings
    let transactionAmount: number
    if (typeof amount === 'string') {
      // Remove any currency symbols and commas, then parse
      transactionAmount = parseFloat(amount.replace(/[₩,$]/g, ''))
    } else {
      transactionAmount = parseFloat(String(amount))
    }
    
    console.log('💸 Transaction amount parsed:', transactionAmount)
    
    if (isNaN(transactionAmount)) {
      console.error('❌ Invalid transaction amount:', amount)
      return Promise.reject('Invalid amount')
    }
    
    const newBalance = type === 'send' 
      ? Math.max(0, currentBalance - transactionAmount)  // Don't go negative
      : currentBalance + transactionAmount
    
    console.log('🎯 Calculating new balance:', { currentBalance, transactionAmount, type, newBalance })
    
    const formattedNewBalance = `₩${Math.round(newBalance).toLocaleString()}`
    console.log('📝 Setting new balance:', formattedNewBalance)
    
    setWallet(prev => {
      const newState = {
        ...prev,
        balance: formattedNewBalance
      }
      console.log('🔄 Wallet state update:', { prev: prev.balance, new: newState.balance })
      return newState
    })
    
    console.log(`✅ Mock ${type} transaction completed: ${transactionAmount} KRW, New balance: ${formattedNewBalance}`)
    
    return Promise.resolve()
  }

  return {
    wallet,
    connectMemeCoreWallet,
    disconnect,
    setVerified,
    mockTransaction
  }
}
