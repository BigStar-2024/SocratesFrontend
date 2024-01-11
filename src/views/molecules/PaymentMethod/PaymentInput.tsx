import { Stack, TextField }                       from '@mui/material';
import React, { useState }                        from 'react';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images  from 'react-payment-inputs/images';
import { css } from 'styled-components';
export default function PaymentInputs() {
    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();

    const [number, setNumber] = useState('4242424242424242')
    const [expiry, setExpiry] = useState('11 / 25')

    const style = {
        fieldWrapper: {
            base: css`
              width: 100%;
              border: unset;
            `,
            errored: css`
            border: unset;
            `
          },
          inputWrapper: {
            base: css`
              height: auto;
              border-radius: 25px;
              border-color: blue;
              border: unset;
              padding: 16.5px 14px;
              outline: 2px solid blue;
            `,
            errored: css`
              border-color: maroon;
            `,
            focused: css`
              border-color: unset;
              box-shadow: unset;
              outline: 2px solid green;
            `
          },
          input: {
            base: css`
              color: green;
            `,
            errored: css`
              color: maroon;
            `,
            cardNumber: css`
              width: 15rem;
            `,
            expiryDate: css`
              width: 10rem;
            `,
            cvc: css`
              width: 5rem;
            `
          },
          errorText: {
            base: css`
              margin-left: 2vw;
              color: maroon;
            `
          }
    }
    return (
        <PaymentInputsWrapper {...wrapperProps} styles={style}>
            <input {...getCardNumberProps({
                onChange: (e: any) => setNumber(e.target.value)
            })} value={number} />
            <input {...getExpiryDateProps({
                onChange: (e: any) => setExpiry(e.target.value)
            }
            )}
                value={expiry} />
            <input {...getCVCProps()} />
        </PaymentInputsWrapper>
    );
}
