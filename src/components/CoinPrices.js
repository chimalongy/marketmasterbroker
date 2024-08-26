import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CryptoPrices.css'; // Create a CSS file for styling

const CryptoPrices = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        ids: 'bitcoin,ethereum,tether,binancecoin,solana,ripple,steth,usd-coin,dogecoin,toncoin',
                    },
                });
                setPrices(response.data);
            } catch (error) {
                console.error('Error fetching crypto prices:', error);
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 60000); // Fetch new prices every minute

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="crypto-prices">
            <table>
                <thead>
                    <tr>
                        <th>Names</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map((crypto) => (
                        <tr key={crypto.id}>
                            <td>{crypto.name}</td>
                            <td>${crypto.current_price} = {crypto.current_price} {crypto.symbol.toUpperCase()}</td>
                            <td><button>Stake</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoPrices;
