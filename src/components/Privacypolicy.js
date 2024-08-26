import React from 'react';
import Footer from './Footer';
import '../styles/Privacypolicy.css';

const Privacypolicy = () => {
    return (
        <div className='privacypolicy'>
            <div className='privacypolicy-container'>
                <h1>Privacy Policy</h1>
                <div className="privacypolicy-body">
                    <p>This Privacy Policy describes how MarketMasterBroker.com (the “Site” or “we”) collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.</p>
                    <h2>Contact</h2>
                    <p>If you have additional questions, want more information about our privacy practices, or would like to make a complaint, please contact us by e-mail at info@MarketMasterBroker.com or by mail using the details provided below: MarketMasterBroker, No. 3 Dr. Swanner Pool Road, Montana, Johannesburg, Gauteng, 0812, South Africa.</p>
                    <h2>Collecting Personal Information</h2>
                    <p>When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information about an identifiable individual (including the information below) as “Personal Information”.</p>
                    <ul>
                        <li>
                            <u>Device information</u>
                            <ul>
                                <li>Purpose of collection: to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.</li>
                                <li>Source of collection: Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.</li>
                                <li>Disclosure for a business purpose: shared with our processor Shopify.</li>
                                <li>Personal Information collected: version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.</li>
                            </ul>
                        </li>
                        <li>
                            <u>Order information</u>
                            <ul>
                                <li>Purpose of collection: to provide products or services to you to fulfill our contract, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
                                <li>Source of collection: collected from you.</li>
                                <li>Disclosure for a business purpose: shared with our processor Shopify.</li>
                                <li>Personal Information collected: name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number.</li>
                            </ul>
                        </li>
                        <li>
                            <u>Customer support information</u>
                            <ul>
                                <li>Purpose of collection: to provide customer support.</li>
                                <li>Source of collection: collected from you.</li>
                                <li>Disclosure for a business purpose: shared with vendors used to provide customer support.</li>
                                <li>Personal Information collected: includes additional information collected for customer support purposes.</li>
                            </ul>
                        </li>
                    </ul>
                    <h2>Minors</h2>
                    <p>The Site is not intended for individuals under the age of [INSERT AGE]. We do not intentionally collect Personal Information from children. If you are the parent or guardian and believe your child has provided us with Personal Information, please contact us at the address above to request deletion.</p>
                    <h2>Sharing Personal Information</h2>
                    <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above.</p>
                    <ul>
                        <li>We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer">here</a>.</li>
                        <li>We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful request for information we receive, or to otherwise protect our rights.</li>
                    </ul>
                    <h2>Behavioural Advertising</h2>
                    <p>We use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.</p>
                    <ul>
                        <li>We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer">here</a>. You can also opt-out of Google Analytics <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">here</a>.</li>
                        <li>We share information about your use of the Site, your purchases, and your interaction with our ads on other websites with our advertising partners.</li>
                        <li>We use Shopify Audiences to help us show ads on other websites with our advertising partners to buyers who made purchases with other Shopify merchants and who may also be interested in what we have to offer.</li>
                    </ul>
                    <p>For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page <a href="https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" target="_blank" rel="noopener noreferrer">here</a>.</p>
                    <p>You can opt out of targeted advertising by:</p>
                    <ul>
                        <li><i>Facebook - <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer">https://www.facebook.com/settings/?tab=ads</a></i></li>
                        <li><i>Google - <a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noopener noreferrer">https://www.google.com/settings/ads/anonymous</a></i></li>
                        <li><i>Bing - <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" target="_blank" rel="noopener noreferrer">https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</a></i></li>
                        <li><i>Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">https://optout.aboutads.info/</a></i></li>
                    </ul>
                </div>
            </div>
            
        </div>
    );
}

export default Privacypolicy;
