import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class Paypal extends React.Component {
    render() {
		const onSuccess = (payment) => {
            console.log("Payment successful!", payment);
        }

		const onCancel = (data) => {
			console.log('Payment cancelled!', data);
		}

		const onError = (err) => {
			console.log("Error!", err);
		}

		let env = 'sandbox'; // 'sandbox' or 'production'
		let currency = 'USD'; 
		let total = this.props.total;  // this is the total amount (based on currency) to charge
		// https://developer.paypal.com/docs/classic/api/currency_codes/

		const client = {
			sandbox:    'AZ_heeHWMVUAG_uzXr-dmPI1N0uF7ZdON-TM8wpDt_WfiFK--SQOhfC2WOb_o-nCUc4KSvWRBY7w_DVs',
			production: 'YOUR-PRODUCTION-APP-ID',
		}

        return (
            <PaypalExpressBtn 
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                onError={onError} 
                onSuccess={onSuccess} 
                onCancel={onCancel} 

                // Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
                style={{
                    size: 'medium',
                    color: 'black',
                    shape: 'rect',
                    tagline: 'false',
                    // fundingicons: 'true',
                    label: 'pay'
                }}
            />
        );
    }
}