import {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'app/configureStore';
import paypal from 'views/assets/paypal.svg';
import apple from 'views/assets/apple-pay.svg';
import visacard from 'views/assets/visacard.svg';
import Button from 'views/molecules/MuiButton';
import TextField from 'views/molecules/MuiTextField';
import { BasicColor } from 'views/Color';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {
    createOrder,
    confirmPaymentOrder,
    createOrderWithOutPay
} from 'app/actions/paymentActions'
import {
    useStripe,
    useElements,
    // CardNumberElement,
    // CardExpiryElement,
    // CardCvcElement,
} from '@stripe/react-stripe-js';
import {
    useStyles,
    PayPal,
    CardType,
    Apple,
    FlexRow,
    Title,
    CardContent
} from './Style'
import {
    Country,
    // State
} from 'country-state-city';
import commonDictionary from 'constants/commonDictionary'
import { dictionary } from './dictionary'
interface PaymentFormFunc {
    handleOrder(plans: any, coupon: string): void;
    handleUpdate(): void;
}
export const PaymentForm = forwardRef<PaymentFormFunc, any>((props, ref) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector((state: Store) => state.user)
    const guardian = useSelector((state: any) => state.guardian)
    let language: string = useSelector((state: any) => state.user.language);
    language = language ? language : 'en-us'
    const countries = Country.getAllCountries()
    const { isUpdate, isSpecialCode } = props
    // console.log(countries)
    // const [paymentMethod, setPaymentMethod] = useState('card')
    const [validateRst, setValidateRst] = useState<{ [key: string]: any }>(
        isSpecialCode ? {
            firstName: '',
            lastName: '',
            addressOne: null,
            // addressTwo: null,
            state: null,
            city: null,
            zip: null,
            country: '',
            phone: null,
        } : {
            firstName: '',
            lastName: '',
            cardNumber: null,
            expiryDate: null,
            cvc: null,
            addressOne: null,
            // addressTwo: null,
            state: null,
            city: null,
            zip: null,
            country: '',
            phone: null,
        });

    const [data, setData] = useState({
        paymentMethod: 'card',
        firstName: guardian.firstName,
        lastName: guardian.lastName,
        cardNumber: '',
        cardExpMonth: '',
        cardExpYear: '',
        cvc: '',
        addressOne: '',
        addressTwo: '',
        state: '',
        city: '',
        zip: '',
        // country: { name: '', isoCode: '' },
        country: countries[232],
        phone: '',
        couponCode: '',
        price: 0
    })
    const arrObjToString = (arrObj: any) => {
        let str = '[';
        for (const obj of arrObj) {
            str += '{'
            for (const key in obj) {
                str += key
                str += ': '
                if (typeof (obj[key]) === 'string') str += '"' + obj[key] + '"'
                else str += obj[key]
                str += ','
            }
            str += '},'
        }
        str += ']'
        return str;
    }
    const [plans, setPlans] = useState<any>()

    const validatePhoneNumber = (pNumber: string) => {
        const regex = new RegExp(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/);
        return regex.test(pNumber);
    }

    const formValidation = () => {
        const validateMsgTemp = { ...validateRst }
        let valiResult = true;
        for (const key in validateRst) {
            if (validateRst[key] === null) {
                validateMsgTemp[key] = commonDictionary[language]?.fieldIsRequired;
            }
            if (validateMsgTemp[key]) {
                valiResult = false;
            }
        }
        setValidateRst(validateMsgTemp);
        return valiResult;
    }

    const handleFormChange = (field: string, errMsg: string) => {
        setValidateRst({ ...validateRst, [field]: errMsg })
    }

    // const handleReturn = (event: any) => {

    // }

    const handleOrder = async (plansDetail: any = null) => {

        if (!formValidation()) {
            return { success: false, result: 'Validation Failed' };
        }
        if (!stripe) return { success: false, result: "Can't get stripe" };
        if (!elements) return { success: false, result: "Can't get element" };
        // if(!elements.getElement(CardNumberElement)) return {success: false, result: "Can't get card number element"};
        // const cardElement:any = elements.getElement(CardNumberElement);
        // const result:any = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: cardElement,
        //     billing_details: {
        //         // email: user.email,
        //         email: 'mooncode610@gmail.com',
        //         address: {
        //             city: data.city,
        //             // country: data.country,
        //             line1: data.addressOne,
        //             line2: data.addressTwo,
        //             postal_code: data.zip,
        //             state: data.state
        //         },
        //         name: data.firstName + ' ' + data.lastName,
        //         phone: data.phone
        //     },
        // }).catch(console.log);
        // if(result.error) return {success: false, result: result.error.message};
        // /*------------------------ send request to backend to create payment -S-----------------------------*/
        let orderDetailInputs: any = [];
        plansDetail = plansDetail !== null ? plansDetail : plans;
        for (const type in plansDetail) {
            const plan = plansDetail[type]
            if (plan.childCount < 1 || !plan.childCount) continue;
            const orderDetailInput: any = {};
            orderDetailInput.planId = plan.id
            orderDetailInput.quantity = plan.childCount
            orderDetailInput.period = plan.period === 'month' ? 'Monthly' : 'Yearly'
            orderDetailInputs.push(orderDetailInput)
        }

        orderDetailInputs = arrObjToString(orderDetailInputs)
        let result: any;
        if (isSpecialCode) {
            result = await createOrderWithOutPay(
                data.firstName,
                data.lastName,
                'add 1',
                'add 2',
                'city',
                'state',
                'postcode',
                'country',
                'phone',
                guardian.id,
                orderDetailInputs,
                user.token,
                dispatch
            )
            result.data.email = user.email;
        }
        else {
            result = await createOrder(
                data.cvc,
                data.cardExpMonth[0] === '0' ? data.cardExpMonth[1] : data.cardExpMonth,
                data.cardExpYear,
                data.firstName,
                data.lastName,
                data.cardNumber,
                data.addressOne,
                data.addressTwo,
                data.city,
                data.state,
                data.zip,
                data.country.isoCode,
                data.phone,
                guardian.id,
                orderDetailInputs,
                'Card',
                'https://',
                user.token,
                dispatch
            )

            // // /*------------------------ send request to backend to create payment -E-----------------------------*/
            if (result.success) {
                result.data.email = user.email;
                const result_confirm = await confirmPaymentOrder(
                    result.data.order.id,
                    user.token,
                    dispatch
                )
                result.success = result_confirm.success;
                result.data.order = result_confirm.data.order;
            }
        }


        return result;

    }

    const handleUpdate = async () => {
        if (!formValidation()) return { success: false, result: 'Validation Failed' };
        /*------------------------ send request to backend to create payment -S-----------------------------*/
        const result = {};
        /*------------------------ send request to backend to create payment -E-----------------------------*/
        return { success: true, result: result };
    }

    useImperativeHandle(ref, () => ({
        async handleOrder(plansDetail, couponCode) {
            data.couponCode = couponCode;
            setData(data);
            setPlans(plans)
            const result = await handleOrder(plansDetail);
            return result;
        },

        async handleUpdate() {
            const result = await handleUpdate();
            return result;
        }
    }))
    useEffect(() => {
    }, []);
    return (
        <>
            {!isSpecialCode && <>
                <Title>{dictionary[language]?.paymentMethod}</Title>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        value={data.paymentMethod}
                        onChange={(e) => setData({ ...data, paymentMethod: e.target.value })}
                    >
                        <FlexRow>
                            <FormControlLabel value="paypal" control={<Radio className={classes.radio} disabled />} label=""></FormControlLabel>
                            <PayPal src={paypal} />
                            <Apple src={apple} />
                        </FlexRow>
                        <Divider className={classes.divider} />
                        <FlexRow>
                            <FormControlLabel value="card" control={<Radio className={classes.radio} />} label="" />
                            <CardContent>
                                <div>{dictionary[language]?.creditOrDebitCard}</div>
                                <CardType src={visacard} />
                            </CardContent>
                        </FlexRow>
                    </RadioGroup>
                </FormControl>
            </>}
            <div style={{ fontSize: '24px', fontWeight: '700', paddingTop: '15px', paddingBottom: '15px' }}>{dictionary[language]?.billingInformation}</div>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <TextField
                        label={dictionary[language]?.firstName}
                        onChange={(e: any) => {
                            handleFormChange('firstName', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                            setData({ ...data, firstName: e.target.value })
                        }}
                        error={!!validateRst.firstName}
                        helperText={validateRst.firstName}
                        value={data.firstName}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label={dictionary[language]?.lastName}
                        onChange={(e: any) => {
                            handleFormChange('lastName', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                            setData({ ...data, lastName: e.target.value })
                        }}
                        error={!!validateRst.lastName}
                        helperText={validateRst.lastName}
                        value={data.lastName}
                    />
                </Grid>
                {!isSpecialCode &&
                    <Grid item xs={12}>
                        {/* <TextField
                        label="Card Number"
                        InputProps={{
                            inputProps: {
                                component: CardNumberElement
                            },
                            inputComponent: StripeInput
                        }}
                        onChange={(e: any) => {
                            handleFormChange('cardNumber',e['error'] ? e['error']['message'] : '')
                        }}
                        error={!!validateRst.cardNumber}
                        helperText={validateRst.cardNumber}
                        focused
                    /> */}
                        <TextField
                            label={dictionary[language]?.cardNumber}
                            onChange={(e: any) => {
                                handleFormChange('cardNumber', e.target.value.length < 15 ? commonDictionary[language]?.fieldIsRequired : '')
                                // handleFormChange('expiryDate',e.target.value.split("-").length <= 2 ? 'Type is wrong' : '')
                                setData({ ...data, cardNumber: e.target.value.replaceAll('-', '') })
                            }}
                            error={!!validateRst.cardNumber}
                            helperText={validateRst.cardNumber}
                        />
                    </Grid>
                }
                {!isSpecialCode &&
                    <Grid item xs={12} md={6}>
                        {/* <TextField
                        label="Expiry Date"
                        InputProps={{
                            inputProps: {
                            component: CardExpiryElement
                            },
                            inputComponent: StripeInput
                        }}
                        onChange={(e: any) => handleFormChange('expiryDate',e['error'] ? e['error']['message'] : '')}
                        focused
                        error={!!validateRst.expiryDate}
                        helperText={validateRst.expiryDate}
                    /> */}
                        <TextField
                            label={dictionary[language]?.expirationDate}
                            onChange={(e: any) => {
                                const expiryDate = e.target.value.split('/');
                                handleFormChange('expiryDate', e.target.value.length < 5 ? commonDictionary[language]?.fieldIsRequired : expiryDate.length <= 1 ? 'Type is wrong' : expiryDate[0] >= 13 ? 'Type is wrong' : '')
                                if (expiryDate.length <= 1 || expiryDate[0] >= 13) return
                                const cardExpMonth = expiryDate[0]
                                let cardExpYear = expiryDate[1]
                                if (cardExpYear.length === 2) cardExpYear = '20' + cardExpYear
                                setData({ ...data, cardExpMonth: cardExpMonth, cardExpYear: cardExpYear })
                            }}
                            error={!!validateRst.expiryDate}
                            helperText={validateRst.expiryDate}
                        />
                    </Grid>
                }
                {!isSpecialCode &&
                    <Grid item xs={12} md={6}>
                        {/* <TextField
                        label="CVC/CVV"
                        InputProps={{
                            inputProps: {
                            component: CardCvcElement
                            },
                            inputComponent: StripeInput
                        }}
                        onChange={(e: any) => handleFormChange('cvc',e['error'] ? e['error']['message'] : '')}
                        focused
                        error={!!validateRst.cvc}
                        helperText={validateRst.cvc}
                    /> */}
                        <TextField
                            label="CVC/CVV"
                            onChange={(e: any) => {
                                handleFormChange('cvc', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                                setData({ ...data, cvc: e.target.value })

                            }}
                            error={!!validateRst.cvc}
                            helperText={validateRst.cvc}
                        />
                    </Grid>
                }
                <Grid item xs={12}>
                    <TextField
                        label={dictionary[language]?.addressLine1}
                        onChange={(e: any) => {
                            handleFormChange('addressOne', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                            setData({ ...data, addressOne: e.target.value })
                        }}
                        error={!!validateRst.addressOne}
                        helperText={validateRst.addressOne}
                        value={data.addressOne}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label={dictionary[language]?.addressLine2}
                        onChange={(e: any) => {
                            // handleFormChange('addressTwo',e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '');
                            setData({ ...data, addressTwo: e.target.value });
                        }}
                        error={!!validateRst.addressTwo}
                        helperText={validateRst.addressTwo}
                        value={data.addressTwo}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        label={dictionary[language]?.city}
                        onChange={(e: any) => {
                            handleFormChange('city', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '');
                            setData({ ...data, city: e.target.value });
                        }}
                        error={!!validateRst.city}
                        helperText={validateRst.city}
                        value={data.city}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        label={`${dictionary[language]?.state} / ${dictionary[language]?.province}`}
                        onChange={(e: any) => {
                            handleFormChange('state', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '');
                            setData({ ...data, state: e.target.value })
                        }}
                        error={!!validateRst.state}
                        helperText={validateRst.state}
                        value={data.state}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        label={`${dictionary[language]?.zip} / ${dictionary[language]?.postalCode}`}
                        onChange={(e: any) => {
                            handleFormChange('zip', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '')
                            setData({ ...data, zip: e.target.value })
                        }}
                        error={!!validateRst.zip}
                        helperText={validateRst.zip}
                        value={data.zip}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="select-country-label">
                            {dictionary[language]?.selectYourCountry}
                        </InputLabel>
                        <Select
                            labelId="select-country-label"
                            id="select-country"
                            value={countries[countries.findIndex((item: any) => item.name === data.country.name)]}
                            label={dictionary[language]?.selectYourCountry}
                            className={`${classes.select} err-border`}
                            // className={`${classes.select} err-border`}
                            onChange={async (e: any) => {
                                handleFormChange('country', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '');
                                setData({ ...data, country: e.target.value })
                                // setGrade(e.target.value);
                                // console.log(props)
                                // const res = await changeStudentGrade(e.target.value.id, props.id, user.token, dispatch)
                                // if(!res.success) {
                                //     enqueueSnackbar(res.msg, { variant: 'error' });
                                // }
                            }}
                            sx={
                                validateRst.country
                                    ? {
                                        '& fieldset': {
                                            borderColor: `${BasicColor.red} !important`,
                                        },
                                    }
                                    : {}
                            }
                            displayEmpty={true}
                        >
                            {countries.map((value: any, index: number) => (
                                <MenuItem value={value} key={index}>
                                    {value.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <div className="err-text">{validateRst.country}</div>
                    </FormControl>
                    {/* <TextField
                        label="Country"
                        onChange={(e: any) => {
                            handleFormChange('country',e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : '');
                            setData({...data, country: e.target.value})

                        } }
                        error={!!validateRst.country}
                        helperText={validateRst.country}
                        value={data.country}
                    /> */}
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        label={dictionary[language]?.phone}
                        onChange={(e: any) => {
                            handleFormChange('phone', e.target.value.length === 0 ? commonDictionary[language]?.fieldIsRequired : !validatePhoneNumber(e.target.value) ? 'Phone number type is wrong' : '')
                            setData({ ...data, phone: e.target.value })
                        }}
                        error={!!validateRst.phone}
                        helperText={validateRst.phone}
                        value={data.phone}
                    />
                </Grid>
                {isUpdate && (<>
                    <Grid item xs={12} md={6}>
                        <Button
                            bgColor={BasicColor.green}
                            onClick={handleOrder}
                            align="left"
                            value={dictionary[language]?.update}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            bgColor={BasicColor.gray60}
                            onClick={handleOrder}
                            align="right"
                            value={dictionary[language]?.return}
                        />
                    </Grid>
                </>)}
            </Grid>
            <div style={{ color: BasicColor.lightCyanBlue, fontSize: '14px', paddingTop: '30px', paddingBottom: '30px' }}>{dictionary[language]?.yourTransactionIsSecuredThroughSSLEncryptionThroughStripe}</div>
        </>
    );
});
