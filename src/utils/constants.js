
import axios from "axios";


export let baseurl = "https://marketmasterbroker.com/marketmasterbrokerbackend/engine.php"
//export let baseurl = "http://localhost/marketmasterbrokerbackend/engine.php"
  

export function setCookie(cookieName, cookieValue, expirationMinutes) {
    var d = new Date();
    d.setTime(d.getTime() + (expirationMinutes * 60 * 1000)); // Set the expiration time in minutes
    var expires = "expires=" + d.toUTCString(); // Convert the date to UTC string
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/"; // Set the cookie with name, value, expiration, and path
}

export function checkCookie(cookieName) {
    // Split document.cookie string into individual cookies
    var cookies = document.cookie.split(';');
    
    // Iterate over each cookie
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim(); // Trim any leading or trailing whitespace
        // Check if the cookie starts with the provided cookieName
        if (cookie.indexOf(cookieName + '=') === 0) {
            return true; // Cookie exists
        }
    }
    return false; // Cookie does not exist
}

export function getCookie(cookieName) {
    
    const cookiesArray = document.cookie.split(';');
  
    // Iterate over each cookie to find the one with the provided name
    for (let cookie of cookiesArray) {
      // Remove leading spaces (if any)
      cookie = cookie.trim();
  
      // Check if the cookie starts with the provided name
      if (cookie.startsWith(cookieName + '=')) {
        // Return the value of the cookie
        return cookie.substring(cookieName.length + 1);
      }
    }
  
    // Return null if the cookie doesn't exist
    return null;
  }

export async function getWithdrawableFunds(email){
    let userInvestments = await getuserInvestments(email)
    console.log("USER INVESTMENTS :", userInvestments)
     let WithdrawableFunds =0
   for (let i=0; i<userInvestments.length; i++){
    console.log(userInvestments[i])
        if (userInvestments[i].STATUS =="COMPLETED"){
          let profit = Number(getInvestmentProfits(userInvestments[i]));
          console.log("Profit:",profit)
           WithdrawableFunds += profit
        }
   }


   return WithdrawableFunds
}




 export async function getAccountBalance(email){
 
  let WalletBalance =0;
 let wallets= await getUserWallets(email)
 
 let USDWallet = wallets.filter(wallet=>wallet.type=="USD")
 let BTCWallet = wallets.filter(wallet=>wallet.type=="BTC")
 let ETHWallet = wallets.filter(wallet=>wallet.type=="ETH")
 let LTCWallet = wallets.filter(wallet=>wallet.type=="LTC")
 let USDTWallet = wallets.filter(wallet=>wallet.type=="USDT")



 let USDWalletValue = USDWallet.length > 0 ? USDWallet[0].value : 0;
 let BTCWalletValue = BTCWallet.length > 0 ? BTCWallet[0].value : 0;
 let ETHWalletValue = ETHWallet.length > 0 ? ETHWallet[0].value : 0;
 let LTCWalletValue = LTCWallet.length > 0 ? LTCWallet[0].value : 0;
 let USDTWalletValue = USDTWallet.length > 0 ? USDTWallet[0].value : 0;
 


  console.log("WALLET BALANCE ", WalletBalance)

const currentBTCprice = await getBitcoinPrice();
 const currentETHprice = await getEthereumPrice();
 const currentLTCprice = await getLitecoinPrice();

let convertedBTCValue = currentBTCprice * BTCWalletValue
let convertedETHValue = currentETHprice * ETHWalletValue
let convertedLTCValue = currentLTCprice *  LTCWalletValue
 
WalletBalance = Number (USDWalletValue)  + Number(convertedBTCValue.toFixed(4))+ Number(convertedETHValue.toFixed(4))+ Number(convertedLTCValue.toFixed(4))+Number (USDTWalletValue)

console.log("WALLET BALANCE:", Number(WalletBalance));

let Investments = await getuserInvestments(email)
let InvestmentsValue =0;

for (let i=0; i<Investments.length;i++){
 
  InvestmentsValue += Number(getInvestmentProfits(Investments[i]))+ Number(Investments[i].usdamount)
  console.log(InvestmentsValue)
}



let accountBalance = Number(WalletBalance)+ Number(InvestmentsValue)


return accountBalance;

 }


 export async function getTotalEarnings  (email) {
  const investments = await getuserInvestments(email)
  let earningValue=0;

  console.log ("EARINGS INVESTMENT", investments)


     for (let i=0; i<investments.length;i++){
        earningValue += Number(getInvestmentProfits(investments[i]))
     }
console.log("USER EARNINGS :", earningValue)
     return earningValue;

  
 }



 export function getInvestmentProfits(investment){
          let hours =(getElapsedHours(investment));
          console.log( "INITIAL HOURS", hours)
          let hourlyroi = (investment.investmentROI / 100) * investment.usdamount;
          console.log("ROI",investment.investmentROI)
          console.log("HOURLY ROI",hourlyroi)
         let  realisedroi= hours * hourlyroi;
         return realisedroi;
          

  }


  









//  async  function updateInvestmentStatus(investment){

//   let requestData={
//     requestTask:"updateInvestmentStatus",
//     investmentID: investment.id,
//   }

//    let result = await axios.post(baseurl, requestData)
//    console.log(result.data)

//  }


  export  function getElapsedHours(investment) {
    const dateTimeString = `${investment.date}T${investment.time}Z`;
    console.log( "DATE" ,dateTimeString);
    const givenDate = new Date(dateTimeString);
    const currentDate = new Date();

    const diffInMilliseconds = currentDate - givenDate;
    let diffInHours = diffInMilliseconds / (1000 * 60 * 60);

    if (diffInHours> (investment.investmentDuration *24)){
      diffInHours= Number(investment.investmentDuration) *24;
       console.log("INVESTMENT ABOOVE THE HOURS", diffInHours)
    
    }

    if (diffInHours< 1){
      diffInHours=0;
    }

    console.log("HOURS DIFFER: ",diffInHours)
    
    return diffInHours;
  }



  export async function getUserTransactions(email){
    const transactionsRequest = {
      requestTask: "getUserTransactions",
      email:email,
    };
    const transactionsResult = await axios.post(baseurl, transactionsRequest);
    return transactionsResult.data
  }
  export async function getUserWallets(email){
    const walletsRequest = {
      requestTask: "getUserWallets",
      email: email,
    };
    const WalletsResult = await axios.post(baseurl, walletsRequest);
    return WalletsResult.data
   
  }
  
export async function getuserInvestments(email){
  const investmentsRequest = {
    requestTask: "getuserinvestments",
    email: email,
  };
 
  const investmentsResult = await axios.post(baseurl, investmentsRequest);

  return investmentsResult.data
}






export async function getBitcoinPrice() {
  const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD');
  const btcPriceInUSD = response.data.USD;
  return btcPriceInUSD;
}

export async function getEthereumPrice() {
  const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
  const ethPriceInUSD = response.data.USD;
  return ethPriceInUSD;
}

export async function getLitecoinPrice() {
  const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD');
  const ltcPriceInUSD = response.data.USD;
  return ltcPriceInUSD;
}
