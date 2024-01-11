import { FC, useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { LoadingContext } from 'react-router-loading';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentMethod } from 'views/molecules/PaymentMethod/PaymentMethod';
import PackagePanel from 'views/molecules/PackagePanel/TeacherPackagePanel';
import { PackageContainer } from './Style';
import { TeacherPgContainer } from 'views/molecules/TeacherPgContainer/TeacherPgContainer';
import { getPlans } from 'app/actions/paymentActions'
import { dictionary } from './dictionary';

const stripePromise = loadStripe('pk_test_RqGIvgu49sLej0wM4rycOkJh');

interface ProductTypeParam {
  productType: string;
}

const Payment: FC = () => {
  const loadingContext = useContext(LoadingContext);
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state: any) => state.user);
  const guardian = useSelector((state: any) => state.guardian);
  const { productType } = useParams<ProductTypeParam>();

  const [plans, setPlans] = useState<any>({
    Gold: {
      currentPrice: 0,
      priceMonth: 0,
      priceYear: 0
    },
    Combo: {
      currentPrice: 0,
      priceMonth: 0,
      priceYear: 0
    },
    Sole: {
      currentPrice: 0,
      priceMonth: 0,
      priceYear: 0
    }
  })
  const [sponsorEmail, setSponsorEmail] = useState('')

  const [isSpecialCode, setIsSpecialCode] = useState(false)
  const [showPaymentMethod, setShowPaymentMethod] = useState(true);
  const [offRate, setOffRate] = useState(50);

  let language: string = useSelector((state: any) => state.user.language);
  language = language ? language : 'en-us'

  const onChangePackage = (type: string, count: number, period: string, sponsor: string) => {
    console.log({
      type, count, period, sponsor
    })
    if (!plans[type]) return;
    plans[type].childCount = count;
    plans[type].period = period;
    plans[type].currentPrice = (period === 'month' ? plans[type].priceMonth : plans[type].priceYear)
    setSponsorEmail(sponsor)
    setPlans({ ...plans })
  };

  const setPlanData = async () => {
    const result: any = await getPlans(user.token);
    if (!result.success) {
      enqueueSnackbar(result.msg, { variant: 'error' });
      return;
    }
    const plans_re_object: any = {
      Gold: [],
      Combo: [],
      Sole: []
    };
    for (const plan of result.data) {
      const name: any = plan.name;
      plans_re_object[name] = plan;
      plans_re_object[name].currentPrice = plan.priceMonth;
    }
    setPlans(plans_re_object)
    // setPackPrice(plans_re_object)

    loadingContext.done();
  }

  useEffect(() => {

    if (window.Tawk_API?.onLoaded) window.Tawk_API?.showWidget();

    if (parseInt(guardian?.couponCode?.percentage) === 100) setIsSpecialCode(true)
    // else setIsSpecialCode(true) //For always enable special code for first release

    setOffRate(50);
    setPlanData();
  }, []);

  return (
    <TeacherPgContainer onlyLogoImgNav={true}>
      <>
        <PackageContainer>
          <PackagePanel
            type={productType}
            price={plans[productType] ? (plans?.Classroom?.currentPrice) : 0}
            onChange={(childrenCount, plan, sponsor) =>
              onChangePackage(productType, childrenCount, plan, sponsor)
            }
            isSpecialCode={isSpecialCode}
            language={language}
          />
        </PackageContainer>
        <Elements stripe={stripePromise}>
          {showPaymentMethod && (
            <PaymentMethod
              plans={plans}
              offRate={offRate}
              isSpecialCode={isSpecialCode}
              sponsorEmail={sponsorEmail}
            />
          )}
        </Elements>
      </>
    </TeacherPgContainer>
  );
};
export default Payment
